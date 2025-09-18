export const RegisterInitialFormData = {
  name: "",
  email: "",
  phone: "",
  password: "",
  verificationMethod: "email",
};

export const LoginInitialFormData = {
  email: "",
  phone: "",
  password: "",
};

export const ForgetPasswordFormData = {
  email: "",
  phone: "",
};

export const ResetPasswordFormData = {
  newPassword: "",
  confirmPassword: "",
};

export const setAllFieldsNull = (formData) => {
  for (let key in formData) {
    if (formData.hasOwnProperty(key)) {
      formData[key] = "";
    }
  }
  return formData;
};
