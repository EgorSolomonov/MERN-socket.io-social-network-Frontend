import React from "react";
import Advertising from "./RightSidePart/Advertising";
// import FriendsOnline from "./RightSidePart/FriendsOnline";
import UserNotification from "./RightSidePart/UserNotification";

const RightPagePart = React.memo((props) => {
  const { userData } = props;
  return (
    <div className="rightPagePart_wrapper">
      <div className="rightPagePart">
        <div className="friendsNotification">
          <UserNotification userData={userData} />
        </div>
        <div className="advertising">
          <Advertising />
        </div>
        {/* <div className="onlineFriends">
          <FriendsOnline />
        </div> */}
      </div>
    </div>
  );
});

export default RightPagePart;
