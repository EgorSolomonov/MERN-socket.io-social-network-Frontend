import {
  getPhotos,
  setPhotoGettingError,
  setYear,
} from "../../actions/photoVKApp/photoActions";
import nextId from "react-id-generator";

export const initialState = {
  page: {
    year: [],
    photos: [],
    loaded: false,
    error: false,
  },
};

export function photoReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "GET_PHOTOS":
      return { ...state, photos: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.error };

    default:
      return state;
  }
}

export const getPhotosThunk = (year) => {
  return async (dispatch) => {
    //eslint-disable-next-line no-undef
    VK.Api.call(
      "photos.getAll",
      { extended: 1, count: 200, v: "5.81" },
      (response) => {
        try {
          if (response.response) {
            const allYears = [];
            response.response.items.map((item) => {
              return allYears.push(new Date(item.date * 1000).getFullYear());
            });
            let yearsToShow = [];
            allYears.forEach((year) => {
              return !yearsToShow.includes(year)
                ? yearsToShow.push(year)
                : null;
            });
            dispatch(setYear(yearsToShow));
          }
        } catch (err) {
          dispatch(setPhotoGettingError(err));
        }
      }
    );
  };
};

export const getPhotosByYearThunk = (year) => {
  return async (dispatch) => {
    //eslint-disable-next-line no-undef
    VK.Api.call(
      "photos.getAll",
      { extended: 1, count: 200, v: "5.81" },
      (response) => {
        try {
          if (response.response) {
            const allYears = [];
            const results = [];
            response.response.items.map((item) => {
              return allYears.push({
                year: `${new Date(item.date * 1000).getFullYear()}`,
                photoData: item.sizes,
                likes: item.likes,
              });
            });
            allYears.map((y) => {
              if (y.year !== year) {
                return null;
              } else return results.push(y);
            });
            const photoArray = [];
            results.map((urlarray) => {
              return urlarray.photoData.map((url) => {
                if (url.type === "p") {
                  return photoArray.push({
                    id: nextId(),
                    year: urlarray.year,
                    likes: urlarray.likes.count,
                    url: url.url,
                  });
                } else return null;
              });
            });
            console.log(photoArray);
            dispatch(getPhotos(photoArray));
          }
        } catch (err) {
          dispatch(setPhotoGettingError(err));
        }
      }
    );
  };
};
