import React from "react";
import "./NavigationMenuBar.scss";
import SignpostTwoToneIcon from "@mui/icons-material/SignpostTwoTone";
import ForumTwoToneIcon from "@mui/icons-material/ForumTwoTone";
import SwitchVideoTwoToneIcon from "@mui/icons-material/SwitchVideoTwoTone";
import ContactSupportTwoToneIcon from "@mui/icons-material/ContactSupportTwoTone";
import WorkHistoryTwoToneIcon from "@mui/icons-material/WorkHistoryTwoTone";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import BuildTwoToneIcon from "@mui/icons-material/BuildTwoTone";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationMenuBar = React.memo((props) => {
  const openMenu = (e) => {
    let menu = document.querySelector(".navigationMenuBar");
    let closeBut = document.querySelector(".close_menu_button");
    menu.style.height = " 730px";
    e.target.parentNode.style.display = "none";
    closeBut.style.display = "block";
  };

  const closeMenu = (e) => {
    let menu = document.querySelector(".navigationMenuBar");
    let showBut = document.querySelector(".show_more_button");
    menu.style.height = "510px";
    e.target.parentNode.style.display = "none";
    setTimeout(() => {
      showBut.style.display = "block";
    }, 600);
  };

  return (
    <div className="navigationMenuBar_wrapper">
      <div className="navigationMenuBar">
        <div className="navLink">
          <p>Posts</p>
          <div className="linkIcon">
            <SignpostTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <Link to={`/message`}>
            <p>Chat</p>
          </Link>
          <div className="linkIcon">
            <ForumTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Videos</p>
          <div className="linkIcon">
            <SwitchVideoTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Questions</p>
          <div className="linkIcon">
            <ContactSupportTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Jobs</p>
          <div className="linkIcon">
            <WorkHistoryTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Events</p>
          <div className="linkIcon">
            <EventNoteTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="show_more_button">
          <Button onClick={openMenu} variant="outlined" size="small" sx={{}}>
            Show more
          </Button>
        </div>
        <div className="navLink">
          <p>Fixing</p>
          <div className="linkIcon">
            <BuildTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Fixing</p>
          <div className="linkIcon">
            <BuildTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="navLink">
          <p>Fixing</p>
          <div className="linkIcon">
            <BuildTwoToneIcon sx={{ fontSize: 40 }} />
          </div>
        </div>
        <div className="close_menu_button">
          <Button onClick={closeMenu} variant="outlined" size="small" sx={{}}>
            Hide
          </Button>
        </div>
      </div>
    </div>
  );
});

export default NavigationMenuBar;
