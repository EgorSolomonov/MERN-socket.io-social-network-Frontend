import React from "react";
import { Link } from "react-router-dom";
import "./SearchList.scss";
import CircularProgress from "@mui/material/CircularProgress";
import friendLogo from "../../utils/friendLogo.jpg";

const SearchList = React.memo((props) => {
  return props.searchResults.length !== 0 ? (
    <div
      id="searchList"
      className={props.searchResults.length !== 0 ? "searchList" : "disactive"}
    >
      {props.searchResults.map((userData) =>
        userData ? (
          <div className="bottomLine" key={userData._id}>
            <div className="user_logo_search">
              <Link to={`/profile/${userData._id}`}>
                <img
                  src={userData.userPicture ? userData.userPicture : friendLogo}
                  alt="user-logo"
                />
              </Link>
              <p>{userData.name}</p>
            </div>
          </div>
        ) : (
          <div className="bottomLine">
            <CircularProgress />
          </div>
        )
      )}
    </div>
  ) : (
    <div className="disactive"></div>
  );
});

export default SearchList;
