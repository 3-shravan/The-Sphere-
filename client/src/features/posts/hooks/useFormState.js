
import { useState, useRef } from "react";

 const usePostFormState = (initialPost) => {
   const [formState, setFormState] = useState({
      caption: initialPost?.caption || "",
      file: null,
      location: initialPost?.location || "",
      tags: initialPost?.tags ? initialPost.tags.join(",") : "",
   });

   const [errors, setErrors] = useState({
      caption: "",
      file: "",
      location: "",
      tags: "",
   });

   const [preview, setPreview] = useState(initialPost?.imageUrl || null);
   const fileInputRef = useRef(null);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));

      if (errors[name]) {
         setErrors((prev) => ({ ...prev, [name]: "" }));
      }
   };

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         setFormState((prev) => ({ ...prev, file: selectedFile }));

         const reader = new FileReader();
         reader.onload = () => setPreview(reader.result);
         reader.readAsDataURL(selectedFile);

         setErrors((prev) => ({ ...prev, file: "" }));
      }
   };

   const clearPreview = () => {
      setPreview(null);
      setFormState((prev) => ({ ...prev, file: null }));
   };

   return {
      formState,
      setFormState,
      errors,
      setErrors,
      preview,
      setPreview,
      fileInputRef,
      handleChange,
      handleFileChange,
      clearPreview,
   };
};

export default usePostFormState;
