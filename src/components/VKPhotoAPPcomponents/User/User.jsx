import React from "react";
import Loader from "../../Loading/Loader";
import "./User.scss";

const User = React.memo((props) => {
  const { userName, nameError, loader } = props;

  const logIn = () => {
    props.userLogIn();
  };
  const logOut = () => {
    props.userLogOut();
  };

  if (loader === true) {
    return <Loader />;
  } else if (nameError) {
    return <div>Возникла проблема при авторизации, обновите страницу</div>;
  } else
    return (
      <div className="user">
        {userName === undefined || userName === null ? (
          <button onClick={logIn}>Войти</button>
        ) : (
          <div className="logout">
            <h3>{userName}</h3>
            <button onClick={logOut}>Выйти</button>
          </div>
        )}
      </div>
    );
});

export default User;
