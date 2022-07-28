export const getUser = (userData) => {
  return {
    type: "SET_USER",
    payload: userData,
  };
};

export const setIsFetching = (data) => {
  return {
    type: "SET_ISFETCHING",
    payload: data,
  };
};

export const setError = (err) => {
  return {
    type: "SET_ERROR",
    payload: err,
  };
};
