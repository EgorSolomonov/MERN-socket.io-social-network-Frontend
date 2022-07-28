import React from "react";
import FriendsSideBar from "./LeftSidePart/FriendsSideBar";
import NavigationMenuBar from "./LeftSidePart/NavigationMenuBar";

const LeftPagePart = React.memo((props) => {
  return (
    <div className="leftPagePart_wrapper">
      <div className="navigationMenu">
        <NavigationMenuBar switchMode={props.switchMode} />
      </div>
      <div className="friendsSideBar">
        <FriendsSideBar
          switchMode={props.switchMode}
          friendProfiles={props.friendProfiles}
        />
      </div>
    </div>
  );
});

export default LeftPagePart;
