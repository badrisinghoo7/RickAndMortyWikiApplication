import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const CharaterCard = ({ image, name, species, status, id }) => {
  return (
    <div className="card">
      <img className="card-image" src={image} alt={name} />
      <h3>{name}</h3>
      <p>Species: {species}</p>
      <p>Status: {status}</p>
      <Link to={`/character/${id}`} target="_blank">
        View Details
      </Link>
    </div>
  );
};

export default CharaterCard;
