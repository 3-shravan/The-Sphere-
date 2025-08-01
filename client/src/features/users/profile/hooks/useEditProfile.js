import { useState } from "react";
import { useUpdateProfile } from "../../services";

const useEditProfile = (user) => {
  const [dob, setDob] = useState(user?.dob || null);
  const [gender, setGender] = useState(user?.gender || "");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null);

  const { mutate, isPending } = useUpdateProfile();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (dob) {
      const formattedDob = new Date(dob).toISOString().split("T")[0];
      formData.append("dob", formattedDob);
    }
    if (profileImage) formData.append("profilePicture", profileImage);
    await mutate(formData);
    setProfileImage(null);
  };

  return {
    dob,
    setDob,
    gender,
    setGender,
    previewImage,
    handleImageChange,
    handleSubmit,
    isPending,
  };
};

export default useEditProfile;
