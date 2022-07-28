import React, { useEffect, useState } from "react";
import "./RightProfilePagePart.scss";
import friendLogo from "../../utils/friendLogo.jpg";
import video1 from "../../utils/video1.jpg";
import video2 from "../../utils/video2.jpg";
import video3 from "../../utils/video3.jpg";
import video4 from "../../utils/video4.jpg";
import photos1 from "../../utils/photos1.jpg";
import photos2 from "../../utils/photos2.jpg";
import photos3 from "../../utils/photos3.jpg";
import photos4 from "../../utils/photos4.jpg";
import music1 from "../../utils/music1.jpg";
import music2 from "../../utils/music2.jpg";
import music3 from "../../utils/music3.jpg";
import music4 from "../../utils/music4.jpg";
import friends from "../../utils/friends.jpg";
import NativeSelect from "@mui/material/NativeSelect";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const RightProfilePagePart = React.memo((props) => {
  const {
    userData,
    infoActivator,
    toggleProfileInfoActivator,
    getIdAndSendInfo,
    profile,
    friendProfiles,
  } = props;

  const [city, setCity] = useState(profile.city);
  useEffect(() => {
    setCity(profile.city);
  }, [profile.city]);

  const [birthday, setBirthday] = useState(profile.birthday);
  useEffect(() => {
    setBirthday(profile.birthday);
  }, [profile.birthday]);

  let [relationship, setRelationship] = useState(profile.relationship);
  useEffect(() => {
    setRelationship(String(profile.relationship));
  }, [profile.relationship]);

  const params = useParams();

  //City functions
  const changeCity = () => {
    toggleProfileInfoActivator(!infoActivator);
  };

  const getCityValue = (e) => {
    setCity(e.currentTarget.value);
  };

  const sendCityOnBlur = (e) => {
    getIdAndSendInfo(e.currentTarget.value, params.id, "city");
    toggleProfileInfoActivator(!infoActivator);
  };

  //Birthday functions
  const changeBirthday = () => {
    toggleProfileInfoActivator(!infoActivator);
  };

  const sendBirthdayOnBlur = (e) => {
    getIdAndSendInfo(e.currentTarget.value, params.id, "birthday");
    toggleProfileInfoActivator(!infoActivator);
  };

  //Relationship functions
  const changeRelationship = () => {
    toggleProfileInfoActivator(!infoActivator);
  };
  const getRelationshipValue = (e) => {
    setRelationship(e.currentTarget.value);
  };

  const sendRelationshipOnBlur = (e) => {
    getIdAndSendInfo(e.currentTarget.value, params.id, "relationship");
    toggleProfileInfoActivator(!infoActivator);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="rightProfilePagePart_wrapper">
        <div className="rightProfilePagePart">
          <div className="user_info">
            <h3>{profile.name}'s profile information:</h3>
            <div className="info city">
              <h4>City:</h4>
              {infoActivator ? (
                <TextField
                  onBlur={sendCityOnBlur}
                  onChange={getCityValue}
                  size="small"
                  variant="standard"
                  value={city}
                />
              ) : (
                <p
                  onDoubleClick={
                    userData._id === profile._id ? changeCity : null
                  }
                >
                  {city === undefined || city === null || city === ""
                    ? " enter your city"
                    : city}
                </p>
              )}
            </div>
            <div className="info birth">
              <h4>Date of birthday:</h4>
              {infoActivator ? (
                <DatePicker
                  value={birthday}
                  onChange={(birth) => {
                    const month = birth.getMonth() + 1;
                    const day = birth.getDate();
                    const year = birth.getFullYear();
                    const date = `${month < 10 ? "0" + month : month}/${
                      day < 10 ? "0" + day : day
                    }/${year}`;
                    setBirthday(date);
                  }}
                  renderInput={(params) => (
                    <TextField onBlur={sendBirthdayOnBlur} {...params} />
                  )}
                />
              ) : (
                <p
                  onDoubleClick={
                    userData._id === profile._id ? changeBirthday : null
                  }
                >
                  {birthday === undefined ||
                  birthday === null ||
                  birthday === ""
                    ? " enter your birth date"
                    : birthday}
                </p>
              )}
            </div>
            <div className="info relationship">
              <h4>Relationship:</h4>
              {infoActivator ? (
                <NativeSelect
                  onBlur={sendRelationshipOnBlur}
                  onChange={getRelationshipValue}
                  value={relationship}
                >
                  <option value={1}>Single</option>
                  <option value={2}>In relationship</option>
                  <option value={3}>All is hard</option>
                </NativeSelect>
              ) : (
                <p
                  onDoubleClick={
                    userData._id === profile._id ? changeRelationship : null
                  }
                >
                  {relationship === "1"
                    ? "Single"
                    : relationship === "2"
                    ? "In relationship"
                    : relationship === "3"
                    ? "All is hard"
                    : "choose your relationship status"}
                </p>
              )}
            </div>
          </div>
          <div className="info_links">
            <div className="number friends">
              <h3>{`Friends: `}</h3>
              <table className="table friend" cellSpacing="5">
                <tbody>
                  <tr>
                    <td>
                      <img src={friends} alt="backPicture" id="backPicture" />
                      <p>
                        {`${
                          friendProfiles.length === 1
                            ? "1 друг"
                            : `${friendProfiles.length} друзей`
                        }`}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="number musics">
              <h3>{`Musics: `}</h3>
              <table className="table musics" cellSpacing="5">
                <tbody>
                  <tr>
                    <td>
                      <img src={music1} alt="" />
                    </td>
                    <td>
                      <img src={music2} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={music3} alt="" />
                    </td>
                    <td>
                      <img src={music4} alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="number photos">
              <h3>{`Photos: `}</h3>
              <table className="table photo" cellSpacing="5">
                <tbody>
                  <tr>
                    <td>
                      <img src={photos1} alt="photos" />
                    </td>
                    <td>
                      <img src={photos2} alt="photos" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={photos3} alt="photos" />
                    </td>
                    <td>
                      <img src={photos4} alt="photos" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="number videos">
              <h3>{`Videos: `}</h3>
              <table className="table video" cellSpacing="5">
                <tbody>
                  <tr>
                    <td>
                      <img src={video1} alt="" />
                    </td>
                    <td>
                      <img src={video2} alt="" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={video3} alt="" />
                    </td>
                    <td>
                      <img src={video4} alt="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h2>{profile.name}'s friends</h2>
          {friendProfiles.length !== 0 ? (
            <div className="friendsExamples">
              {friendProfiles.map((profile) => {
                return (
                  <Link key={profile._id} to={`/profile/${profile._id}`}>
                    <div className="user_logo">
                      <img
                        src={
                          !profile.userPicture
                            ? friendLogo
                            : profile.userPicture
                        }
                        alt="user-logo"
                      />
                      <h5>{profile.name}</h5>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="friendsExamples">
              <h4>Список друзей пуст</h4>
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
});

export default RightProfilePagePart;
