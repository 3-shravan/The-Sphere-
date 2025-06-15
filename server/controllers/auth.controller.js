import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { createUser } from "../services/userServices.js";
import { validatePhoneNo, crpytPassword } from '../utils/utilities.js'
import { sendVerificationCode } from "../services/sendVerificationCode.js";
import { sendToken } from "../services/sendToken.js";
import { ExpiredToken } from "../models/blackListedTokenModel.js";
import { sendEmail } from "../services/sendEmail.js";
import { handleSuccessResponse } from "../utils/responseHandler.js";
import { generateResetEmailTemplate } from "../utils/emailTemplate.js";
import { makePhoneCall } from "../services/phoneCall.js";



{/***********  
     * @Register_User
  *  *********** / */}
export const register = catchAsyncError(
   async (req, res, next) => {
      try {
         let { name, email, phone, password, verificationMethod } = req.body;

         if (!name || (!phone && !email) || !password || !verificationMethod) {
            return next(new ErrorHandler(400, 'All fields are required.'));
         }

         // Convert empty phone number to null
         phone = phone?.trim() || undefined;
         email = email?.trim() || undefined;

         // Verification method mismatch
         if (!phone && verificationMethod === 'phone') {
            return next(new ErrorHandler(400, "Phone number is required for phone verification."));
         }
         if (!email && verificationMethod === 'email') {
            return next(new ErrorHandler(400, "Email address is required for email verification."));
         }

         // Validate phone number
         if (phone && !validatePhoneNo(phone)) {
            return next(new ErrorHandler(400, "Please enter a valid phone number."));
         }

         // Check if a verified user with the same name, phone, or email exists

         const isExistName = await User.findOne({ name, accountVerified: true });
         if (isExistName) return next(new ErrorHandler(409, 'Username already exists.'));

         if (phone) {
            const isExistPhone = await User.findOne({ phone, accountVerified: true });
            if (isExistPhone) return next(new ErrorHandler(409, 'Phone number is already registered.'));
         }
         if (email) {
            const isExistEmail = await User.findOne({ email, accountVerified: true });
            if (isExistEmail) return next(new ErrorHandler(409, 'Email address is already registered.'));
         }

         let isExistUnverifiedUser = await User.findOne({
            $or: [
               { phone: { $exists: true, $eq: phone }, accountVerified: false },
               { email: { $exists: true, $eq: email }, accountVerified: false }
            ]
         });

         if (isExistUnverifiedUser && isExistUnverifiedUser.attempts >= 3) {
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
            if (isExistUnverifiedUser.lastAttempt > oneHourAgo) {
               return next(new ErrorHandler(429, "You have exceeded the maximum number of attempts. Please try again after an hour."));
            }

            isExistUnverifiedUser.attempts = 0;
            isExistUnverifiedUser.lastAttempt = undefined;
            await isExistUnverifiedUser.save();

         }

         if (isExistUnverifiedUser) {
            // Update OTP for the existing unverified user
            const verificationCode = await isExistUnverifiedUser.generateVerificationCode();
            await User.findOneAndUpdate(
               { _id: isExistUnverifiedUser._id },
               { $inc: { attempts: 1 }, $set: { lastAttempt: Date.now() } },
               { new: true }
            );
            await isExistUnverifiedUser.save();
            const message = await sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res);
            return handleSuccessResponse(res, 200, message);
         }


         // If no user exists, create a new user
         const user = await createUser({ name, phone, email, password });
         const verificationCode = await user.generateVerificationCode();
         await User.findOneAndUpdate(
            { _id: user._id },
            { $set: { attempts: 0, lastAttempt: undefined } }
         );
         await user.save();

         const message = await sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res);
         handleSuccessResponse(res, 200, message);

      } catch (error) {
         next(error);
      }
   }
);


{/***********  
     * @Verify_OTP
  *  *********** / */}
export const verifyOTP = catchAsyncError(async (req, res, next) => {
   const { email, phone, otp } = req.body
   if (!otp) return next(new ErrorHandler(400, 'OTP is required.'))
   if (!phone && !email) return next(new ErrorHandler(400, 'Either phone number or email is required for verification'))

   if (phone && !validatePhoneNo(phone))
      return next(new ErrorHandler(400, 'Invalid phone number'))

   const query = { accountVerified: false };
   if (phone && email) {
      query.$or = [
         { phone },
         { email }
      ];
   } else if (phone) {
      query.phone = phone;
   } else if (email) {
      query.email = email;
   }

   const user = await User.findOne(query);
   if (!user) return next(new ErrorHandler(404, 'No user found to be verified.'))

   //fetch that stored OTP and compare it with OTP provided by user
   const verificationcode = user.verificationCode;
   if (verificationcode != Number(otp)) {
      return next(new ErrorHandler(400, 'Invalid OTP'))
   }

   //check if the provided OTP is expired one
   const currentTime = Date.now()
   const expireTime = new Date(user.verificationCodeExpire).getTime();
   if (expireTime < currentTime) {
      return next(new ErrorHandler(400, 'OTP Expired. Please request a new one.'))
   }

   //set user as verified  and set undefine for verification fields as they are no longer required
   user.accountVerified = true;
   user.verificationCode = undefined;
   user.verificationCodeExpire = undefined;
   user.attempts = undefined;
   user.lastAttempt = undefined;

   user.save({ validateModifiedOnly: true })

   sendToken(user, 200, "Account Successfully Verified", res)
})


{/***********  
     * @Login
  *  *********** / */}
