import React, { useState } from "react";
import "./UploadMenu.scss";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const UploadMenu = React.memo((props) => {
  const {
    profile,
    profileImageName,
    profileImageSize,
    profileImageSrc,
    showChosenProfilePicture,
    submitImageToServerAndDataBase,
    userData,
    profileImageChangerActivator,
    toggleProfImageChanger,
  } = props;

  const [image, setImage] = useState(null);

  const getTheFile = (e) => {
    setImage(e.target.files[0]);
    showChosenProfilePicture(e.target.files[0]);
  };

  const removeChosenImage = () => {
    showChosenProfilePicture("");
    let form = document.getElementsByTagName("form");
    form[0].reset();
    setImage(null);
  };

  const uploadProfileImage = () => {
    submitImageToServerAndDataBase(userData._id, image, "userPicture");
  };

  const closeMenu = () => {
    toggleProfImageChanger(!profileImageChangerActivator);
  };

  if (profileImageChangerActivator) {
    return (
      <div className="upload_menu">
        <div className="menu" id={props.switchMode}>
          <div className="closeButton">
            <CloseIcon onClick={closeMenu} />
          </div>
          <div className="user_logo">
            <img
              id="profImg"
              src={
                profileImageSrc === "" ? profile.userPicture : profileImageSrc
              }
              alt="user-logo"
            />
            {profileImageSrc !== "" ? (
              <CloseIcon className="removeIcon" onClick={removeChosenImage} />
            ) : null}
          </div>
          <form>
            <input
              id="raised-button-file"
              type="file"
              onChange={getTheFile}
              accept="image/*"
              hidden
            />
            <p>
              {profileImageName === ""
                ? "Choose your new photo ⬇"
                : profileImageName}
            </p>
            <p>{profileImageSize === "" ? null : profileImageSize + " kb"}</p>
            <label htmlFor="raised-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                title="choose your photo"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            {/*  <div className="circle">
            <CircularProgress  variant="determinate" value={25}   />
          </div>  */}

            <Button
              onClick={uploadProfileImage}
              disabled={profileImageName === "" ? true : false}
              variant="contained"
            >
              Upload
            </Button>
          </form>
        </div>
      </div>
    );
  } else return;
});

export default UploadMenu;
