import React from "react";

const useForm = (initialState = {}) => {
  const [formData, setFormData] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const resetForm = () => setFormData(initialState);

  return { formData, setFormData, handleChange, resetForm };
};
export default useForm;
