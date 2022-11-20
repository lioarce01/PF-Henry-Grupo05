import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, image, id, desc, index }) => {
  return (
    <Link to={`/${id}/profile`}>
      <div className="w-[300px] h-[320px] mt-10 overflow-hidden bg-[#F87171] border border-[#b4a6a0] shadow-[0_0_20px_rgba(0,0,0,0.25)]">

        <img
          className="w-[300px] h-[150px] object-cover mx-auto rounded"
          src={image}
          alt="ong logo"
        />

        <div className="py-2">
          <h4 className="text-lg mt-2 mb-2 ml-4 font-bold text-white">{name} - #{index}</h4>
          <p className="ml-2 px-2 text-white">{desc}</p>
        </div>

      </div>
    </Link>
  );
};

export default Card;