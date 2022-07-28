import React from "react";
import { Link } from "react-router-dom";
import "./ConversationSearchList.scss";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import friendLogo from "../../../utils/friendLogo.jpg";

const ConversationSearchList = React.memo((props) => {
  const {
    conversations,
    conversationSearch,
    userData,
    createConversation,
    getConversations,
  } = props;

  const addConversation = (e) => {
    createConversation(userData._id, e.currentTarget.id);
    setTimeout(() => {
      getConversations(userData._id);
    }, 200);
  };

  return conversationSearch.length !== 0 ? (
    <div
      id="searchList_messages"
      className={
        conversationSearch.length !== 0 ? "searchList_messages" : "disactive"
      }
    >
      {conversationSearch.map((user) =>
        user ? (
          <div className="bottomLine_messages" key={user._id}>
            <div className="user_logo_search_messages">
              <Link to={`/profile/${user._id}`}>
                <img
                  src={user.userPicture ? user.userPicture : friendLogo}
                  alt="user-logo"
                />
              </Link>
              <p>{user.name}</p>
            </div>
            <div className="addButton">
              <IconButton
                aria-label="delete"
                id={user._id}
                onClick={addConversation}
                disabled={conversations.some(
                  (elem) => elem.data._id === user._id
                )}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
            <div className="added">
              <IconButton
                disabled={conversations.every(
                  (elem) => elem.data._id !== user._id
                )}
              >
                <CheckIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <div className="bottomLine">
            <CircularProgress />
          </div>
        )
      )}
    </div>
  ) : (
    <div className="disactive"></div>
  );
});

export default ConversationSearchList;
