import React, { useEffect, useRef, useState } from "react";
import "./Post.scss";
import friendLogo from "../../../../utils/friendLogo.jpg";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import heartSvg from "../../../../utils/heart-svgrepo-com (1).svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { green } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Post = React.memo((props) => {
  const {
    postTextDB,
    likesAmount,
    whoLiked,
    postImg,
    passTime,
    name,
    popupId,
    postAuthorId,
    likeOrDislike,
    currentUserId,
    profPicture,
    textFieldActivatorArray,
    updatePostThunk,
    deleteIdPostTextFieldArray,
    getAndShowWhoLiked,
  } = props;

  const params = useParams();
  // eslint-disable-next-line
  const [text, setPostText] = useState(postTextDB);

  const passTimeF = () => {
    let date = new Date(Date.parse(passTime));

    let dayOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let diffMs = new Date() - date;
    let diffSec = Math.round(diffMs / 1000);
    let diffMin = diffSec / 60;
    let diffHour = diffMin / 60;

    // форматирование
    year = year.toString().slice(-2);
    month = month < 10 ? "0" + month : month;
    dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (diffSec < 1) {
      return "прямо сейчас";
    } else if (diffMin < 1) {
      return `${diffSec} сек. назад`;
    } else if (diffHour < 1) {
      return `${Math.round(diffMin)} мин. назад`;
    } else {
      return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
    }
  };

  const thumbUpThumbDown = (e) => {
    likeOrDislike(e.currentTarget.id, currentUserId, params.id);
  };

  const onPostTextChange = (e) => {
    setPostText(e.currentTarget.value);
  };

  const updatePost = (e) => {
    updatePostThunk(
      e.currentTarget.id,
      currentUserId,
      postAuthorId,
      params.id,
      e.currentTarget.value
    );
    deleteIdPostTextFieldArray(e.currentTarget.id);
  };

  const timerRef = useRef(null);
  const removeTimeout = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line
  }, [timerRef.current]);

  useEffect(() => {
    return () => {
      clearTimeout(removeTimeout.current);
    };
    // eslint-disable-next-line
  }, []);

  const showWhoLiked = (e) => {
    getAndShowWhoLiked(whoLiked, e.target.id, "show");
  };

  const removeWhoLiked = (e) => {
    removeTimeout.current = setTimeout(() => {
      timerRef.current = setTimeout(() => {
        getAndShowWhoLiked(null, null, "remove");
      }, 1500);
    }, 500);
  };

  return (
    <div className="post_wrapper">
      <div className="post">
        <div className="top">
          <div className="userData">
            <div className="user_logo">
              <Link to={`/profile/${postAuthorId}`}>
                <img
                  src={!profPicture ? friendLogo : profPicture}
                  alt="user-logo"
                />
              </Link>
              <Link to={`/profile/${postAuthorId}`}>
                <p>{name}</p>
              </Link>
              <small>{passTimeF()}</small>
            </div>
            <div className="postList">
              <MoreHorizIcon id={popupId} />
            </div>
          </div>
        </div>
        {currentUserId === postAuthorId ? (
          <>
            <div
              className={
                textFieldActivatorArray.includes(popupId)
                  ? "center"
                  : "disactive"
              }
            >
              <TextField
                id={popupId}
                value={postTextDB}
                onBlur={updatePost}
                onChange={onPostTextChange}
                fullWidth
                multiline
                autoFocus
              />
            </div>
            <div
              className={
                !textFieldActivatorArray.includes(popupId)
                  ? "center"
                  : "disactive"
              }
            >
              {postTextDB === "" ? "" : <h2>{postTextDB}</h2>}
              {postImg === undefined || postImg === null || postImg === "" ? (
                ""
              ) : (
                <img src={!postImg ? friendLogo : postImg} alt="post" />
              )}
            </div>
          </>
        ) : (
          <div className={"center"}>
            {postTextDB === "" ? "" : <h2>{postTextDB}</h2>}
            {postImg === undefined || postImg === null || postImg === "" ? (
              ""
            ) : (
              <img src={!postImg ? friendLogo : postImg} alt="post" />
            )}
          </div>
        )}
        <div className="bottom">
          <div className="likes">
            <div className="like" title="like this post">
              <ThumbUpOutlinedIcon
                sx={{ color: green[600] }}
                onClick={thumbUpThumbDown}
                id={popupId}
                onBlur={updatePost}
              />
            </div>
            <small>{likesAmount === 0 ? null : likesAmount}</small>
            <div
              className="heart"
              id={popupId}
              onMouseEnter={showWhoLiked}
              onMouseLeave={removeWhoLiked}
            >
              <img
                className="heartImg"
                id={popupId}
                src={heartSvg}
                alt="heart"
              />
            </div>
          </div>
          <div className="comments">
            <p>comments</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Post;
