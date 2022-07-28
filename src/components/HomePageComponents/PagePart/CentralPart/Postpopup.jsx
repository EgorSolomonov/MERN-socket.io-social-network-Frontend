import React from "react";
import "./Postpopup.scss";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import BuildSharpIcon from "@mui/icons-material/BuildSharp";
import { useParams } from "react-router";

const Postpopup = React.memo((props) => {
  const {
    popupId,
    popupIdArray,
    userData,
    deletePostThunk,
    postAuthorId,
    deleteIdFromPopup,
    pushIdPostTextFieldArray,
  } = props;
  const params = useParams();

  const deletePost = (e) => {
    deletePostThunk(e.currentTarget.id, userData._id, postAuthorId, params.id);
  };

  const updatePost = (e) => {
    pushIdPostTextFieldArray(e.currentTarget.id);
    deleteIdFromPopup(e.currentTarget.id);
  };

  return (
    <div
      id={popupId}
      className={
        popupIdArray.includes(popupId) ? "post_popup active" : "post_popup"
      }
    >
      <div className="triangle"></div>
      <div className="popup_data">
        {userData._id === postAuthorId ? (
          <div className="update">
            <BuildSharpIcon
              onClick={updatePost}
              fontSize="small"
              id={popupId}
            />
            <p onClick={updatePost} id={popupId}>
              update
            </p>
          </div>
        ) : null}
        <div className="delete">
          <DeleteSharpIcon id={popupId} onClick={deletePost} fontSize="small" />
          <p id={popupId} onClick={deletePost}>
            delete
          </p>
        </div>
      </div>
    </div>
  );
});

export default Postpopup;
