import React, { useEffect } from "react";
import "./UserNotification.scss";
import bellLogo from "../../../../utils/notificationBell.png";

const UserNotification = React.memo((props) => {
  const { userData } = props;
  useEffect(() => {
    const notification = document.querySelector(".notification");
    setTimeout(() => {
      notification.style.top = "0px";
    }, 1000);
    setTimeout(() => {
      notification.firstChild.style.transform = "scale(1.3)";
    }, 2400);
    setTimeout(() => {
      notification.firstChild.style.transform = "scale(1)";
    }, 3000);
  }, []);
  return (
    <div className="notification_wrapper">
      <div className="notification">
        <img src={bellLogo} alt="notification" />
        <p>{`Hello ${userData.name}`}</p>
      </div>
    </div>
  );
});

export default UserNotification;
