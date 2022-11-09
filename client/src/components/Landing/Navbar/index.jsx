import React from "react";
import Button from "../Button";

const Navbar = () => {
  const LOGO = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"
  return (
    <nav className="flex justify-between px-10 py-5 items-center bg-gray-200">
      <img src={LOGO} className="mr-3 h-6 sm:h-9" alt="" />
      <div className="flex items-center">
        <div className="flex items-center">
          <Button name="Login" link="/home"/>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
