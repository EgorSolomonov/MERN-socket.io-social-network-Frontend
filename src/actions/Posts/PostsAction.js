export const setPostText = (text) => {
  return {
    type: "SET_POSTTEXT",
    payload: text,
  };
};

export const setPosts = (posts) => {
  return {
    type: "SET_POSTS",
    payload: posts,
  };
};

export const togglePopup = (data) => {
  return {
    type: "TOGGLE_POSTPOPUP",
    payload: data,
  };
};

export const pushIdToPopup = (id) => {
  return {
    type: "PUSH_ID_POPUPARRAY",
    payload: id,
  };
};

export const deleteIdFromPopup = (id) => {
  return {
    type: "DELETE_ID_POPUPARRAY",
    payload: id,
  };
};

export const pushIdPostTextFieldArray = (id) => {
  return {
    type: "PUSH_ID_TEXTFIELD_ACTIVATORARRAY",
    payload: id,
  };
};

export const deleteIdPostTextFieldArray = (id) => {
  return {
    type: "DELETE_ID_TEXTFIELD_ACTIVATORARRAY",
    payload: id,
  };
};

export const showPostPeopleWhoLiked = (id) => {
  return {
    type: "PUSH_ID_POSTLIKED_ARRAY",
    payload: id,
  };
};

export const removePostPeopleWhoLiked = (id) => {
  return {
    type: "DELETE_ID_POSTLIKED_ARRAY",
    payload: id,
  };
};

export const pushLikedPeopleData = (data) => {
  return {
    type: "PUSH_DATA_POSTLIKEDPEOPLE",
    payload: data,
  };
};
export const deleteLikedPeopleData = (data) => {
  return {
    type: "DELETE_DATA_POSTLIKEDPEOPLE",
    payload: data,
  };
};

export const setPostImageSrc = (data) => {
  return {
    type: "SET_POST_IMAGESRC",
    payload: data,
  };
};
