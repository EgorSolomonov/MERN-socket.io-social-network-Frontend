import React from "react";
import "./CenterPagePart.scss";
import CreatePost from "./CentralPart/CreatePost";
import LikesScroller from "./CentralPart/LikesScroller";
import Post from "./CentralPart/Post";
import Postpopup from "./CentralPart/Postpopup";

const CenterPagePart = React.memo((props) => {
  const {
    posts,
    pushIdToPopup,
    deleteIdFromPopup,
    popupIdArray,
    deletePostThunk,
    profilePicture,
  } = props;

  const showTarget = (event) => {
    let target = event.target;
    if (target.dataset.testid !== "MoreHorizIcon") {
      return;
    } else if (
      target.dataset.testid === "MoreHorizIcon" &&
      !popupIdArray.includes(target.id)
    ) {
      pushIdToPopup(target.id);
    } else if (
      target.dataset.testid === "MoreHorizIcon" &&
      popupIdArray.includes(target.id)
    ) {
      deleteIdFromPopup(target.id);
    }
  };

  return (
    <div className="centerPagePart_wrapper">
      <div className="creatingPostBar">
        <CreatePost
          postText={props.postText}
          setPostText={props.setPostText}
          createNewPost={props.createNewPost}
          currentUserData={props.userData}
          getAllProfilePosts={props.getAllProfilePosts}
          switchMode={props.switchMode}
          profilePicture={profilePicture}
          //post photo
          addPhotoThunk={props.addPhotoThunk}
          uploadImageSrc={props.uploadImageSrc}
          setPostImageSrc={props.setPostImageSrc}
        />
      </div>
      <div className="posts" onClick={showTarget}>
        {posts.length === 0 ? (
          <h2>Пока нет постов...</h2>
        ) : (
          posts.map((p, index) => {
            return (
              <div className="posts_wrapper" key={index} id={props.switchMode}>
                <Post
                  currentUserId={props.userData._id}
                  postTextDB={p.description}
                  postImg={p.img}
                  likesAmount={p.likes.length}
                  whoLiked={p.likes}
                  passTime={p.createdAt}
                  name={p.name}
                  profPicture={p.userPicture}
                  popupId={p._id}
                  postAuthorId={p.userId}
                  likeOrDislike={props.likeOrDislike}
                  textFieldActivatorArray={props.textFieldActivatorArray}
                  updatePostThunk={props.updatePostThunk}
                  deleteIdPostTextFieldArray={props.deleteIdPostTextFieldArray}
                  getAndShowWhoLiked={props.getAndShowWhoLiked}
                  postLikesArray={props.postLikesArray}
                  likedPeopleData={props.likedPeopleData}
                />
                <Postpopup
                  popupId={p._id}
                  popupIdArray={popupIdArray}
                  userData={props.userData}
                  deletePostThunk={deletePostThunk}
                  postAuthorId={p.userId}
                  updatePostThunk={props.updatePostThunk}
                  pushIdPostTextFieldArray={props.pushIdPostTextFieldArray}
                  deleteIdFromPopup={props.deleteIdFromPopup}
                />
                <LikesScroller
                  whoLiked={p.likes}
                  getAndShowWhoLiked={props.getAndShowWhoLiked}
                  popupId={p._id}
                  postLikesArray={props.postLikesArray}
                  likedPeopleData={props.likedPeopleData}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default CenterPagePart;
