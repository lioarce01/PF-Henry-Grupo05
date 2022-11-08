import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Link to='/home' class="inline-flex items-center px-10 py-1 bg-gray-200 hover:bg-gray-300 text-gray-600  font-medium rounded-md shadow-lg">
      login
    </Link>
  );
};

export default LoginButton;
