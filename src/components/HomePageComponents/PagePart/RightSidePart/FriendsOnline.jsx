import React from "react";
import "./FriendsOnline.scss";
import friendLogo from "../../../../utils/friendLogo.jpg";

const FriendsOnline = React.memo((props) => {
  return (
    <div className="friendsOnline_wrapper">
      <div className="friendsOnline">
        <h2>Friends online</h2>
        {/* friendItem */}
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
        <div className="friend_logo">
          <div className="onlineCircle">
            <img src={friendLogo} alt="friend-logo" />
            <div className="greenCircle"></div>
          </div>
          <p>Friend's name</p>
        </div>
      </div>
    </div>
  );
});

export default FriendsOnline;
