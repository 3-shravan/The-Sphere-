import crypto from "crypto";

export const isAtLeast13YearsOld = (dateOfBirth) => {
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
  return dateOfBirth <= thirteenYearsAgo;
};

export const validatePhoneNo = (phoneNumber) => {
  const phoneRegex = /^(\+91|91)?[-\s]?[6-9]\d{9}$/;
  return phoneRegex.test(phoneNumber);
};

//generate 5 digit OTP
export const generateFiveDigitRandomNumber = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const crpytPassword = (token) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  return resetPasswordToken;
};


