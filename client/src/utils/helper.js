export const setAllFieldsNull = (formData) => {
  for (let key in formData) {
    if (formData.hasOwnProperty(key)) {
      formData[key] = "";
    }
  }
  return formData;
};


