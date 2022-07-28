import React from "react";
import "./PhotoPage.scss";

// import PropTypes from "prop-types";

const PhotoPage = React.memo((props) => {
  const getAllPhotos = () => {
    props.getPhotos();
  };

  const findPhotosByYear = (e) => {
    const year = e.currentTarget.innerHTML;
    props.getPhotosByYear(year);
  };

  return (
    <div className="page_wrapper">
      <div className="page">
        {props.userName ? (
          <>
            <div className="buttons">
              {props.year === undefined || props.year === [] ? (
                <button onClick={getAllPhotos}>Загрузить фото</button>
              ) : null}
            </div>
            <div className="year">
              <div className="year_buttons">
                {props.year === undefined || props.year === [] ? (
                  <p className="message">
                    Нажмите на кнопку выше, для поиска фотографий по годам.
                  </p>
                ) : (
                  props.year.sort().map((y) => (
                    <button onClick={findPhotosByYear} key={y}>
                      {y}
                    </button>
                  ))
                )}
              </div>
              <div className="photos">
                {props.photoError ? (
                  <h1>
                    Возникла ошибка при загрузке фото, попробуйте обновить
                    страницу
                  </h1>
                ) : props.photos === undefined || props.photos === [] ? (
                  <p>Пока фотографий нет...</p>
                ) : (
                  <div className="photos_loaded">
                    <div className="photos_loaded_wrapper">
                      {props.photos
                        .sort((a, b) => b.likes - a.likes)
                        .map((photo) => (
                          <div key={photo.id} className="photo_example">
                            <img
                              src={photo.url}
                              alt={`Фото ${photo.year} года`}
                            />
                            <div className="likes">
                              <h2>&#10084;</h2>
                              <p>{photo.likes}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="wait_message">
            Ожидание авторизации пользователя...
          </div>
        )}
      </div>
    </div>
  );
});

export default PhotoPage;

// Page.propTypes = {
//   year: PropTypes.number.isRequired,
//   // photos: PropTypes.array.isRequired,
//   setYear: PropTypes.func.isRequired,
// };
