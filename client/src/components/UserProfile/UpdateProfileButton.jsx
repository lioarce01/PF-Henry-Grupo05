import React from 'react'
import { useSelector } from "react-redux"
import { BsGearWideConnected } from 'react-icons/bs';

function UpdateProfileButton({userId, setEditMode, editMode}) {

    const {userDetail, isAuth} = useSelector(state => state.localStorage.userState);
    const manageClick = () => {
        editMode ? setEditMode(false) : setEditMode(true);
    }

    if (isAuth && userDetail.id === userId) {
        return (
            <button className="ml-2 p-3 font-semibold hover:bg-[#c9c9c9] hover:text-white hover:rotate-90 transition duration-300 rounded-md dark:text-[#F0EEEE] dark:hover:bg-[#f0eeee3f]" onClick={manageClick}>
                <BsGearWideConnected />
            </button>
        )
    } else {
        <div></div>
    }

}

export default UpdateProfileButton