import {
  deleteConversations,
  deleteMessages,
  fillUnreadMessage,
  filterUnreadMessage,
  setConversationSearch,
  setConversationSearchZero,
  setFetching,
  setOnlineFriends,
  setOnlineFriendsZero,
  showConversations,
  showMessages,
  toggleActivator,
} from "../../actions/Conversations/conversationAction";
import {
  createConversation,
  createMessage,
  deleteConversation,
  getAllConversations,
  getAllMessages,
} from "../../DAL/DAL_Conversations";
import { getProtectedData, getSearchResults } from "../../DAL/DAL_Profile";

export const initialState = {
  conversations: [],
  messages: [],
  conversationToggle: [],
  messageText: "",
  // Search results
  conversationSearch: [],
  isFetching: false,
  // Socket
  messageFromSocket: null,
  socketUsersAmount: null,
  onlineFriends: [],
  unreadedMessage: [],
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONVERSATIONS":
      return {
        ...state,
        conversations: [...state.conversations, action.payload],
      };
    case "DELETE_CONVERSATIONS":
      return {
        ...state,
        conversations: [],
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "DELETE_MESSAGES":
      return {
        ...state,
        messages: [],
      };
    case "TOGGLE_CONVERSATION":
      return {
        ...state,
        conversationToggle: [action.payload],
      };
    case "SET_TEXT":
      return {
        ...state,
        messageText: action.payload,
      };
    case "DELETE_CONVERSATION":
      return {
        ...state,
        conversations: [
          ...state.conversations.filter((conv) => conv._id === action.payload),
        ],
      };
    case "SET_SEARCH_RESULTS_CONVERSATIONS":
      return {
        ...state,
        conversationSearch: [...state.conversationSearch, action.payload],
      };
    case "SET_SEARCH_RESULTS_CONVERSATIONS_ZERO":
      return {
        ...state,
        conversationSearch: [],
      };
    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.payload,
      };
    case "SET_SOCKET_MESSAGE":
      return {
        ...state,
        messageFromSocket: action.payload,
      };
    case "SET_SOCKET_AMOUNT":
      return {
        ...state,
        socketUsersAmount: action.payload,
      };
    case "SET_ONLINE_FRIENDS":
      return {
        ...state,
        onlineFriends: [
          ...state.onlineFriends.filter(
            (user) => user._id !== action.payload._id
          ),
          action.payload,
        ],
      };
    case "SET_ONLINE_FRIENDS_ZERO":
      return { ...state, onlineFriends: [] };
    case "SET_UNREAD_MESSAGE":
      return {
        ...state,
        unreadedMessage: [...state.unreadedMessage, action.payload],
      };
    case "SET_FILTRED_UNREAD_MESSAGE":
      return {
        ...state,
        unreadedMessage: [
          ...state.unreadedMessage.filter(
            (message) => message.conversationId !== action.payload
          ),
        ],
      };
    default:
      return state;
  }
};

export const getConversationsThunk = (userId) => {
  return async (dispatch) => {
    dispatch(deleteConversations());

    const conversations = await getAllConversations(userId);

    let array = [];
    if (conversations.status === 200) {
      const userDataArray = await Promise.all(
        // eslint-disable-next-line
        conversations.data.map((eachConv) => {
          if (userId === eachConv.members[0]) {
            return getProtectedData(eachConv.members[1]);
          } else if (userId === eachConv.members[1]) {
            return getProtectedData(eachConv.members[0]);
          }
        })
      );

      conversations.data.map((conversation) => {
        // eslint-disable-next-line
        return userDataArray.map((data) => {
          if (conversation.members[1] === data.data._id) {
            array.push(Object.assign(conversation, data));
          } else if (conversation.members[0] === data.data._id) {
            array.push(Object.assign(conversation, data));
          }
        });
      });
    }

    array.forEach((data) => dispatch(showConversations(data)));
  };
};

export const getChatMessengesThunk = (conversationId) => {
  return async (dispatch) => {
    dispatch(deleteMessages());

    const messages = await getAllMessages(conversationId);

    let array = [];
    let set = new Set();
    if (messages.status === 200) {
      const userDataArray = await Promise.all(
        messages.data.map((eachMess) => {
          return getProtectedData(eachMess.author);
        })
      );

      messages.data.map((message) => {
        // eslint-disable-next-line
        return userDataArray.map((data) => {
          if (message.author === data.data._id) {
            set.add(Object.assign(message, data));
          }
        });
      });
    }

    for (let message of set) {
      array.push(message);
    }

    array.forEach((data) => dispatch(showMessages(data)));
  };
};

export const toggleConversationThunk = (conversationId) => {
  return async (dispatch) => {
    dispatch(toggleActivator(conversationId));
  };
};

export const createMessageThunk = (conversationId, author, text, type) => {
  return async (dispatch) => {
    if (type === "don't create message") {
      const userData = await getProtectedData(author);

      dispatch(
        showMessages(
          Object.assign(
            {
              conversationId,
              author,
              text,
              createdAt: new Date(),
            },
            userData
          )
        )
      );
    } else {
      const newMessage = await createMessage(conversationId, author, text);
      const userData = await getProtectedData(author);

      dispatch(showMessages(Object.assign(newMessage.data, userData)));
    }
  };
};

export const showProfileToStartConversationThunk = (
  letter,
  type,
  currentUserId
) => {
  return async (dispatch) => {
    if (type === "activate") {
      dispatch(setConversationSearchZero());
      dispatch(setFetching(true));
      const users = await getSearchResults(letter);
      if (users.status === 200) {
        users.data.forEach((user) => {
          if (user._id !== currentUserId) dispatch(setConversationSearch(user));
        });
      }
      dispatch(setFetching(false));
    } else if (type === "disactivate") {
      dispatch(setConversationSearchZero());
    }
  };
};

export const deleteConversationThunk = (conversationId, currentUserId) => {
  return async (dispatch) => {
    await deleteConversation(conversationId);
    dispatch(getConversationsThunk(currentUserId));
    setTimeout(() => {
      dispatch(deleteMessages());
    }, 300);
  };
};

export const createConversationThunk = (senderId, receiverId) => {
  return async (dispatch) => {
    await createConversation(senderId, receiverId);
    dispatch(setConversationSearchZero());
  };
};

export const setOnlineFriendsThunk = (friends) => {
  return async (dispatch) => {
    dispatch(setOnlineFriendsZero());
    if (friends !== null) {
      const friendsData = await Promise.all(
        friends.map((friend) => {
          return getProtectedData(friend.userId);
        })
      );

      friendsData.forEach((user) => dispatch(setOnlineFriends(user.data)));
    }
  };
};

export const setUnreadedMessageThunk = (data, conversationId, type) => {
  return async (dispatch) => {
    if (type === "fill") {
      dispatch(fillUnreadMessage(data));
    } else if (type === "filter") {
      data.map((message) =>
        message.conversationId === conversationId
          ? dispatch(filterUnreadMessage(message))
          : null
      );
    }
  };
};
