import React, { useState } from "react";
import "./CreatePost.scss";
import friendLogo from "../../../../utils/friendLogo.jpg";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import IosShareIcon from "@mui/icons-material/IosShare";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { red, blue, green, orange } from "@mui/material/colors";
import { useParams } from "react-router";
import IconButton from "@mui/material/IconButton";

const CreatePost = React.memo((props) => {
  const params = useParams();

  const {
    postText,
    setPostText,
    createNewPost,
    currentUserData,
    profilePicture,
    addPhotoThunk,
    uploadImageSrc,
  } = props;

  const getPostValue = (e) => {
    setPostText(e.currentTarget.value);
  };

  const publicNewPost = () => {
    createNewPost(currentUserData._id, params.id, postText, image);
    setPostText("");
    setImage("");
  };

  const [image, setImage] = useState(null);

  const addPhoto = (e) => {
    setImage(e.target.files[0]);
    addPhotoThunk(e.target.files[0]);
  };

  return (
    <div className="createPost_wrapper" id={props.switchMode}>
      <div className="createPost">
        <div className="logo-wrapper">
          <div className="user_logo">
            <img
              src={!profilePicture ? friendLogo : profilePicture}
              alt="user-logo"
            />
          </div>
          <TextField
            value={postText}
            onChange={getPostValue}
            fullWidth
            label="Write your post..."
            multiline
          />
        </div>
        {uploadImageSrc ? (
          <img id="uploadIMG" src={uploadImageSrc} alt="upload-img" />
        ) : null}
      </div>
      <div className="sharePostBar">
        <div className="border_wrapper">
          <div className="shareItem_wrapper">
            <div className="shareItem">
              <form>
                <input
                  id="button-file"
                  type="file"
                  onChange={addPhoto}
                  accept="image/*"
                  hidden
                />
                <label htmlFor="button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    title="upload your photo"
                  >
                    <OndemandVideoIcon sx={{ color: red[500] }} />
                  </IconButton>
                </label>
                <p>Photo or Video</p>
              </form>
            </div>
            <div className="shareItem">
              <LocalOfferIcon sx={{ color: blue[900] }} />
              <p>Tag</p>
            </div>
            <div className="shareItem">
              <LocationOnIcon sx={{ color: green[700] }} />
              <p>Location</p>
            </div>
            <div className="shareItem">
              <TagFacesIcon sx={{ color: orange[900] }} />
              <p>Feelings</p>
            </div>
          </div>
          <div className="shareButton">
            <Button
              onClick={publicNewPost}
              variant="contained"
              endIcon={<IosShareIcon />}
              disabled={postText === "" && uploadImageSrc === ""}
            >
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreatePost;
