export const toggleProfileStatusActivator = (data) => {
  return {
    type: "SET_TOGGLEACTIVATOR",
    payload: data,
  };
};

export const toggleProfileInfoActivator = (data) => {
  return {
    type: "SET_TOGGLEINFO_ACTIVATOR",
    payload: data,
  };
};

export const onSetProfileInfo = (data) => {
  return {
    type: "SET_PROFILEINFO",
    payloadStatus: data.profileStatus,
    payloadCity: data.city,
    payloadBirthday: data.birthday,
    payloadRelationship: data.relationship,
    payloadUserPicture: data.userPicture,
  };
};

export const onSetProfileStatus = (status) => {
  return {
    type: "SET_PROFILESTATUS",
    payload: status,
  };
};
export const onSetProfileCity = (city) => {
  return {
    type: "SET_PROFILECITY",
    payload: city,
  };
};
export const onSetProfileBirthday = (birthday) => {
  return {
    type: "SET_PROFILEBIRTHDAY",
    payload: birthday,
  };
};
export const onSetProfileRelationship = (relationship) => {
  return {
    type: "SET_PROFILERELATIONSHIP",
    payload: relationship,
  };
};
export const onSetProfilePicture = (userPicture) => {
  return {
    type: "SET_PROFILEUSERPICTURE",
    payload: userPicture,
  };
};

export const setProfiledData = (data) => {
  return {
    type: "SET_PROFILEDATA",
    payload: data,
  };
};

export const setFriendProfileData = (data) => {
  return {
    type: "SET_FRIEND_PROFILEDATA",
    payload: data,
  };
};
export const setFriendProfileDataZero = (data) => {
  return {
    type: "SET_FRIEND_PROFILEDATA_ZERO",
    payload: data,
  };
};

export const setSwitch = (data) => {
  return {
    type: "SET_SWITCHMODE",
    payload: data,
  };
};

export const setImageName = (imageName) => {
  return {
    type: "SET_IMAGENAME",
    payload: imageName,
  };
};

export const setImageSize = (imageSize) => {
  return {
    type: "SET_IMAGESIZE",
    payload: imageSize,
  };
};

export const setImageSRC = (src) => {
  return {
    type: "SET_IMAGESRC",
    payload: src,
  };
};

export const setUserImg = (picture) => {
  return {
    type: "SET_IMAGE",
    payload: picture,
  };
};

export const toggleProfImageChanger = (data) => {
  return {
    type: "SET_IMAGECHANGER",
    payload: data,
  };
};

export const setSearchResults = (data) => {
  return {
    type: "SET_SEARCH_RESULTS",
    payload: data,
  };
};

export const setSearchResultsZero = (data) => {
  return {
    type: "SET_SEARCH_RESULTS_ZERO",
    payload: data,
  };
};
