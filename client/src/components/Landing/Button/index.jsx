import React from "react";
import { Link } from "react-router-dom";

const Button = ({name, link}) => {
  return (
    <Link to={link} className="inline-flex items-center px-10 py-1 font-medium text-gray-600 bg-gray-200 rounded-md shadow-lg hover:bg-gray-300">
      {name}
    </Link>
  );
};

export default Button;
