import ApiError from "../core/errors/apiError.js";

export const validatePhoneNo = (phoneNumber) => {
  const phoneRegex = /^(\+91|91)?[-\s]?[6-9]\d{9}$/;
  return phoneNumber && phoneRegex.test(phoneNumber);
};

export const isAtLeast13YearsOld = (dateOfBirth) => {
  const thirteenYearsAgo = new Date();
  thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear() - 13);
  return dateOfBirth <= thirteenYearsAgo;
};

export const parseArray = (arr) => {
  let result = [];
  try {
    typeof arr === "string"
      ? (result = JSON.parse(arr || "[]"))
      : (result = arr);
    return result;
  } catch (_error) {}
  throw new ApiError(400, "Invalid array format");
};

export const postChanges = (post, newPost) => {
  const { caption, location, tags } = newPost;
  const isCaptionSame = caption === post.caption;
  const isLocationSame = location === post.location;
  const isTagsSame =
    Array.isArray(post.tags) &&
    Array.isArray(tags) &&
    post.tags.length === tags.length &&
    post.tags.every((tag, index) => tag === tags[index]);

  const isUnchanged = isCaptionSame && isLocationSame && isTagsSame;
  return {
    isUnchanged,
    isCaptionSame,
    isLocationSame,
    isTagsSame,
  };
};

export const profileChanges = (
  currentUser,
  newData,
  hasNewProfilePicture = false
) => {
  const { name, fullName, bio, gender, dob: birthday } = newData;

  const newDob = birthday ? new Date(birthday) : null;

  const isNameSame = currentUser.name === name.trim();
  const isFullNameSame = currentUser.fullName === fullName.trim();
  const isBioSame = currentUser.bio === bio.trim();
  const isGenderSame = currentUser.gender === gender;

  let isDobSame = true;
  if (newDob instanceof Date && !Number.isNaN(newDob.getTime())) {
    const currentDob = currentUser.dob ? new Date(currentUser.dob) : null;
    isDobSame = currentDob && currentDob.getTime() === newDob.getTime();
  } else if (!newDob && !currentUser.dob) {
    isDobSame = true;
  } else if (!newDob && currentUser.dob) {
    isDobSame = true;
  } else {
    isDobSame = false;
  }

  const isProfilePictureSame = !hasNewProfilePicture;

  const isUnchanged =
    isNameSame &&
    isFullNameSame &&
    isBioSame &&
    isGenderSame &&
    isDobSame &&
    isProfilePictureSame;

  return {
    isUnchanged,
    isNameSame,
    isFullNameSame,
    isBioSame,
    isGenderSame,
    isDobSame,
    isProfilePictureSame,
  };
};
