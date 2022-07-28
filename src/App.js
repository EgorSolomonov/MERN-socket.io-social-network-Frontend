import "./App.scss";
import React from "react";
import HomePage from "./containers/HomeContainer/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfileContainer from "./containers/ProfileContainer/ProfileContainer";
import MessageContainer from "./containers/MessageContainer/MessageContainer";
import Registration from "./containers/RegistrationContainer/Registration";
import Login from "./containers/LoginContainer/Login";
import { connect } from "react-redux";
import {
  setSwitch,
  toggleProfileInfoActivator,
  toggleProfileStatusActivator,
  toggleProfImageChanger,
} from "./actions/Profile/ProfileAction";
import {
  getFriendProfileData,
  getProfileData,
  getProtectedUserDataThunk,
  showChosenProfilePictureThunk,
  showChosenProfileSearchThunk,
  submitImageToServerAndDataBaseThunk,
  subscribeThunk,
} from "./reducers/AuthReducer/AuthReducer";
import {
  addPhotoThunk,
  createNewPostThunk,
  deletePostThunk,
  getAllProfilePostsThunk,
  getAndShowWhoLikedThunk,
  likeOrDislikeThunk,
  updatePostThunk,
} from "./reducers/PostsReducer/PostsReducer";
import {
  deleteIdFromPopup,
  pushIdToPopup,
  setPostText,
  pushIdPostTextFieldArray,
  deleteIdPostTextFieldArray,
  setPostImageSrc,
} from "./actions/Posts/PostsAction";
import {
  createConversationThunk,
  createMessageThunk,
  deleteConversationThunk,
  getChatMessengesThunk,
  getConversationsThunk,
  setOnlineFriendsThunk,
  setUnreadedMessageThunk,
  showProfileToStartConversationThunk,
  toggleConversationThunk,
} from "./reducers/MessageReducer/MessageReducer";
import {
  setMessageText,
  setSocketMessage,
  setSocketUsersAmount,
} from "./actions/Conversations/conversationAction";

