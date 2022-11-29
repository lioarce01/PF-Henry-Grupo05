import React from "react";
import TeamCard from "./TeamCard/TeamCard";
import team from './team'
import Navbar from "../Landing/Navbar";
import Footer from "../Landing/Footer/Footer";

const About = () => {
  

  return (
    <div>
      <div className="dark:bg-[#27242C] bg-[#EFF0F3]">
        <Navbar />
        <div className="w-full dark:bg-[#27242C] bg-[#EFF0F3] h-[1px]"/>
          <h1 className="mt-8 text-center text-5xl font-bold text-[#462312] mb-12 dark:text-[#F0EEEE]">About Us</h1>
          <div className="flex flex-row flex-wrap gap-x-32 gap-y-16 justify-items-center justify-center">
            {team.map((person, index) => <TeamCard key={index} github={person.github} linkedin={person.linkedin} image={person.image} name={person.name} phrase={person.phrase} />)}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
// className="flex flex-row flex-wrap m-10 gap-x-32 gap-y-16 justify-items-center justify-around"
//className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-xl-9 gap-y-16 px-8 mx-auto justify-items-center"
export default About;
