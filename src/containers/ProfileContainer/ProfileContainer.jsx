import React, { useEffect, useState } from "react";
import "./ProfileContainer.scss";
import LeftPagePart from "../../components/HomePageComponents/PagePart/LeftPagePart";
import CenterPagePart from "../../components/HomePageComponents/PagePart/CenterPagePart";
import TopBar from "../../components/HomePageComponents/TopBar";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import RightProfilePagePart from "../../components/ProfileComponents/RightProfilePagePart";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import UploadMenu from "../../components/UploadMenu/UploadMenu";
import SearchList from "../../components/HomePageComponents/SearchList";

const ProfileContainer = React.memo((props) => {
  const { getProfileData, profileImageChangerActivator, getFriendProfileData } =
    props;
  const params = useParams();

  // отключение линта асинхронности хука
  useEffect(() => {
    getProfileData(params.id);
    getFriendProfileData(params.id);
  }, [params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const [profile, setProfileData] = useState(props.profileData);
  useEffect(() => {
    setProfileData(props.profileData);
  }, [props.profileData]);

  const removeWindows = (e) => {
    const postsClasses = document.getElementById("likesLine");
    const searchClasses = document.getElementById("searchList");

    if (postsClasses !== null) {
      if (
        e.target.className !== "whoLiked_wrapper" &&
        e.target.className !== "likes_line" &&
        e.target.className !== "whoLiked" &&
        e.target.tagName !== "path" &&
        e.target.tagName !== "svg"
      ) {
        props.getAndShowWhoLiked(null, null, "remove");
      }
    }
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
        props.showChosenProfileSearch(null, "disactivate");
    }
  };

  return (
    <div className="profileContainer_wrapper" onClick={removeWindows}>
      <TopBar
        userData={props.userData}
        toggleActivator={props.toggleActivator}
        getAllProfilePosts={props.getAllProfilePosts}
        switchMode={props.switchMode}
        setSwitch={props.setSwitch}
        profilePicture={props.profilePicture}
        //search
        showChosenProfileSearch={props.showChosenProfileSearch}
      />
      <SearchList searchResults={props.searchResults} />
      <div
        className={
          profileImageChangerActivator
            ? "page_wrapper image_changer"
            : "page_wrapper"
        }
        id={props.switchMode}
      >
        <div className="uploadMenu_wrapper">
          <UploadMenu
            userData={props.userData}
            profile={!profile ? <CircularProgress /> : profile}
            switchMode={props.switchMode}
            profileImageName={props.profileImageName}
            profileImageSize={props.profileImageSize}
            profileImageSrc={props.profileImageSrc}
            showChosenProfilePicture={props.showChosenProfilePicture}
            submitImageToServerAndDataBase={
              props.submitImageToServerAndDataBase
            }
            profileImageChangerActivator={profileImageChangerActivator}
            toggleProfImageChanger={props.toggleProfImageChanger}
            getIdAndSendInfo={props.getIdAndSendInfo}
          />
        </div>
        <div className="left_page">
          <LeftPagePart switchMode={props.switchMode} />
        </div>
        <div className="scroll_wrapper">
          <div className="profileInfo">
            <ProfileInfo
              userData={props.userData}
              profile={profile === null ? <CircularProgress /> : profile}
              statusActivator={props.statusActivator}
              toggleProfileStatus={props.toggleProfileStatus}
              getIdAndSendInfo={props.getIdAndSendInfo}
              switchMode={props.switchMode}
              profileImageChangerActivator={profileImageChangerActivator}
              toggleProfImageChanger={props.toggleProfImageChanger}
              subscribeThunk={props.subscribeThunk}
            />
          </div>
          <div className="post_info_wrapper">
            <div className="center_page">
              <CenterPagePart
                userData={props.userData}
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
                likeOrDislike={props.likeOrDislike}
                updatePostThunk={props.updatePostThunk}
                textFieldActivatorArray={props.textFieldActivatorArray}
                pushIdPostTextFieldArray={props.pushIdPostTextFieldArray}
                deleteIdPostTextFieldArray={props.deleteIdPostTextFieldArray}
                switchMode={props.switchMode}
                profilePicture={props.profilePicture}
                //post's likespeople
                getAndShowWhoLiked={props.getAndShowWhoLiked}
                postLikesArray={props.postLikesArray}
                likedPeopleData={props.likedPeopleData}
                //post photo
                addPhotoThunk={props.addPhotoThunk}
                uploadImageSrc={props.uploadImageSrc}
                setPostImageSrc={props.setPostImageSrc}
              />
            </div>
            <div className="right_page">
              <RightProfilePagePart
                userData={props.userData}
                profile={profile === null ? <CircularProgress /> : profile}
                infoActivator={props.infoActivator}
                toggleProfileInfoActivator={props.toggleProfileInfoActivator}
                getIdAndSendInfo={props.getIdAndSendInfo}
                profilePicture={props.profilePicture}
                friendProfiles={props.friendProfiles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileContainer;
