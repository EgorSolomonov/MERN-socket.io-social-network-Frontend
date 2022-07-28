export const setUserName = (name) => {
  return {
    type: "SET_USERNAME",
    payload: name,
  };
};

export const setUserNameError = () => {
  return {
    type: "SET_USERNAME_ERORR",
    error: true,
    payload: new Error("Ошибка при авторизации"),
  };
};
