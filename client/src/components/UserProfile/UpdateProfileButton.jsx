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
            <button className="ml-2 p-3 font-semibold hover:bg-[#fae2d680] transition duration-300 rounded-md" onClick={manageClick}>
                <BsGearWideConnected />
            </button>
        )
    } else {
        <div></div>
    }

}

export default UpdateProfileButton