import axios from "axios";

export function getAllPosts(userId) {
  return axios.get(
    `https://mern-socket-socialnetwork.herokuapp.com/api/post/${userId}`
  );
}

export const getPostImgChangedPath = (file) => {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/upload/postimg`,
    file
  );
};

export function createNewPost(userId, toUserId, text, imgSrc) {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/post`,
    {
      userId: userId,
      sendToUserId: toUserId,
      description: text,
      img: imgSrc,
    }
  );
}

export function updatePosts(postId, text) {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/post/${postId}`,
    {
      description: text,
    }
  );
}

export function deletePosts(postId) {
  return axios.delete(
    `https://mern-socket-socialnetwork.herokuapp.com/api/post/${postId}`
  );
}

export function likeDislikePosts(postId, userId) {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/post/${postId}/like`,
    {
      userId: userId,
    }
  );
}
