import loadingGif from "../../assets/loadingGif.webp";

import "./loader.scss";

export const Loader = () => {
  return (
    <div className="main">
      <div className="main-wrapper">
        <div className="loader">
          <img src={loadingGif} alt="loading.."></img>
          <div className="loader-text">Loading..</div>
        </div>
      </div>
    </div>
  );
};
