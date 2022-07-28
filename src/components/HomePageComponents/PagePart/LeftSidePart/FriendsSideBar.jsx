import React from "react";
import "./FriendsSideBar.scss";
import friendLogo from "../../../../utils/friendLogo.jpg";
import { Link } from "react-router-dom";

const FriendsSideBar = React.memo((props) => {
  const { friendProfiles } = props;

  return (
    <div className="friendsSideBar_wrapper" id={props.switchMode}>
      {friendProfiles?.map((profile) => {
        return (
          <Link key={profile._id} to={`/profile/${profile._id}`}>
            <div className="friend_logo">
              <img
                src={!profile.userPicture ? friendLogo : profile.userPicture}
                alt="user-logo"
              />
              <p>{profile.name}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
});

export default FriendsSideBar;
