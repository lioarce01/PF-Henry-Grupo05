import React from "react";
import TeamCard from "./TeamCard/TeamCard";
import team from './team'
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer/Footer";
import { Link } from "react-router-dom";
import logo from "../Landing/Navbar/logo.png"

const About = () => {
  

  return (
    <>
      {/* //// */}
      <nav className="flex justify-between lg:px-10 px-3 py-5 items-center w-full z-50 dark:bg-[#1B1A1F]">

      <div className={`flex group flex-row`}>
        <span className={`lg:text-[2rem] font-bold dark:text-[#F0EEEE] text-[#201008] group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}>Paws</span>
        <span className={`lg:text-[2rem] font-bold text-[#FF7272] group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
      </div>


      <div className="flex items-center">
        <div className="flex items-center">
          <a className="font-bold mx-7 dark:text-[#F0EEEE] text-[#838788] link-underline link-underline-black lg:text-[1.2rem]" href="/about">About Us</a>
        </div>
      </div>
      <Link to='/'>
        <div>
          <img className="lg:w-12 lg:h-12 w-12 h-8" src={logo} alt="LOGO" />
        </div>
      </Link>
    </nav>
    {/* //// */}
    <div className="dark:bg-[#27242C]">
      <div className="w-full dark:bg-[#27242C] bg-[#e6daca] h-[1px]"/>
        <h1 className="mt-8 text-center text-5xl font-bold text-[#462312] mb-12 dark:text-[#F0EEEE]">About Us</h1>
        <div className="flex flex-row flex-wrap gap-x-32 gap-y-16 justify-items-center justify-center">
          {team.map((person, index) => <TeamCard key={index} github={person.github} linkedin={person.linkedin} image={person.image} name={person.name} phrase={person.phrase} />)}
      </div>
    </div>
      <Footer/>
    </>
  );
};
// className="flex flex-row flex-wrap m-10 gap-x-32 gap-y-16 justify-items-center justify-around"
//className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-xl-9 gap-y-16 px-8 mx-auto justify-items-center"
export default About;
