import React, { useEffect } from "react";
import "./OnlineFriends.scss";
import friendLogo from "../../../utils/friendLogo.jpg";
import { Link } from "react-router-dom";

const OnlineFriends = React.memo((props) => {
  const { onlineFriends, userData, socketUsersAmount, setOnlineFriends } =
    props;

  useEffect(() => {
    setOnlineFriends(socketUsersAmount);
    // eslint-disable-next-line
  }, [socketUsersAmount]);

  return (
    <div className="onlineFriends_wrapper">
      <div className="onlineFriends_items">
        {
          // eslint-disable-next-line
          onlineFriends.map((user) => {
            if (user._id !== userData._id)
              return (
                <div className="user_logo" key={user._id}>
                  <div className="onlineCircle">
                    <Link to={`/profile/${user._id}`}>
                      <img
                        src={user.userPicture ? user.userPicture : friendLogo}
                        alt="user-logo"
                      />
                    </Link>
                    <div className="greenCircle"></div>
                  </div>
                  <p>{user.name}</p>
                </div>
              );
          })
        }
      </div>
    </div>
  );
});

export default OnlineFriends;
