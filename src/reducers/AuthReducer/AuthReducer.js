import {
  getUser,
  setIsFetching,
  setError,
} from "../../actions/Login/LoginAction";
import {
  onSetProfileBirthday,
  onSetProfileCity,
  onSetProfileInfo,
  onSetProfilePicture,
  onSetProfileRelationship,
  onSetProfileStatus,
  setFriendProfileData,
  setFriendProfileDataZero,
  setImageName,
  setImageSize,
  setImageSRC,
  setProfiledData,
  setSearchResults,
  setSearchResultsZero,
} from "../../actions/Profile/ProfileAction";
import { signIn } from "../../actions/Registration/RegistrationActions";
import { loginUser } from "../../DAL/DAL_Login";
import {
  addFriend,
  deleteFriend,
  getChangedImagePath,
  getProtectedData,
  getSearchResults,
  getUserPicture,
  sendBirthday,
  sendCity,
  sendRelationship,
  sendStatus,
  subscribeOnFriend,
  unsubscribeFromFriend,
  updateUserImage,
} from "../../DAL/DAL_Profile";
import { registrateUser } from "../../DAL/DAL_Registration";
import { getAllProfilePostsThunk } from "../PostsReducer/PostsReducer";

export const initialState = {
  user: null,
  protectedUserData: null,
  isFetching: false,
  error: false,
  signIn: false,
  //ProfileInfo
  profileStatus: "",
  profileCity: "",
  profileBirthday: "",
  profileRelationship: "",
  profilePicture: "",
  //Activators
  statusActivator: false,
  infoActivator: false,
  switchMode: "light",
  profileImageChangerActivator: false,
  //Image menu
  profileImageName: "",
  profileImageSize: "",
  profileImageSrc: "",
  // Friends data
  friendProfiles: [],
  currentAccountFriends: [],
  // Search results
  searchResults: [],
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_ISFETCHING":
      return { ...state, isFetching: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SIGN_IN":
      return { ...state, signIn: action.payload };
    case "SET_TOGGLEACTIVATOR":
      return { ...state, statusActivator: action.payload };
    case "SET_TOGGLEINFO_ACTIVATOR":
      return { ...state, infoActivator: action.payload };
    case "SET_PROFILEINFO":
      return {
        ...state,
        profileStatus: action.payloadStatus,
        profileCity: action.payloadCity,
        profileBirthday: action.payloadBirthday,
        profileRelationship: action.payloadRelationship,
        profilePicture: action.payloadUserPicture,
      };
    case "SET_PROFILESTATUS":
      return { ...state, profileStatus: action.payload };
    case "SET_PROFILECITY":
      return { ...state, profileCity: action.payload };
    case "SET_PROFILEBIRTHDAY":
      return { ...state, profileBirthday: action.payload };
    case "SET_PROFILERELATIONSHIP":
      return { ...state, profileRelationship: action.payload };
    case "SET_PROFILEUSERPICTURE":
      return { ...state, profilePicture: action.payload };
    case "SET_PROFILEDATA":
      return { ...state, protectedUserData: action.payload };
    case "SET_FRIEND_PROFILEDATA":
      return {
        ...state,
        friendProfiles: [
          ...state.friendProfiles.filter(
            (element) => element._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case "SET_FRIEND_PROFILEDATA_ZERO":
      return {
        ...state,
        friendProfiles: [
          ...state.friendProfiles.filter((id) => id === action.payload),
        ],
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: [...state.searchResults, action.payload],
      };
    case "SET_SEARCH_RESULTS_ZERO":
      return {
        ...state,
        searchResults: [],
      };
    case "SET_SWITCHMODE":
      return {
        ...state,
        switchMode: state.switchMode === "light" ? "dark" : "light",
      };
    case "SET_IMAGENAME":
      return { ...state, profileImageName: action.payload };
    case "SET_IMAGESIZE":
      return { ...state, profileImageSize: action.payload };
    case "SET_IMAGESRC":
      return { ...state, profileImageSrc: action.payload };
    case "SET_IMAGE":
      return { ...state, profilePicture: action.payload };
    case "SET_IMAGECHANGER":
      return { ...state, profileImageChangerActivator: action.payload };

    default:
      return state;
  }
}

export const LoginThunk = (userValues) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await loginUser(userValues);
    if (response.status === 200) {
      const { createdAt, updatedAt, password, isAdmin, ...rest } =
        response.data;
      dispatch(getUser(rest));
      dispatch(getAllProfilePostsThunk(response.data._id));
      dispatch(onSetProfileInfo(rest));
    } else dispatch(setError(true));
    dispatch(setIsFetching(false));
  };
};

export const RegistrationThunk = (userValues) => {
  console.log(userValues);
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    const response = await registrateUser(userValues);
    if (response.status === 200) {
      dispatch(signIn(true));
    } else dispatch(setError(true));
    dispatch(setIsFetching(false));
  };
};

