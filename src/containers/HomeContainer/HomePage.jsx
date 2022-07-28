import React, { useEffect } from "react";
import "./HomePage.scss";
import LeftPagePart from "../../components/HomePageComponents/PagePart/LeftPagePart";
import CenterPagePart from "../../components/HomePageComponents/PagePart/CenterPagePart";
import RightPagePart from "../../components/HomePageComponents/PagePart/RightPagePart";
import TopBar from "../../components/HomePageComponents/TopBar";
import SearchList from "../../components/HomePageComponents/SearchList";

const HomePage = React.memo((props) => {
  const { userData, getFriendProfileData, getProfileData } = props;

  useEffect(() => {
    getProfileData(userData._id);
    getFriendProfileData(userData._id);
  }, [getProfileData, getFriendProfileData, userData._id]);

  const removeWhoLiked = (e) => {
    if (
      e.target.className !== "whoLiked_wrapper" &&
      e.target.className !== "likes_line" &&
      e.target.className !== "whoLiked" &&
      e.target.tagName !== "path" &&
      e.target.tagName !== "svg"
    )
      props.getAndShowWhoLiked(null, null, "remove");
  };

  return (
    <div className="homePage_wrapper" onClick={removeWhoLiked}>
      <TopBar
        userData={userData}
        getAllProfilePosts={props.getAllProfilePosts}
        switchMode={props.switchMode}
        setSwitch={props.setSwitch}
        profilePicture={props.profilePicture}
        //search
        showChosenProfileSearch={props.showChosenProfileSearch}
      />
      <SearchList searchResults={props.searchResults} />
      <div className="page_wrapper" id={props.switchMode}>
        <div className="left_page">
          <LeftPagePart
            switchMode={props.switchMode}
            friendProfiles={props.friendProfiles}
          />
        </div>
        <div className="home_scroll_wrapper">
          <div className="center_page">
            <CenterPagePart
              userData={userData}
              postText={props.postText}
              setPostText={props.setPostText}
              posts={props.posts}
              createNewPost={props.createNewPost}
              getAllProfilePosts={props.getAllProfilePosts}
              postPopup={props.postPopup}
              pushIdToPopup={props.pushIdToPopup}
              popupIdArray={props.popupIdArray}
              deleteIdFromPopup={props.deleteIdFromPopup}
              deletePostThunk={props.deletePostThunk}
              updatePostThunk={props.updatePostThunk}
              pushIdPostTextFieldArray={props.pushIdPostTextFieldArray}
              textFieldActivatorArray={props.textFieldActivatorArray}
              deleteIdPostTextFieldArray={props.deleteIdPostTextFieldArray}
              switchMode={props.switchMode}
              profilePicture={props.profilePicture}
              //post photo
              addPhotoThunk={props.addPhotoThunk}
              uploadImageSrc={props.uploadImageSrc}
              setPostImageSrc={props.setPostImageSrc}
              //post's likespeople
              getAndShowWhoLiked={props.getAndShowWhoLiked}
              postLikesArray={props.postLikesArray}
              likedPeopleData={props.likedPeopleData}
            />
          </div>
          <div className="home_right_page">
            <RightPagePart userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HomePage;
