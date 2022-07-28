import React from "react";
import "./TopBar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import friendLogo from "../../utils/friendLogo.jpg";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";

const TopBar = React.memo((props) => {
  const { unreadedMessage, conversationToggle } = props;

  const updatePosts = () => {
    props.getAllProfilePosts(props.userData._id);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleSwitchChange = () => {
    props.setSwitch("dark");
  };

  const searchUsers = (e) => {
    props.showChosenProfileSearch(e.currentTarget.value, "activate");
  };

  return (
    <div className="topBar_wrapper" id={props.switchMode}>
      <div className="topBar">
        <div className="topBar_left">
          <Link to="/">
            <span>SiteLogo</span>
          </Link>
        </div>
        <div className="topBar_center">
          <div className="search_icon">
            <SearchOutlinedIcon sx={{ fontSize: 30 }} />
          </div>
          <input
            type="text"
            className="search_input"
            onChange={searchUsers}
            title="Start typing..."
          />
        </div>
        <div className="topBar_right">
          <div className="topBar_info">
            <div className="left_info">
              <Link to="/">
                <p onClick={updatePosts}>HomePage</p>
              </Link>
                <p>Stories</p>
              {/* <Link to="/stories">
              </Link> */}
            </div>
            <div className="center_info">
              <div className="friends">
              {/*   <Link to="/friends">
                </Link> */}
                  <PeopleAltOutlinedIcon />
              </div>
              <div className="messages">
                <Link to="/message">
                  <MailOutlineOutlinedIcon />
                </Link>
                <div className="unread_messages">
                  {!conversationToggle?.[0] && unreadedMessage?.length === 0
                    ? null
                    : !conversationToggle?.[0] && unreadedMessage?.length !== 0
                    ? unreadedMessage?.length
                    : conversationToggle?.[0] && unreadedMessage?.length !== 0
                    ? unreadedMessage?.length
                    : null}
                </div>
              </div>
              <div className="notifications">
                  <NotificationsActiveOutlinedIcon />
               {/*  <Link to="/notifications">
                </Link> */}
              </div>
            </div>
            <div className="dayNight_button">
              <Switch
                title="Change day mode"
                {...label}
                color="default"
                checked={props.switchMode === "dark"}
                onChange={handleSwitchChange}
              />
            </div>
            {/* User photo */}
            {!props.userData === "" ? (
              <div className="right_info">
                <div className="user_logo">
                  <Link to={`/profile/${props.userData._id}`}>
                    <img src={friendLogo} alt="user-logo" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="right_info">
                <div className="user_logo">
                  <Link to={`/profile/${props.userData._id}`}>
                    <img
                      src={
                        !props.profilePicture
                          ? friendLogo
                          : props.profilePicture
                      }
                      alt="user-logo"
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TopBar;