function App(props) {
  const { user } = props;

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Login />
            ) : (
              <HomePage
                userData={user}
                getProfileData={props.getProfileData}
                postText={props.postText}
                posts={props.posts}
                createNewPost={props.createNewPost}
                getAllProfilePosts={props.getAllProfilePosts}
                postPopup={props.postPopup}
                pushIdToPopup={props.pushIdToPopup}
                popupIdArray={props.popupIdArray}
                deleteIdFromPopup={props.deleteIdFromPopup}
                deletePostThunk={props.deletePostThunk}
                setPostText={props.setPostText}
                updatePostThunk={props.updatePostThunk}
                pushIdPostTextFieldArray={props.pushIdPostTextFieldArray}
                textFieldActivatorArray={props.textFieldActivatorArray}
                deleteIdPostTextFieldArray={props.deleteIdPostTextFieldArray}
                switchMode={props.switchMode}
                setSwitch={props.setSwitch}
                profilePicture={props.profilePicture}
                //post photo
                addPhotoThunk={props.addPhotoThunk}
                uploadImageSrc={props.uploadImageSrc}
                setPostImageSrc={props.setPostImageSrc}
                //post's likespeople
                getAndShowWhoLiked={props.getAndShowWhoLiked}
                postLikesArray={props.postLikesArray}
                likedPeopleData={props.likedPeopleData}
                // friends data
                friendProfiles={props.friendProfiles}
                getFriendProfileData={props.getFriendProfileData}
                //search
                showChosenProfileSearch={props.showChosenProfileSearch}
                searchResults={props.searchResults}
                //socket
                socket={props.socket}
                setSocket={props.setSocket}
              />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/registration"
          element={
            !props.signIn ? <Registration /> : <Navigate replace to="/login" />
          }
        />
        <Route
          path="/message"
          element={
            !user ? (
              <Navigate replace to="/login" />
            ) : (
              <MessageContainer
                userData={user}
                getAllProfilePosts={props.getAllProfilePosts}
                switchMode={props.switchMode}
                setSwitch={props.setSwitch}
                profilePicture={props.profilePicture}
                //search
                showChosenProfileSearch={props.showChosenProfileSearch}
                searchResults={props.searchResults}
                //conversations
                getConversations={props.getConversations}
                conversations={props.conversations}
                toggleConversation={props.toggleConversation}
                conversationToggle={props.conversationToggle}
                deleteConversation={props.deleteConversation}
                //messages
                getChatMessenges={props.getChatMessenges}
                messages={props.messages}
                createMessage={props.createMessage}
                messageText={props.messageText}
                setMessageText={props.setMessageText}
                //messageSearch
                showProfileToStartConversation={
                  props.showProfileToStartConversation
                }
                conversationSearch={props.conversationSearch}
                createConversation={props.createConversation}
                isFetching={props.isFetching}
                //socket
                messageFromSocket={props.messageFromSocket}
                setSocketMessage={props.setSocketMessage}
                socketUsersAmount={props.socketUsersAmount}
                setSocketUsersAmount={props.setSocketUsersAmount}
                onlineFriends={props.onlineFriends}
                setOnlineFriends={props.setOnlineFriends}
                unreadedMessage={props.unreadedMessage}
                setUnreadedMessage={props.setUnreadedMessage}
              />
            )
          }
        />
        <Route
          path={`/profile/:id`}
          element={
            !user ? (
              <Navigate replace to="/login" />
            ) : (
              <ProfileContainer
                //user data
                userData={user}
                profileData={props.profileData}
                getProfileData={props.getProfileData}
                getIdAndSendInfo={props.getIdAndSendInfo}
                submitImageToServerAndDataBase={
                  props.submitImageToServerAndDataBase
                }
                //profile data
                profileStatus={props.profileStatus}
                profileCity={props.profileCity}
                profileBirthday={props.profileBirthday}
                profileRelationship={props.profileRelationship}
                profileImageName={props.profileImageName}
                profileImageSize={props.profileImageSize}
                profileImageSrc={props.profileImageSrc}
                profilePicture={props.profilePicture}
                //posts data
                postText={props.postText}
                posts={props.posts}
                textFieldActivatorArray={props.textFieldActivatorArray}
                //activators
                statusActivator={props.statusActivator}
                infoActivator={props.infoActivator}
                textFieldActivator={props.textFieldActivator}
                toggleProfileInfoActivator={props.toggleProfileInfoActivator}
                profileImageChangerActivator={
                  props.profileImageChangerActivator
                }
                // function activators
                toggleProfileStatus={props.toggleProfileStatus}
                toggleProfImageChanger={props.toggleProfImageChanger}
                setProfileInfo={props.setProfileInfo}
                // posts funct-s
                createNewPost={props.createNewPost}
                getAllProfilePosts={props.getAllProfilePosts}
                updatePostThunk={props.updatePostThunk}
                deletePostThunk={props.deletePostThunk}
                likeOrDislike={props.likeOrDislike}
                setPostText={props.setPostText}
                deleteIdPostTextFieldArray={props.deleteIdPostTextFieldArray}
                pushIdPostTextFieldArray={props.pushIdPostTextFieldArray}
                showChosenProfilePicture={props.showChosenProfilePicture}
                //post's likespeople
                getAndShowWhoLiked={props.getAndShowWhoLiked}
                postLikesArray={props.postLikesArray}
                likedPeopleData={props.likedPeopleData}
                //post's popup
                postPopup={props.postPopup}
                pushIdToPopup={props.pushIdToPopup}
                popupIdArray={props.popupIdArray}
                deleteIdFromPopup={props.deleteIdFromPopup}
                //post photo
                addPhotoThunk={props.addPhotoThunk}
                uploadImageSrc={props.uploadImageSrc}
                setPostImageSrc={props.setPostImageSrc}
                // night day mode
                switchMode={props.switchMode}
                setSwitch={props.setSwitch}
                // subscribe
                subscribeThunk={props.subscribeThunk}
                // friends data
                friendProfiles={props.friendProfiles}
                getFriendProfileData={props.getFriendProfileData}
                getFriendsData={props.getFriendsData}
                //search
                showChosenProfileSearch={props.showChosenProfileSearch}
                searchResults={props.searchResults}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

const mapStateToProps = (store) => {
  return {
    /* Auth Store Data */
    signIn: store.login.signIn,
    user: store.login.user,
    profileData: store.login.protectedUserData,
    statusActivator: store.login.statusActivator,
    infoActivator: store.login.infoActivator,
    profileStatus: store.login.profileStatus,
    profileCity: store.login.profileCity,
    profileBirthday: store.login.profileBirthday,
    profileRelationship: store.login.profileRelationship,
    profilePicture: store.login.profilePicture,
    switchMode: store.login.switchMode,
    profileImageName: store.login.profileImageName,
    profileImageSize: store.login.profileImageSize,
    profileImageSrc: store.login.profileImageSrc,
    profileImageChangerActivator: store.login.profileImageChangerActivator,
    /* Posts Store Data */
    postText: store.post.postText,
    posts: store.post.posts,
    postPopup: store.post.postPopup,
    popupIdArray: store.post.popupIdArray,
    textFieldActivatorArray: store.post.textFieldActivatorArray,
    postLikesArray: store.post.postLikesArray,
    likedPeopleData: store.post.likedPeopleData,
    uploadImageSrc: store.post.uploadImageSrc,
    /*  Friends Store Data */
    friendProfiles: store.login.friendProfiles,
    /* Search results */
    searchResults: store.login.searchResults,
    /* Conversation Data */
    conversations: store.message.conversations,
    messages: store.message.messages,
    conversationToggle: store.message.conversationToggle,
    messageText: store.message.messageText,
    conversationSearch: store.message.conversationSearch,
    isFetching: store.message.isFetching,
    /* Socket Data */
    messageFromSocket: store.message.messageFromSocket,
    socketUsersAmount: store.message.socketUsersAmount,
    onlineFriends: store.message.onlineFriends,
    unreadedMessage: store.message.unreadedMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleProfileStatus: (data) => {
      dispatch(toggleProfileStatusActivator(data));
    },
    toggleProfileInfoActivator: (data) => {
      dispatch(toggleProfileInfoActivator(data));
    },
    getIdAndSendInfo: (value, userId, type) => {
      dispatch(getProtectedUserDataThunk(value, userId, type));
    },
    getAllProfilePosts: (userId) => {
      dispatch(getAllProfilePostsThunk(userId));
    },
    createNewPost: (userId, toUserId, text, imgSrc) => {
      dispatch(createNewPostThunk(userId, toUserId, text, imgSrc));
    },
    setPostText: (text) => {
      dispatch(setPostText(text));
    },
    pushIdToPopup: (id) => {
      dispatch(pushIdToPopup(id));
    },
    deleteIdFromPopup: (id) => {
      dispatch(deleteIdFromPopup(id));
    },
    updatePostThunk: (postId, userId, postAuthorId, profileId, text) => {
      dispatch(updatePostThunk(postId, userId, postAuthorId, profileId, text));
    },
    deletePostThunk: (postId, userId, postAuthorId, profileId) => {
      dispatch(deletePostThunk(postId, userId, postAuthorId, profileId));
    },
    getProfileData: (userId) => {
      dispatch(getProfileData(userId));
    },
    likeOrDislike: (postId, userId, profileId) => {
      dispatch(likeOrDislikeThunk(postId, userId, profileId));
    },
    pushIdPostTextFieldArray: (id) => {
      dispatch(pushIdPostTextFieldArray(id));
    },
    deleteIdPostTextFieldArray: (id) => {
      dispatch(deleteIdPostTextFieldArray(id));
    },
    setSwitch: (data) => {
      dispatch(setSwitch(data));
    },
    showChosenProfilePicture: (imageName) => {
      dispatch(showChosenProfilePictureThunk(imageName));
    },
    submitImageToServerAndDataBase: (userId, file, type) => {
      dispatch(submitImageToServerAndDataBaseThunk(userId, file, type));
    },
    toggleProfImageChanger: (data) => {
      dispatch(toggleProfImageChanger(data));
    },
    subscribeThunk: (userId, toUserId, type) => {
      dispatch(subscribeThunk(userId, toUserId, type));
    },
    getFriendProfileData: (profileId) => {
      dispatch(getFriendProfileData(profileId));
    },
    getAndShowWhoLiked: (userIds, postId, type) => {
      dispatch(getAndShowWhoLikedThunk(userIds, postId, type));
    },
    showChosenProfileSearch: (letter, type) => {
      dispatch(showChosenProfileSearchThunk(letter, type));
    },
    //message data
    getConversations: (userId) => {
      dispatch(getConversationsThunk(userId));
    },
    getChatMessenges: (conversationId) => {
      dispatch(getChatMessengesThunk(conversationId));
    },
    toggleConversation: (data) => {
      dispatch(toggleConversationThunk(data));
    },
    createMessage: (conversationId, author, text, type) => {
      dispatch(createMessageThunk(conversationId, author, text, type));
    },
    setMessageText: (text) => {
      dispatch(setMessageText(text));
    },
    showProfileToStartConversation: (letter, type, currentUserId) => {
      dispatch(
        showProfileToStartConversationThunk(letter, type, currentUserId)
      );
    },
    createConversation: (senderId, receiverId) => {
      dispatch(createConversationThunk(senderId, receiverId));
    },
    deleteConversation: (conversationId, currentUserId) => {
      dispatch(deleteConversationThunk(conversationId, currentUserId));
    },
    //post photo
    addPhotoThunk: (fileData) => {
      dispatch(addPhotoThunk(fileData));
    },
    setPostImageSrc: (data) => {
      dispatch(setPostImageSrc(data));
    },
    //socket data
    setSocketMessage: (data) => {
      dispatch(setSocketMessage(data));
    },
    setSocketUsersAmount: (amount) => {
      dispatch(setSocketUsersAmount(amount));
    },
    setOnlineFriends: (friends) => {
      dispatch(setOnlineFriendsThunk(friends));
    },
    setUnreadedMessage: (data, conversationId, type) => {
      dispatch(setUnreadedMessageThunk(data, conversationId, type));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