export const getProtectedUserDataThunk = (value, userId, type) => {
  return async (dispatch) => {
    if (type === "status") {
      await sendStatus(value, userId);
      const protectedUserData = await getProtectedData(userId);
      if (protectedUserData.status === 200) {
        dispatch(onSetProfileStatus(protectedUserData.data.profileStatus));
      } else dispatch(setError(true));
    } else if (type === "city") {
      await sendCity(value, userId);
      const protectedUserData = await getProtectedData(userId);
      if (protectedUserData.status === 200) {
        dispatch(onSetProfileCity(protectedUserData.data.city));
      } else dispatch(setError(true));
    } else if (type === "birthday") {
      await sendBirthday(value, userId);
      const protectedUserData = await getProtectedData(userId);
      if (protectedUserData.status === 200) {
        dispatch(onSetProfileBirthday(protectedUserData.data.birthday));
      } else dispatch(setError(true));
    } else if (type === "relationship") {
      await sendRelationship(value, userId);
      const protectedUserData = await getProtectedData(userId);
      if (protectedUserData.status === 200) {
        dispatch(onSetProfileRelationship(protectedUserData.data.relationship));
      } else dispatch(setError(true));
    } else if (type === "userPicture") {
      const protectedUserData = await getProtectedData(userId);
      if (protectedUserData.status === 200) {
        dispatch(onSetProfilePicture(protectedUserData.data.userPicture));
      } else dispatch(setError(true));
    }
  };
};

export const getProfileData = (userId) => {
  return async (dispatch) => {
    const profileData = await getProtectedData(userId);
    if (profileData.status === 200) {
      dispatch(setProfiledData(profileData.data));
      dispatch(getAllProfilePostsThunk(userId));
    }
  };
};

// Friends thunk functions

export const subscribeThunk = (userId, toUserId, type) => {
  return async (dispatch) => {
    if (type === "subscribe") {
      await subscribeOnFriend(userId, toUserId);
      dispatch(addDeleteFriends(userId, toUserId, type));
      dispatch(getProfileData(toUserId));
    } else if (type === "unsubscribe") {
      await unsubscribeFromFriend(userId, toUserId);
      dispatch(addDeleteFriends(userId, toUserId, type));
      dispatch(getProfileData(toUserId));
    }
  };
};
export const addDeleteFriends = (userId, toUserId, type) => {
  return async (dispatch) => {
    const profile = await getProtectedData(userId);
    if (profile.status === 200) {
      if (type === "subscribe") {
        profile.data.followers.map((podpischikId) => {
          // eslint-disable-next-line
          return profile.data.followings.map(async (podpiskaId) => {
            if (podpischikId === podpiskaId && podpischikId === toUserId)
              await addFriend(userId, podpischikId);
            dispatch(getFriendProfileData(toUserId));
          });
        });
      } else if (type === "unsubscribe") {
        await deleteFriend(userId, toUserId);
        dispatch(getFriendProfileData(toUserId));
        dispatch(setFriendProfileDataZero(toUserId));
      }
    }
  };
};
export const getFriendProfileData = (profileId) => {
  return async (dispatch) => {
    dispatch(setFriendProfileDataZero(profileId));
    const profile = await getProtectedData(profileId);
    if (profile.status === 200) {
      let friendsProfs = await Promise.all(
        profile.data.friends.map((id) => {
          return getProtectedData(id);
        })
      );

      friendsProfs.forEach((profile) => {
        dispatch(setFriendProfileData(profile.data));
      });
    }
  };
};

// UserPicture thunk functions

export const showChosenProfilePictureThunk = (fileData) => {
  return (dispatch) => {
    let reader = new FileReader(); // создание объекта чтения загружаемого файла

    if (fileData !== "") {
      dispatch(setImageName(fileData.name)); // отображение имени файла
      dispatch(setImageSize(Math.round(fileData.size / 1000))); // отображение размера файла

      if (fileData.type.startsWith("image/")) {
        reader.onload = function (event) {
          dispatch(setImageSRC(event.target.result)); // замена src файла
          return event.target.result;
        };
        reader.readAsDataURL(fileData);
      }
    } else {
      dispatch(setImageName(fileData)); // удаление информации имени файла
      dispatch(setImageSize(fileData)); // удаление информации размера файла
      dispatch(setImageSRC(fileData)); // удаление информации src файла
    }
  };
};
export const submitImageToServerAndDataBaseThunk = (userId, file, type) => {
  return async (dispatch) => {
    const data = new FormData();
    data.append("file", file);

    const filePath = await getChangedImagePath(data);

    const pic = await getUserPicture(
      filePath.data.slice(8, filePath.data.length)
    );
    await updateUserImage(userId, pic.config.url);
    dispatch(getProfileData(userId));
    dispatch(getProtectedUserDataThunk(null, userId, type));
  };
};

export const showChosenProfileSearchThunk = (letter, type) => {
  return async (dispatch) => {
    if (type === "activate") {
      dispatch(setSearchResultsZero());
      const users = await getSearchResults(letter);
      if (users.status === 200) {
        users.data.forEach((user) => dispatch(setSearchResults(user)));
      }
    } else if (type === "disactivate") {
      dispatch(setSearchResultsZero());
    }
  };
};

export default authReducer;
