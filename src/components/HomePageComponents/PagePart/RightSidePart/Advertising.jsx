import React from "react";
import "./Advertising.scss";
import advertisingImg from "../../../../utils/advertisementExample.jpg";

const Advertising = React.memo((props) => {
  return (
    <div className="advertising_wrapper">
      <div className="advertising">
        <img src={advertisingImg} alt="" />
      </div>
    </div>
  );
});

export default Advertising;
