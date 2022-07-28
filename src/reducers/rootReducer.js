import { combineReducers } from "redux";
import { loaderReducer } from "./loaderReducer";
import authReducer from "./AuthReducer/AuthReducer";
import { photoReducer } from "./photoVKApp/photoReducer";
import { userReducer } from "./photoVKApp/userReducer";
import { postsReducer } from "./PostsReducer/PostsReducer";
import { messageReducer } from "./MessageReducer/MessageReducer";

export const rootReducer = combineReducers({
  page: photoReducer,
  user: userReducer,
  loader: loaderReducer,
  login: authReducer,
  post: postsReducer,
  message: messageReducer,
});
