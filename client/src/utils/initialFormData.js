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
	for (const key in formData) {
		if (Object.hasOwn(formData, key)) {
			formData[key] = "";
		}
	}
	return formData;
};
