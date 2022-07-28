import React from "react";
import "./Chat.scss";
import friendLogo from "../../../utils/friendLogo.jpg";
import { Link } from "react-router-dom";

const Chat = React.memo((props) => {
  const { userData, userMess } = props;

  const passTimeF = () => {
    let date = new Date(Date.parse(userMess.createdAt));

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

  return (
    <div
      className={
        userMess.author !== userData._id
          ? "message_wrapper"
          : "message_wrapper friend"
      }
    >
      <div className="user_logo">
        <Link to={`/profile/${userMess.author}`}>
          <img
            src={
              !userMess.data.userPicture
                ? friendLogo
                : userMess.data.userPicture
            }
            alt="user-logo"
          />
        </Link>
      </div>
      <div className="message">
        <p>{userMess.text}</p>
        <div className="time">
          <span>{passTimeF()}</span>
        </div>
      </div>
    </div>
  );
});

export default Chat;