export const login = catchAsyncError(async (req, res, next) => {
   const { email, phone, password } = req.body
   //user can only login with either phone number or email address
   if ((!email && !phone) || !password)
      return next(new ErrorHandler(400, "Credentials are required."))
   if (email && phone)
      return next(new ErrorHandler(400, "  Please provide either email or phone number."));
   let user;
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(404, "No user found with this phone number or account is not verified."))
   }
   if (email) {
      user = await User.findOne({ email, accountVerified: true }).select("+password")
      if (!user) return next(new ErrorHandler(404, "No user found with this email address or account is not verified."))
   }
   //Validate the password 
   const isMatch = await user.comparePassword(password);
   if (!isMatch) return next(new ErrorHandler(400, 'Incorrect password. Please try again.'))
   user.password = ""
   sendToken(user, 200, 'Login Successfull', res)
})


{/***********  
     * @Logout
  *  *********** / */}
export const logout = catchAsyncError(async (req, res, next) => {
   const token = req.headers.authorization?.split(" ")[1] || req.cookies.token
   try {
      await ExpiredToken.create({ token })
   } catch (error) {
      throw new ErrorHandler(500, `Error black listing token: ${error.message}`);
   }
   res.clearCookie("token", { httpOnly: true });
   res.cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
   handleSuccessResponse(res, 200, "Logged out successfully")
})


{/***********  
     * @Get_User
  *  *********** / */}
export const getUser = catchAsyncError(async (req, res, next) => {
   res.status(200).json({ success: true, user: req.user })
})


{/***********  
     * @Forget_Password
  *  *********** / */}
export const forgetPassword = catchAsyncError(async (req, res, next) => {
   const { email, phone } = req.body

   if (!phone && !email) return next(new ErrorHandler(400, "Either provide registered email or phone number"));
   if (phone && !validatePhoneNo(phone)) return next(new ErrorHandler(400, "Please enter a valid phone number."))


   //when user want to reset the password by verification link via email address
   if (email) {
      const user = await User.findOne({ email, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'No user is registered with this email address'))

      //generate a token (resetToken) store the hashed password in database for later verification and send the unhashed token as params in reset password link
      const resetToken = await user.generateResetPasswordToken()
      await user.save({ validateBeforeSave: false })

      //create and send a resetpassword URL
      const resetPasswordUrl = `${process.env.LOCAL_HOST_URL}/resetPassword/email/${resetToken}`
      const message = generateResetEmailTemplate(resetPasswordUrl)
      try {
         sendEmail({ email, subject: 'Your Reset Password Link', message })
         handleSuccessResponse(res, 200, `Reset password link is sent to ${email}`)

      } catch (error) {
         user.resetPasswordToken = undefined
         user.resetPasswordTokenExpire = undefined
         await user.save({ validateBeforeSave: false })
         return next(new ErrorHandler(400, error.message || "Failed to send password reset link"))
      }
   }

   //when user want to reset the password using verification code via phone number
   else if (phone) {

      const user = await User.findOne({ phone, accountVerified: true })
      if (!user) return next(new ErrorHandler(404, 'No user is registered with this phone number'))

      //generate verification code
      const resetPasswordOTP = await user.generateResetPasswordOTP()
      await user.save({ validateBeforeSave: false })

      //send verificaton code 
      try {
         await makePhoneCall('', phone, resetPasswordOTP, 'for reseting the password')
         handleSuccessResponse(res, 200, `Verification code to reset your password has been sent`)

      } catch (error) {
         user.resetPasswordOTP = undefined
         user.resetPasswordOTPExpire = undefined
         await user.save({ validateBeforeSave: false })
         return next(new ErrorHandler(400, error.message || 'Failed to make call for verification Code | Phone Number invalid'))
      }
   }
})


{/***********  
     * @Verify_Reset_Password_OTP_via_Phone
  *  *********** / */}
export const verifyResetPasswordOTP = catchAsyncError(async (req, res, next) => {
   const { phone, otp } = req.body
   if (!otp || !phone) return next(new ErrorHandler(400, "phone number and OTP are required for verification"))

   const user = await User.findOne({ phone, resetPasswordOTP: otp, resetPasswordOTPExpire: { $gt: Date.now() } })
   if (!user) return next(new ErrorHandler(400, "Invalid OTP"))

   user.resetPassword = true
   user.resetPasswordOTP = undefined
   user.resetPasswordOTPExpire = undefined
   await user.save({ validateBeforeSave: false })
   handleSuccessResponse(res, 200, 'OTP Verified.')
})

{/***********  
     * @Reset_Password
  *  *********** / */}
export const resetPassword = catchAsyncError(async (req, res, next) => {

   const { token } = req.params
   const { phone, newPassword, confirmPassword } = req.body

   if (!newPassword || !confirmPassword) return next(new ErrorHandler(400, "Plaese provide your new password as well as confirm password"))
   if (newPassword !== confirmPassword) return next(new ErrorHandler(400, 'New password and confirm Password do not match'))

   let user;
   if (token) {
      const resetPasswordToken = crpytPassword(token)
      user = await User.findOne({ resetPasswordToken, accountVerified: true, resetPasswordTokenExpire: { $gt: Date.now() } }).select('+password')
      if (!user) return next(new ErrorHandler(400, "Invalid token or Expired"))

      user.resetPasswordToken = undefined
      user.resetPasswordTokenExpire = undefined
      user.attempts = undefined;
   }
   if (phone) {
      user = await User.findOne({ phone, accountVerified: true, resetPassword: true }).select('+password')
      if (!user) return next(new ErrorHandler(400, 'Unauthorize to reset password'))

      user.resetPassword = false
      user.resetPasswordOTP = undefined
      user.resetPasswordOTPExpire = undefined
      user.attempts = undefined;
   }

   const isMatch = await user.comparePassword(newPassword)
   if (isMatch) return next(new ErrorHandler(400, 'Previouly used password. Please enter new password.'))
   user.password = newPassword
   await user.save()
   handleSuccessResponse(res, 200, "Password Reset Successfully")

})