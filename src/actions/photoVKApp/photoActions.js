export const setYear = (year) => {
  return {
    type: "SET_YEAR",
    payload: year,
  };
};

export const getPhotos = (photoArr) => {
  return {
    type: "GET_PHOTOS",
    payload: photoArr,
  };
};

export const setPhotoGettingError = (err) => {
  return {
    type: "SET_ERROR",
    error: true,
    payload: err,
  };
};
