import React from "react"
import { Link } from "react-router-dom"

function UserSheltersFollowedCard({ profilePic, name, city, description, id }) {    
    
    return (
        <div key={id} className="max-w-sm ml-[30px] bg-white mt-[20px] rounded-[40px] pl-[20px] pt-[20px] pr-[20px] pb-[15px] mr-[30px] shadow-[0px_19px_23px_-6px_rgba(235,174,158,1)]">
            <div className="flex flex-row">
                <img src={profilePic} className="object-cover w-[60px] h-[60px] rounded-[25px]" alt="profilePic"/>

                <div className="flex flex-col items-start mt-[10px]">
                    <h1 className="flex flex-col font-[700] text-[#201008] ml-[15px]">{name}</h1>
                    <p className="flex flex-col ml-[15px] mt-[-5px] text-[#c46241]">{city}</p>
                </div>

            </div>

            <div className="flex mt-[10px]">
                <p className="flex flex-row w-[250px] font-semibold text-[#929294] text-[0.9rem]">
                    {description.length > 61 ? (description.slice(0, 61) + "...") : (description)}</p>
            </div>

            <div className="flex w-full justify-end">
                <Link to={`/${id}/profile`}>
                    <p className="font-mono flex tracking-tight font-bold text-[#e07450] mt-[10px] hover:underline">READ</p>
                </Link>
            </div>
        </div>
    )
}

export default UserSheltersFollowedCard