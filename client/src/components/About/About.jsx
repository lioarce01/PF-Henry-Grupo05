import React from "react";
import TeamCard from "./TeamCard/TeamCard";
import team from './team'
import Navbar from "../Landing/Navbar";

const About = () => {
  

  return (
    <>
      <div className="relative">
        <Navbar/>
      </div>
      <h1 className="text-center text-5xl font-bold text-[#462312] mb-16">About Us</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-xl-9 gap-y-16 px-8 mx-auto justify-items-center">
        {team.map((person, index) => <TeamCard key={index} github={person.github} linkedin={person.linkedin} image={person.image} name={person.name} phrase={person.phrase} />)}
      </div>
    </>
  );
};

export default About;
