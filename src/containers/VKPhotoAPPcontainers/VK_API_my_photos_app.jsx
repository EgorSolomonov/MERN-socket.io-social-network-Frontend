import React from "react";
import "./VK_API_my_photos_app.scss";
import { connect } from "react-redux";
import PhotoPage from "../../components/VKPhotoAPPcomponents/PhotoPage/PhotoPage";
import User from "../../components/VKPhotoAPPcomponents/User/User";
import {
  userLogInThunk,
  userLogOutThunk,
} from "../../reducers/photoVKApp/userReducer";
import {
  getPhotosByYearThunk,
  getPhotosThunk,
} from "../../reducers/photoVKApp/photoReducer";

const MyPhotosFromVK = React.memo((props) => {
  return (
    <div className="VK_photos">
      <header className="header">
        <span className="title">Мои фото из Vkontakte</span>
        <div className="user_name">
          <User
            userName={props.userName}
            nameError={props.nameError}
            userLogIn={props.userLogIn}
            userLogOut={props.userLogOut}
            loader={props.loader}
          />
        </div>
      </header>
      <div className="photos_by_years">
        <PhotoPage
          year={props.year}
          getPhotos={props.getPhotos}
          userName={props.userName}
          getPhotosByYear={props.getPhotosByYear}
          photos={props.photos}
          photoError={props.photoError}
        />
      </div>
    </div>
  );
});

const mapStateToProps = (store) => {
  return {
    userName: store.user.name,
    nameError: store.user.error,
    year: store.page.year,
    photos: store.page.photos,
    loader: store.loader,
    photoError: store.page.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogIn: () => dispatch(userLogInThunk()),
    userLogOut: () => dispatch(userLogOutThunk()),
    getPhotos: () => dispatch(getPhotosThunk()),
    getPhotosByYear: (year) => dispatch(getPhotosByYearThunk(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosFromVK);
