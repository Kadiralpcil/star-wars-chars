import loadingGif from "../../assets/loadingGif.webp";

import "./loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <img className="loader-img" src={loadingGif} alt="loading.."></img>
      <div className="loader-text">Loading..</div>
    </div>
  );
};
