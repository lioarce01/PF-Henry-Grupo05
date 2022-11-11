import React from 'react'
import GithubBtn from './GithubBtb';
import LinkedinBtn from './LinkedinBtn';

const TeamCard = ({name,image,linkedin,github,phrase}) => {
    return ( 
        <div className="mb-12 lg:mb-0 ">
            <img
              className="rounded-lg shadow-lg mb-3 mx-auto hover:scale-125 duration-75"
              src={image}
              alt="avatar"
              style={{ width: "180px", height: '180px' }}
            />
            <h5 className="text-lg font-bold mb-2">{name}</h5>
            <p className="mb-3">{phrase}</p>
            <ul className="list-inside flex mx-auto justify-center">
                <GithubBtn github={github}/>   
                <LinkedinBtn linkedin={linkedin}/>
            </ul>
          </div>
     );
}
 
export default TeamCard;