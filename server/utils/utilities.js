import crypto from 'crypto'

export const isAtLeast13YearsOld = (dateOfBirth) => {
   const thirteenYearsAgo = new Date();
   thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
   return dateOfBirth <= thirteenYearsAgo;
 };
 

//function to validate correct format for indian phone number
export const validatePhoneNo = (phoneNumber) => {
   const phoneRegex = /^(\+91|91)?[-\s]?[6-9]\d{9}$/;
   return phoneRegex.test(phoneNumber)
}

//generate 5 digit OTP
export const generateFiveDigitRandomNumber = () => {
   return Math.floor(10000 + Math.random() * 90000);
}

//function to crypt the password
export const crpytPassword = (token) => {
   const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
   return resetPasswordToken;
}

// utils/parseTags.js

export const parseTags = (tags) => {
   if (!tags) return [];
   if (typeof tags === "string") {
      try {
         const parsed = JSON.parse(tags);
         return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
         return [tags];
      }
   }
   return Array.isArray(tags) ? tags : [tags];
};




