export const generateEmailTemplate = (verificationCode) => {
  return `
  <div style="font-family: 'Poppins', 'Gilroy', Arial, sans-serif; background: #0d0d0d; padding: 40px 20px; margin: 0; text-align: center; color: #f1f1f1;">
    
    <!-- Card -->
    <div style="max-width: 500px; margin: 0 auto; border-radius: 16px; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">
      
      <h1 style="margin: 0 0 20px; font-weight: 600; font-size: 24px; color: #ffffff;">
        Verification Code
      </h1>
      
      <p style="font-size: 15px; color: #cccccc; margin-bottom: 25px;">
        Enter this code to continue:
      </p>

      <!-- Code -->
      <div style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #ffffff; background: linear-gradient(135deg, #4CAF50, #2E7D32); padding: 16px 32px; border-radius: 12px; box-shadow: 0 6px 18px rgba(76,175,80,0.4);">
        ${verificationCode}
      </div>

      <p style="margin-top: 30px; font-size: 13px; color: #777;">
        This code expires in 5 minutes.
      </p>
    </div>
    
    <!-- Footer -->
    <p style="margin-top: 25px; font-size: 12px; color: #555;">
      If you didn’t request this, please ignore this email.
    </p>
  </div>
  `
}

export const generateResetEmailTemplate = (resetPasswordUrl) => {
  return `
  <div style="font-family: 'Poppins', 'Gilroy', Arial, sans-serif; background: #0d0d0d; padding: 40px 20px; margin: 0; text-align: center; color: #f1f1f1;">
    
    <!-- Card -->
    <div style="max-width: 500px; margin: 0 auto; border-radius: 16px; padding: 40px 30px; box-shadow: 0 8px 32px rgba(0,0,0,0.6);">
      
      <h1 style="margin: 0 0 20px; font-weight: 600; font-size: 24px; color: #ffffff;">
        Reset Your Password
      </h1>
      
      <p style="font-size: 15px; color: #cccccc; margin-bottom: 25px;">
        Click the button below to reset your password:
      </p>

      <!-- Button -->
      <a href="${resetPasswordUrl}" style="display: inline-block; background: linear-gradient(135deg, #34A853, #1e7d38); color: #ffffff; font-size: 15px; font-weight: 600; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 6px 20px rgba(52,168,83,0.4);">
        Reset Password
      </a>

      <p style="margin-top: 30px; font-size: 13px; color: #777;">
        If the button doesn’t work, copy this link and paste it into your browser
      </p>
      
      <div style="background: rgba(50,50,50,0.8); padding: 12px; border-radius: 8px; font-size: 13px; color: #bbb; word-break: break-word;">
        ${resetPasswordUrl}
      </div>
    </div>
    
    <!-- Footer -->
    <p style="margin-top: 25px; font-size: 12px; color: #555;">
      If you didn’t request this, please ignore this email.
    </p>
  </div>
  `
}
