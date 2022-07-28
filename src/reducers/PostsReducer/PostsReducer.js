import {
  deleteLikedPeopleData,
  pushLikedPeopleData,
  removePostPeopleWhoLiked,
  setPostImageSrc,
  setPosts,
  showPostPeopleWhoLiked,
} from "../../actions/Posts/PostsAction";
import {
  createNewPost,
  deletePosts,
  getAllPosts,
  getPostImgChangedPath,
  likeDislikePosts,
  updatePosts,
} from "../../DAL/DAL_Posts";
import { getProtectedData } from "../../DAL/DAL_Profile";

export const initialState = {
  postText: "",
  posts: [],
  popupIdArray: [],
  postLikesArray: [],
  postPopup: false,
  textFieldActivatorArray: [],
  likedPeopleData: "",
  uploadImageSrc: "",
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSTTEXT":
      return { ...state, postText: action.payload };
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "TOGGLE_POSTPOPUP":
      return { ...state, postPopup: action.payload };
    case "PUSH_ID_POPUPARRAY":
      return {
        ...state,
        popupIdArray: [action.payload],
      };
    case "DELETE_ID_POPUPARRAY":
      return {
        ...state,
        popupIdArray: [
          ...state.popupIdArray.filter((id) => id !== action.payload),
        ],
      };
    case "PUSH_ID_POSTLIKED_ARRAY":
      return {
        ...state,
        postLikesArray: [action.payload],
      };
    case "DELETE_ID_POSTLIKED_ARRAY":
      return {
        ...state,
        postLikesArray: [],
      };
    case "PUSH_DATA_POSTLIKEDPEOPLE":
      return {
        ...state,
        likedPeopleData: action.payload,
      };
    case "DELETE_DATA_POSTLIKEDPEOPLE":
      return {
        ...state,
        likedPeopleData: [],
      };
    case "PUSH_ID_TEXTFIELD_ACTIVATORARRAY":
      return { ...state, textFieldActivatorArray: [action.payload] };
    case "DELETE_ID_TEXTFIELD_ACTIVATORARRAY":
      return {
        ...state,
        textFieldActivatorArray: [
          ...state.textFieldActivatorArray.filter(
            (id) => id !== action.payload
          ),
        ],
      };
    case "SET_POST_IMAGESRC":
      return { ...state, uploadImageSrc: action.payload };
    case "SET_POST_IMAGESRC_ZERO":
      return { ...state, uploadImageSrc: "" };

    default:
      return state;
  }
};

export const createNewPostThunk = (userId, toUserId, text, image) => {
  return async (dispatch) => {
    if (!toUserId) {
      toUserId = userId;

      const data = new FormData();
      data.append("file", image);

      const filePath = await getPostImgChangedPath(data);
      const correctPath = `https://mern-socket-socialnetwork.herokuapp.com/${filePath.data}`;

      console.log(correctPath);

      await createNewPost(userId, toUserId, text, correctPath);
      dispatch(getAllProfilePostsThunk(userId));
      dispatch(setPostImageSrc(""));
    } else {
      const data = new FormData();
      data.append("file", image);

      const filePath = await getPostImgChangedPath(data);
      const correctPath = `https://mern-socket-socialnetwork.herokuapp.com/${filePath.data}`;

      await createNewPost(userId, toUserId, text, correctPath);
      dispatch(getAllProfilePostsThunk(toUserId));
      dispatch(setPostImageSrc(""));
    }
  };
};

export const getAllProfilePostsThunk = (userId) => {
  return async (dispatch) => {
    const posts = await getAllPosts(userId);

    const postAuthors = [];
    const filtredAuthors = [];
    let users = [];

    // Создание массива всех авторов
    posts.data.map((i) => postAuthors.push(i.userId));

    // Фильтрация уникальных авторов
    postAuthors.forEach((a) =>
      !filtredAuthors.includes(a) ? filtredAuthors.push(a) : null
    );

    users = await Promise.all(
      posts.data.map(async (post) => {
        // Запрос всех постов для каждого автора
        let requests = await Promise.all(
          filtredAuthors.map((author) => getProtectedData(author))
        );

        // Объединение данных постов и их авторов
        for (const item of requests) {
          if (item.data._id === post.userId) {
            return Object.assign(item.data, post);
          }
        }
      })
    );
    dispatch(setPosts(users.reverse()));
  };
};

export const updatePostThunk = (
  postId,
  userId,
  postAuthorId,
  profileId,
  text
) => {
  return async (dispatch) => {
    if (
      (userId === profileId && userId === postAuthorId) ||
      (!profileId && userId === postAuthorId)
    ) {
      await updatePosts(postId, text);
      dispatch(getAllProfilePostsThunk(userId));
    } else if (userId !== profileId && userId === postAuthorId) {
      await updatePosts(postId, text);
      dispatch(getAllProfilePostsThunk(profileId));
    }
  };
};

export const deletePostThunk = (postId, userId, postAuthorId, profileId) => {
  return async (dispatch) => {
    if (userId === profileId || !profileId) {
      await deletePosts(postId);
      dispatch(getAllProfilePostsThunk(userId));
    } else if (userId !== profileId && userId === postAuthorId) {
      await deletePosts(postId);
      dispatch(getAllProfilePostsThunk(profileId));
    }
  };
};

export const likeOrDislikeThunk = (postId, userId, profileId) => {
  return async (dispatch) => {
    await likeDislikePosts(postId, userId);
    dispatch(getAllProfilePostsThunk(profileId));
  };
};

export const getAndShowWhoLikedThunk = (userIds, postId, type) => {
  return async (dispatch) => {
    const likedDataArray = [];
    if (type === "show") {
      dispatch(showPostPeopleWhoLiked(postId));
      const peopleWhoLikedData = await Promise.all(
        userIds.map((id) => getProtectedData(id))
      );

      // eslint-disable-next-line
      peopleWhoLikedData.map((data) => {
        if (!likedDataArray.includes(data.data)) likedDataArray.push(data.data);
      });

      dispatch(pushLikedPeopleData(likedDataArray));
    } else if (type === "remove") {
      dispatch(removePostPeopleWhoLiked(postId));
      dispatch(deleteLikedPeopleData());
    }
  };
};

export const addPhotoThunk = (fileData) => {
  return async (dispatch) => {
    let reader = new FileReader();

    if (fileData.type.startsWith("image/")) {
      reader.onload = function (event) {
        dispatch(setPostImageSrc(event.target.result)); // замена src файла
        return event.target.result;
      };
      reader.readAsDataURL(fileData);
    }
  };
};
