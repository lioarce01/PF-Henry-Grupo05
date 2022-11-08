import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, image, id }) => {
  return (
    <Link to={`/${id}/profile`}>
      <div className="max-w-xs rounded overflow-hidden my-2 border border-gray-300 px-1 py-1 flex-reverse items-center">
        <img
          className="max-w-md h-28 mx-auto rounded"
          src={image}
          alt="ong logo"
        />
        <div className="py-2 ">
          <h4 className="text-lg mb-2">{name}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;