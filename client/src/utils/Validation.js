export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
};

export const isValidPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(String(phone));
};

export const validateForm = (formData, stage) => {
  if (stage === 3) {
    if (
      formData.verificationMethod === "email" &&
      !isValidEmail(formData.email)
    )
      return "Please provide a valid email address.";
    if (
      formData.verificationMethod === "phone" &&
      !isValidPhone(formData.phone)
    )
      return "Please provide a valid phone number.";

    if (!formData.email.trim() && !formData.phone.trim())
      return "Please provide either phone or email for verification.";

    return null;
  }
};

export const validForgetEmail = (formData, byEmail) => {
  return byEmail && (!formData.email.trim() || !isValidEmail(formData.email));
};

export const validForgetPhone = (formData, byEmail) => {
  return !byEmail && (!formData.phone.trim() || !isValidPhone(formData.phone));
};



export const validatePostForm = (formState, action, existingImage) => {
  let isValid = true;
  const newErrors = { caption: "", file: "", location: "", tags: "" };

  if (formState.caption.length > 2200) {
    newErrors.caption = "Caption must be less than 2200 characters";
    isValid = false;
  }

  if (action === "Create" && !formState.file && !existingImage) {
    newErrors.file = "Please select an image";
    isValid = false;
  }

  if (formState.tags && formState.tags.length > 100) {
    newErrors.tags = "Tags must be less than 100 characters";
    isValid = false;
  }

  return { isValid, newErrors };
};

export const formatTags = (tagsString) => {
  return tagsString
    .split(" ")
    .map((tag) => tag.trim())
    .filter((tag) => tag !== "");
};


