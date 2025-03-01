import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { generateFiveDigitRandomNumber } from '../utils/utilities.js';

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true
   },
   email: {
      type: String,

   },
   phone: {
      type: String
   },
   password: {
      type: String,
      minLength: [5, `Password should be atlest 5 characters long.`],
      maxLength: [32, `Password should be less than 32 characters.`],
      select: false
   },
   accountVerified: {
      type: Boolean,
      default: false
   },
   verificationCode: {
      type: Number
   },
   verificationCodeExpire: {
      type: Date
   },
   resetPasswordToken: {
      type: String
   },
   resetPasswordTokenExpire: {
      type: Date
   },
   resetPassword: {
      type: Boolean,
      default: false
   },
   resetPasswordOTP: {
      type: Number
   },
   resetPasswordOTPExpire: {
      type: Date
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) {
      next()
   }
   this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

//generate verification code to validate the user during registration
userSchema.methods.generateVerificationCode = async function () {
   const verificationCode = await generateFiveDigitRandomNumber()
   this.verificationCode = verificationCode
   this.verificationCodeExpire = Date.now() + 10 * 60 * 1000
   return verificationCode
}

userSchema.methods.generateAuthToken = async function () {
   const token = await jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
   return token
}

//generate token to verify the user for reseting the password
userSchema.methods.generateResetPasswordToken = async function () {
   const resetToken = crypto.randomBytes(20).toString("hex")
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
   this.resetPasswordTokenExpire = Date.now() + 10 * 60 * 1000;
   return resetToken;
}

// //generate verification code to validate the user for reseting the password by phone OTP
userSchema.methods.generateResetPasswordOTP = async function () {
   const resetPasswordOTP = await generateFiveDigitRandomNumber()
   this.resetPasswordOTP = resetPasswordOTP
   this.resetPasswordOTPExpire = Date.now() + 10 * 60 * 1000
   return resetPasswordOTP
}


export const User = mongoose.model('user', userSchema)