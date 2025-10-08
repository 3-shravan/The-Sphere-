import crypto from "node:crypto"
import nodeMailer from "nodemailer"
import twilio from "twilio"
import ErrorHandler from "../middlewares/errorHandler.js"
import { generateEmailTemplate } from "../utils/emailTemplate.js"

export const sendToken = async (user, statusCode, message, res) => {
  const token = await user.generateAuthToken()
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      token,
      user,
    })
}

export const sendVerificationCode = async (
  verificationMethod,
  verificationCode,
  name,
  email,
  phone,
) => {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode)

      await sendEmail({ email, subject: "Your Verificaton Code", message })
      return `Verification code successfully sent to ${email}`
    }

    if (verificationMethod === "phone") {
      await makePhoneCall(name, phone, verificationCode, "")
      return `Verification code successfully sent to ${phone}.`
    }
    throw new ErrorHandler(400, 'Invalid verification method. Please use "email" or "phone".')
  } catch (error) {
    throw new ErrorHandler(500, error.message)
  }
}

export const makePhoneCall = async (name, phone, verificationCode, specialMessage) => {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

  const verificationCodeWithSpace = verificationCode.toString().split("").join(" ") // add space to verification code
  const phoneNumber = `+91${phone.trim().slice(-10)}`
  try {
    await client.calls.create({
      twiml: `  <Response>
               <Say>
               Hello  ${name} .Your Verification Code ${specialMessage} is ${verificationCodeWithSpace}.
               </Say>
               </Response>
                  `,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
  } catch (error) {
    if (error.code === 21219) {
      throw new ErrorHandler(
        400,
        "Phone verification is unavailable for now . Please try email verification instead.",
      )
    }
    throw new ErrorHandler(
      400,
      "Unable to send verification code via phone call. Please try email verification.",
    )
  }
}

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    }
    await transporter.sendMail(options)
  } catch (_error) {
    throw new ErrorHandler(
      500,
      "Failed to send verification code on your email. Please try again later.",
    )
  }
}

export const crpytPassword = (token) => {
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
  return resetPasswordToken
}

export const generateFiveDigitRandomNumber = () => {
  return Math.floor(10000 + Math.random() * 90000)
}
