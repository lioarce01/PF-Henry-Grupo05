import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to='/home' className="inline-flex items-center px-10 py-1 bg-gray-100 hover:bg-gray-300 text-gray-600  font-medium rounded-md shadow-sm">
      login
    </Link>
  );
};

export default LoginButton;
