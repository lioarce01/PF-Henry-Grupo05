import React, { useState } from "react";
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
        <div key={id} className="lg:w-10/12 md:w-3/4 xsm:w-[300px] xsm:m-0 xsm:my-2 ml-[30px] bg-white dark:bg-[#1B1A1F] mt-[30px] rounded-[40px] pl-[20px] pt-[20px] pr-[20px] pb-[15px] mr-[30px] shadow-[6px_16px_54px_-27px_rgba(133,133,133,0.4)]">
            <div className="flex flex-row justify-between xsm:w-auto">
                <div className="flex flex-row">
                    <img src={profilePic} className="object-cover w-[60px] h-[60px] rounded-[25px] xsm:w-[45px] xsm:h-[45px] xsm:mt-2" alt="profilePic"/>

                    <div className="flex flex-col w-max my-auto">
                        <h1 className="font-[700] text-[#838788] ml-[15px] lg:w-max dark:text-[#AFB3B4] xsm:text-[0.75rem] xsm:max-w-[7rem] xsm:mb-2">{name}</h1>
                        <p className="ml-[15px] mt-[-5px] text-[#747879] dark:text-[#AFB3B4] xsm:hidden">{city}</p>
                    </div>
                </div>

                <div className="w-max flex md:flex-row md:gap-2 items-center xsm:flex-col">
                    {
                        isAuth ?
                            following ?
                                <button onClick={deleteFollow} className="px-3 py-2 m-0 h-fit rounded-md font-medium outline-2 outline-[#c46241] text-[#838788] hover:text-white hover:bg-[#FF7272] duration-150 dark:text-[#AFB3B4] dark:hover:bg-[#E06161] dark:hover:text-[#F0EEEE] xsm:text-[0.75rem]">Unfollow</button>
                                :
                                <button onClick={addFollow} className="px-3 py-2 m-0 h-fit rounded-md font-medium outline-2 outline-[#c46241] text-[#838788] hover:text-white hover:bg-[#FF7272] duration-150 dark:text-[#AFB3B4] dark:hover:bg-[#E06161] dark:hover:text-[#F0EEEE] xsm:text-[0.75rem]">Follow</button>
                            :
                            <div/>
                    }
                    <Link to={`/${id}/profile`} className="m-0">
                        <p className="font-mono tracking-tight text-[2rem] font-bold text-[#838788] hover:bg-[#FF7272] rounded-[25px] hover:text-white duration-300 hover:animate-bounceX dark:text-[#AFB3B4] dark:hover:bg-[#E06161] dark:hover:text-[#F0EEEE] xsm:text-[2rem]"><BiRightArrowAlt/></p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserSheltersFollowedCard