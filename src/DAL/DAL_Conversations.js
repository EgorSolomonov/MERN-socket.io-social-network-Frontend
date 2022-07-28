import axios from "axios";

export const getAllConversations = (userId) => {
  return axios.get(
    `https://mern-socket-socialnetwork.herokuapp.com/api/conversation/${userId}`
  );
};

export const getAllMessages = (conversationId) => {
  return axios.get(
    `https://mern-socket-socialnetwork.herokuapp.com/api/message/${conversationId}`
  );
};

export const createMessage = (conversationId, author, text) => {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/message/`,
    {
      conversationId,
      author,
      text,
    }
  );
};

export const createConversation = (senderId, receiverId) => {
  return axios.post(
    `https://mern-socket-socialnetwork.herokuapp.com/api/conversation/`,
    {
      senderId,
      receiverId,
    }
  );
};

export const deleteConversation = (conversationId) => {
  return axios.delete(
    `https://mern-socket-socialnetwork.herokuapp.com/api/conversation/${conversationId}`
  );
};
