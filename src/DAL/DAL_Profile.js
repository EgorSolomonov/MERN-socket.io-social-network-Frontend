import axios from "axios";

export function getProtectedData(userId) {
  return axios.get(
    `https://mern-socket-socialnetwork.herokuapp.com/api/users?userId=${userId}`
  );
}

export const sendStatus = (value, userId) => {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/users/${userId}`,
    {
      profileStatus: value,
      userId: userId,
    }
  );
};

export const sendCity = (value, userId) => {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/users/${userId}`,
    {
      city: value,
      userId: userId,
    }
  );
};

export const sendBirthday = (value, userId) => {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/users/${userId}`,
    {
      birthday: value,
      userId: userId,
    }
  );
};

export const sendRelationship = (value, userId) => {
  return axios.put(
    `https://mern-socket-socialnetwork.herokuapp.com/api/users/${userId}`,
    {
      relationship: value,
      userId: userId,
    }
  );
};

export const getChangedImagePath = (file) => {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/upload/avatar`,
    file
  );
};

export const updateUserImage = (userId, filePath) => {
  return axios.put(`http://localhost:8080/api/users/${userId}`, {
    userId: userId,
    userPicture: filePath,
  });
};

export const getUserPicture = (fileName) => {
  return axios.get(`http://localhost:8080/uploads/${fileName}`);
};

export const subscribeOnFriend = (userId, toUserId) => {
  return axios.put(`http://localhost:8080/api/users/${toUserId}/follow`, {
    userId,
  });
};

export const unsubscribeFromFriend = (userId, toUserId) => {
  return axios.put(`http://localhost:8080/api/users/${toUserId}/unfollow`, {
    userId,
  });
};

export const addFriend = (userId, toUserId) => {
  return axios.put(`http://localhost:8080/api/users/${toUserId}/addfriend`, {
    userId,
  });
};
export const deleteFriend = (userId, toUserId) => {
  return axios.put(`http://localhost:8080/api/users/${toUserId}/deletefriend`, {
    userId,
  });
};

export function getSearchResults(letter) {
  return axios.get(`http://localhost:8080/api/users/search?userName=${letter}`);
}
