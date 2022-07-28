import React, { useEffect } from "react";
import "./Conversations.scss";
import friendLogo from "../../../utils/friendLogo.jpg";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Conversations = React.memo((props) => {
  const {
    conversations,
    getChatMessenges,
    conversationToggle,
    toggleConversation,
    messages,
    deleteConversation,
    getConversations,
    unreadedMessage,
    setUnreadedMessage,
  } = props;

  useEffect(() => {
    toggleConversation(null);
    getChatMessenges();
    getConversations(props.userData._id);
    return () => {
      props.toggleConversation(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setUnreadedMessage(unreadedMessage, conversationToggle[0], "filter");
    // eslint-disable-next-line
  }, [unreadedMessage, conversationToggle]);

  const showChat = (e) => {
    toggleConversation(e.currentTarget.id);
    getChatMessenges(e.currentTarget.id);
  };

  const deleteDialogConversation = (e) => {
    deleteConversation(e.currentTarget.id, props.userData._id);
    getChatMessenges();
  };

  return (
    <div className="conversations_wrapper">
      {conversations.length !== 0 ? (
        conversations.map((userConv) => {
          if (!conversationToggle.includes(userConv._id)) {
            return (
              <div
                className={
                  !conversationToggle.includes(userConv._id)
                    ? "conversation_items"
                    : "conversation_items selected"
                }
                id={userConv._id}
                key={userConv._id}
                onClick={
                  messages.length === 0 ||
                  !conversationToggle.includes(userConv._id)
                    ? showChat
                    : null
                }
              >
                <div className="user_logo">
                  <img
                    src={
                      !userConv.data.userPicture
                        ? friendLogo
                        : userConv.data.userPicture
                    }
                    alt="user-logo"
                  />
                  <p>{userConv.data.name}</p>
                </div>
                {
                  // eslint-disable-next-line
                  unreadedMessage.map((data) => {
                    if (
                      data.conversationId === userConv._id &&
                      data.authorId === userConv.data._id
                    ) {
                      return (
                        <div className="unread_messages">
                          <div className="blueCircle"></div>
                        </div>
                      );
                    }
                  })
                }
                <div className="delete_thisConversation">
                  <IconButton
                    onClick={deleteDialogConversation}
                    id={userConv._id}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className={
                  !conversationToggle.includes(userConv._id)
                    ? "conversation_items"
                    : "conversation_items selected"
                }
                id={userConv._id}
                key={userConv._id}
              >
                <div className="user_logo">
                  <img
                    src={
                      !userConv.data.userPicture
                        ? friendLogo
                        : userConv.data.userPicture
                    }
                    alt="user-logo"
                  />
                  <p>{userConv.data.name}</p>
                </div>
                <div className="delete_thisConversation">
                  <IconButton
                    onClick={deleteDialogConversation}
                    id={userConv._id}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            );
          }
        })
      ) : (
        <div className="emptyConversation">
          <p>
            To start a conversation,choose a friend and add to conversation
            field.
          </p>
        </div>
      )}
    </div>
  );
});

export default Conversations;
