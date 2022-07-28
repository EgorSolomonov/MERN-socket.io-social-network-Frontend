export const showConversations = (data) => {
  return {
    type: "SET_CONVERSATIONS",
    payload: data,
  };
};

export const deleteConversations = () => {
  return {
    type: "DELETE_CONVERSATIONS",
  };
};

export const showMessages = (data) => {
  return {
    type: "SET_MESSAGES",
    payload: data,
  };
};

export const deleteMessages = () => {
  return {
    type: "DELETE_MESSAGES",
  };
};

export const toggleActivator = (data) => {
  return {
    type: "TOGGLE_CONVERSATION",
    payload: data,
  };
};

export const setMessageText = (text) => {
  return {
    type: "SET_TEXT",
    payload: text,
  };
};

export const setConversationSearch = (data) => {
  return {
    type: "SET_SEARCH_RESULTS_CONVERSATIONS",
    payload: data,
  };
};

export const setConversationSearchZero = (data) => {
  return {
    type: "SET_SEARCH_RESULTS_CONVERSATIONS_ZERO",
    payload: data,
  };
};

export const deleteConversation = (data) => {
  return {
    type: "DELETE_CONVERSATION",
    payload: data,
  };
};

export const setFetching = (data) => {
  return {
    type: "SET_FETCHING",
    payload: data,
  };
};

export const setSocketMessage = (data) => {
  return {
    type: "SET_SOCKET_MESSAGE",
    payload: data,
  };
};

export const setSocketUsersAmount = (amount) => {
  return {
    type: "SET_SOCKET_AMOUNT",
    payload: amount,
  };
};

export const setOnlineFriends = (friends) => {
  return {
    type: "SET_ONLINE_FRIENDS",
    payload: friends,
  };
};

export const setOnlineFriendsZero = () => {
  return {
    type: "SET_ONLINE_FRIENDS_ZERO",
  };
};

export const fillUnreadMessage = (message) => {
  return {
    type: "SET_UNREAD_MESSAGE",
    payload: message,
  };
};

export const filterUnreadMessage = (message) => {
  return {
    type: "SET_FILTRED_UNREAD_MESSAGE",
    payload: message.conversationId,
  };
};
