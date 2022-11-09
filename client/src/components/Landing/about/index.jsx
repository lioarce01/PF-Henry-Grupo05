import React from "react";
import TeamCard from "./teamCard";
import team from './team'

const About = () => {
  

  return (
    <div className=" container mb-24 px-6 mx-auto mt-32" id="about">
      <section className="mb-32 text-gray-800 text-center">
      <h1 className="mb-20 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-4xl">
              About Us
            </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-xl-12 gap-y-8">
          {team.map((person, index) => <TeamCard key={index} github={person.github} linkedin={person.linkedin} image={person.image} name={person.name} phrase={person.phrase} />)}
          
        </div>
      </section>
    </div>
  );
};

export default About;
