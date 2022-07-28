import React, { useEffect, useState } from "react";
import "./ProfileInfo.scss";
import friendLogo from "../../utils/friendLogo.jpg";
import backProfImgExample from "../../utils/backImageExample.jpg";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";
import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded";
import { useParams } from "react-router";

const ProfileInfo = React.memo((props) => {
  const {
    userData,
    statusActivator,
    toggleProfileStatus,
    getIdAndSendInfo,
    profile,
    profileImageChangerActivator,
    toggleProfImageChanger,
    subscribeThunk,
  } = props;

  const params = useParams();

  let [status, setProfStatus] = useState(profile.profileStatus);

  useEffect(() => {
    setProfStatus(profile.profileStatus);
  }, [profile.profileStatus]);

  const changeStatus = () => {
    toggleProfileStatus(!statusActivator);
  };

  const getStatusValue = (e) => {
    setProfStatus(e.currentTarget.value);
  };

  const sendStatusOnBlur = (e) => {
    getIdAndSendInfo(e.currentTarget.value, userData._id, "status");
    toggleProfileStatus(!statusActivator);
  };

  const changeUserPicture = () => {
    if (params.id === userData._id)
      toggleProfImageChanger(!profileImageChangerActivator);
  };

  const subscribe = () => {
    subscribeThunk(userData._id, params.id, "subscribe");
  };

  const unsubscribe = () => {
    subscribeThunk(userData._id, params.id, "unsubscribe");
  };

  return (
    <div className="profileInfo_wrapper">
      <div className="backProfileImage">
        <img
          src={
            !profile.coverPicture ? backProfImgExample : profile.coverPicture
          }
          alt="back-prfileImage"
        />
        <div className="profileInfo">
          <div className="user_logo">
            {!params.id || params.id === userData._id ? null : (
              <div className="subscribe_button">
                {profile?.followings?.includes(userData._id) ? (
                  <div className="subscribed">
                    <IconButton onClick={unsubscribe} aria-label="delete">
                      <SentimentVerySatisfiedRoundedIcon fontSize="large" />
                    </IconButton>
                  </div>
                ) : (
                  <div className="unsubscribed">
                    <IconButton onClick={subscribe} aria-label="delete">
                      <AddReactionRoundedIcon fontSize="large" />
                    </IconButton>
                    <p>Subscribe</p>
                  </div>
                )}
              </div>
            )}
            <img
              title={
                profile._id === userData._id
                  ? "DoubleClick to change"
                  : "You are able to change only your profile picture"
              }
              onDoubleClick={changeUserPicture}
              src={!profile.userPicture ? friendLogo : profile.userPicture}
              alt="user-logo"
            />
          </div>
          <div className="profileName">
            <h1>{!profile.name ? <CircularProgress /> : profile.name}</h1>
            {statusActivator ? (
              <TextField
                onBlur={sendStatusOnBlur}
                onChange={getStatusValue}
                size="small"
                variant="standard"
                value={status}
                autoFocus={true}
              />
            ) : (
              <p
                title="Double click to change"
                onDoubleClick={
                  userData._id === profile._id ? changeStatus : null
                }
              >
                {!status ? "Status is empty..." : status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileInfo;
