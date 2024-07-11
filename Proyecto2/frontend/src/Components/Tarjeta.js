import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
//import "../Styles/card.css";
import "../pages/styles/cardAutor.css";

function Tarjeta({ imageSource, title, text, url }) {
  const navigate = useNavigate();
  const toProfile = () => {
    navigate(url ? url : "#!");
  };

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "Biografia del autor"}
        </p>
        <button id="btnCard" onClick={toProfile} className="botoncito">Go to {title}</button>
      </div>
    </div>
  );
}

Tarjeta.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};
/*
<a
          href={url ? url : "#!"}
          target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >Go to {title}
        </a>
*/

export default Tarjeta;