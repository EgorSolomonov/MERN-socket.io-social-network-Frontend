import React, { useEffect, useRef } from "react";
import "./LikesScroller.scss";
import { Link } from "react-router-dom";
import friendLogo from "../../../../utils/friendLogo.jpg";

const LikesScroller = React.memo((props) => {
  const {
    popupId,
    postLikesArray,
    likedPeopleData,
    getAndShowWhoLiked,
    whoLiked,
  } = props;

  const wheelLikes = (e) => {
    e = window.event || e;
    let delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
    document.querySelector(".likes_line").scrollLeft -= delta * 40; // Multiplied by 40
    // e.preventDefault();
  };

  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line
  }, [timerRef.current]);

  const showWhoLiked = (e) => {
    getAndShowWhoLiked(whoLiked, e.target.getAttribute("data-id"), "show");
  };

  const removeWhoLiked = () => {
    timerRef.current = setTimeout(() => {
      getAndShowWhoLiked(null, null, "remove");
    }, 2000);
  };

  if (likedPeopleData.length !== 0) {
    return (
      <div
        id="likesLine"
        className={
          postLikesArray.includes(popupId) ? "whoLiked_wrapper" : "disactive2"
        }
      >
        <div
          className="whoLiked"
          onMouseEnter={showWhoLiked}
          onMouseLeave={removeWhoLiked}
          data-id={popupId}
        >
          <div className="likes_line" onWheel={wheelLikes}>
            {likedPeopleData.length !== 0
              ? likedPeopleData.map((peopData) => {
                  return (
                    <div key={peopData._id} className="user_logo_likes">
                      <Link to={`/profile/${peopData._id}`}>
                        <img
                          src={
                            !peopData.userPicture
                              ? friendLogo
                              : peopData.userPicture
                          }
                          alt={peopData.name}
                          title={peopData.name}
                        />
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  } else return <div id="likesLine" className="disactive2"></div>;
});

export default LikesScroller;
