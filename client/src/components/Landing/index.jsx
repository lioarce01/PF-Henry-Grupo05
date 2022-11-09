import React from "react";
import Navbar from "./Navbar";
import Introduction from "./Introduction";
import Carousel from "./Carousel";
import About from "./about";

function Landing() {
  return (
    <>
      <Navbar />
      <Introduction />
      <Carousel />
      <About />
    </>
  );
}

export default Landing;
