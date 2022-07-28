import React, { useEffect, useRef } from "react";
import "./MessageContainer.scss";
import SearchList from "../../components/HomePageComponents/SearchList";
import TopBar from "../../components/HomePageComponents/TopBar";
import Conversations from "../../components/MessageComponents/LeftPagePart/Conversations";
import OnlineFriends from "../../components/MessageComponents/RightPagePart/OnlineFriends";
import Chat from "../../components/MessageComponents/CenterPagePart/Chat";
import ChatInput from "../../components/MessageComponents/CenterPagePart/ChatInput";
import TextField from "@mui/material/TextField";
import ConversationSearchList from "../../components/MessageComponents/LeftPagePart/ConversationSearchList";
import io from "socket.io-client";

const MessageContainer = React.memo((props) => {
  const {
    getConversations,
    messages,
    showProfileToStartConversation,
    conversations,
    conversationSearch,
    showChosenProfileSearch,
    userData,
    messageFromSocket,
    setSocketMessage,
    createMessage,
    conversationToggle,
    setSocketUsersAmount,
    socketUsersAmount,
    setOnlineFriends,
    unreadedMessage,
    onlineFriends,
    setUnreadedMessage,
  } = props;

  // working with sockets
  const socket = useRef();

  useEffect(() => {
    // socket create
    socket.current = io("ws://localhost:8080");

    // socket getMessageFunction
    socket.current?.on("getMessage", (data) => {
      setSocketMessage({
        senderId: data.senderId,
        messageText: data.messageText,
        createdAt: Date.now(),
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    conversations.forEach((conversation) => {
      if (
        conversation.members.includes(messageFromSocket?.senderId) &&
        conversationToggle[0] === conversation._id
      ) {
        createMessage(
          conversationToggle[0],
          messageFromSocket?.senderId,
          messageFromSocket?.messageText
        );
        setSocketMessage(null);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageFromSocket, conversationToggle]);

  useEffect(() => {
    if (socket !== null) {
      socket.current.emit("addUser", userData._id);
      socket.current.on("getUsers", (users) => {
        setSocketUsersAmount(users);
      });
      socket.current.on("getNotification", (notification) => {
        setUnreadedMessage(notification, conversationToggle[0], "fill");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // scrolling to the last chatElement
  useEffect(() => {
    const chatNode = document.querySelector(".chat_wrapper");

    chatNode?.lastElementChild?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [messages]);

  // getting autoFocus of a searchList
  useEffect(() => {
    setTimeout(() => {
      const input = document.getElementById("saveFocus");
      input.focus();
    });
  }, [props.isFetching]);

  const removeWindows = (e) => {
    const searchClasses = document.getElementById("searchList");
    const searchClassesConversations = document.getElementById(
      "searchList_messages"
    );

    if (searchClasses !== null) {
      if (
        e.target.className !== "searchList" &&
        e.target.className !== "bottomLine" &&
        e.target.className !== "user_logo_search" &&
        e.target.className !== "topBar_center" &&
        e.target.className !== "search_icon" &&
        e.target.className !== "search_input" &&
        e.target.tagName !== "path" &&
        e.target.tagName !== "svg"
      )
        showChosenProfileSearch(null, "disactivate");
    }
    if (searchClassesConversations !== null) {
      if (
        e.target.className !== "searchList_messages" &&
        e.target.className !== "bottomLine_messages" &&
        e.target.className !== "user_logo_search_messages" &&
        e.target.className !== "topBar_center" &&
        e.target.className !== "search_icon" &&
        e.target.className !== "search_input" &&
        e.target.tagName !== "path" &&
        e.target.tagName !== "svg" &&
        e.target.className !== "addButton"
      )
        showProfileToStartConversation(null, "disactivate");
    }
  };

  const searchConversations = (e) => {
    showProfileToStartConversation(
      e.currentTarget.value,
      "activate",
      userData._id
    );
  };

  return (
    <div
      className="messagePage_wrapper"
      onClick={removeWindows}
      id={props.switchMode}
    >
      <TopBar
        userData={props.userData}
        getAllProfilePosts={props.getAllProfilePosts}
        switchMode={props.switchMode}
        setSwitch={props.setSwitch}
        profilePicture={props.profilePicture}
        //search
        showChosenProfileSearch={props.showChosenProfileSearch}
        // sockets
        unreadedMessage={unreadedMessage}
        conversationToggle={props.conversationToggle}
      />
      <SearchList searchResults={props.searchResults} />
      <div className="page_wrapper">
        <div className="left_page">
          <div className="search">
            <TextField
              label="Search friend to start a conversation"
              variant="standard"
              type="text"
              className="search_input_messages"
              onChange={searchConversations}
              disabled={props.isFetching}
              id="saveFocus"
            />
            <ConversationSearchList
              conversations={conversations}
              userData={props.userData}
              conversationSearch={conversationSearch}
              createConversation={props.createConversation}
              getConversations={getConversations}
            />
          </div>
          <Conversations
            //search
            conversations={conversations}
            toggleConversation={props.toggleConversation}
            conversationToggle={props.conversationToggle}
            //messages
            getChatMessenges={props.getChatMessenges}
            messages={messages}
            deleteConversation={props.deleteConversation}
            getConversations={getConversations}
            userData={props.userData}
            unreadedMessage={unreadedMessage}
            //sockets
            setUnreadedMessage={setUnreadedMessage}
          />
        </div>
        <div className="center_page">
          <div className="center">
            <div className="chat_wrapper">
              {messages.length !== 0 ? (
                messages.map((userMess) => {
                  return (
                    <Chat
                      messages={props.messages}
                      userData={userData}
                      userMess={userMess}
                      key={userMess._id}
                      socket={socket}
                    />
                  );
                })
              ) : (
                <div className="emptyChat">
                  <p>
                    To start a chat, choose a conversation and type your
                    message.
                  </p>
                </div>
              )}
            </div>
            <ChatInput
              conversations={conversations}
              socket={socket}
              socketUsersAmount={socketUsersAmount}
              createMessage={props.createMessage}
              userData={props.userData}
              messageText={props.messageText}
              setMessageText={props.setMessageText}
              conversationToggle={props.conversationToggle}
            />
          </div>
        </div>
        <div className="right_page">
          <OnlineFriends
            setOnlineFriends={setOnlineFriends}
            socketUsersAmount={socketUsersAmount}
            onlineFriends={onlineFriends}
            userData={userData}
          />
        </div>
      </div>
    </div>
  );
});

export default MessageContainer;
