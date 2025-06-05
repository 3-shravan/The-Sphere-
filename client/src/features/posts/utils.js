
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
