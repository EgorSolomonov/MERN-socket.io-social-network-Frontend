import { setLoader } from "../../actions/Loader/loaderAction";
import {
  setUserName,
  setUserNameError,
} from "../../actions/photoVKApp/userActions";

export const initialState = {
  user: {
    name: null,
    error: false,
  },
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, name: action.payload };
    case "SET_USERNAME_ERORR":
      return { ...state, error: action.error, name: action.payload };

    default:
      return state;
  }
}

export const userLogInThunk = () => {
  return (dispatch) => {
    dispatch(setLoader(true));
    //eslint-disable-next-line no-undef
    VK.Auth.login(function (response) {
      if (response.session) {
        /* Пользователь успешно авторизовался */
        dispatch(setUserName(response.session.user.first_name));
      } else {
        /* Пользователь нажал кнопку Отмена в окне авторизации */
        dispatch(setUserNameError());
      }
    }, 4);
    dispatch(setLoader(false));
  };
};

export const userLogOutThunk = () => {
  return (dispatch) => {
    dispatch(setLoader(true));
    //eslint-disable-next-line no-undef
    VK.Auth.logout(function (response) {
      dispatch(setUserName(undefined));
    });
    dispatch(setLoader(false));
  };
};
