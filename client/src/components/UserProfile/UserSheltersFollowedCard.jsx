import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useAddFollowersMutation, useDeleteFollowersMutation } from "../../redux/api/shelters";
import toast from "react-hot-toast";

function UserSheltersFollowedCard({ profilePic, name, city, id, isFollowing }) {
    
    const { userDetail, isAuth } = useSelector((state) => state.localStorage.userState)
    const [following, setIsFollowing] = useState(isFollowing)

    const [unfollow] = useDeleteFollowersMutation()
	const [follow] = useAddFollowersMutation()

    const deleteFollow = async () => {
		await unfollow({userId: userDetail.id, shelterId: id })
        toast.success('Unfollow successful')
        setIsFollowing(false)
	}

	const addFollow = async () => {
		await follow({userId: userDetail.id, shelterId: id })
        toast.success('Follow successful')
        setIsFollowing(true)
	}

    return (
        <div key={id} className="lg:w-10/12 md:w-3/4 ml-[30px] bg-white mt-[30px] rounded-[40px] pl-[20px] pt-[20px] pr-[20px] pb-[15px] mr-[30px] shadow-[0px_19px_23px_-6px_rgba(235,174,158,1)]">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <img src={profilePic} className="object-cover w-[60px] h-[60px] rounded-[25px]" alt="profilePic"/>

                    <div className="flex flex-col w-max my-auto">
                        <h1 className="font-[700] text-[#201008] ml-[15px] lg:w-max">{name}</h1>
                        <p className="ml-[15px] mt-[-5px] text-[#c46241]">{city}</p>
                    </div>
                </div>

                <div className="w-max flex flex-row gap-2 items-center">
                    {
                        isAuth ?
                            following ?
                                <button onClick={deleteFollow} className="px-3 py-2 m-0 h-fit rounded-md font-medium outline-2 outline-[#c46241] text-[#c46241] hover:text-white hover:bg-[#c46241] duration-150">Unfollow</button>
                                :
                                <button onClick={addFollow} className="px-3 py-2 m-0 h-fit rounded-md font-medium outline-2 outline-[#c46241] text-[#c46241] hover:text-white hover:bg-[#c46241] duration-150">Follow</button>
                            :
                            <div/>
                    }
                    <Link to={`/${id}/profile`} className="m-0">
                        <p className="font-mono tracking-tight text-[2rem] font-bold text-[#e07450] hover:bg-[#e07450] rounded-[25px] hover:text-white duration-300 hover:animate-bounceX"><BiRightArrowAlt/></p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserSheltersFollowedCard