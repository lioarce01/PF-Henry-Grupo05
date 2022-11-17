import React from 'react'
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

function UpdateProfileButton({userId}) {

    const {userDetail, isAuth} = useSelector(state => state.localStorage.userState);

    if (isAuth && userDetail.id === userId) {
        return (
        <Link to="/updateUser">
            <button className="inline-block px-2 py-1 font-semibold text-[#462312] bg-[#FAF2E7] border-2 border-[#FAF2E7] hover:bg-[#462312] transition duration-300 hover:text-[#fffcf7] rounded-md md:ml-4">
                Update Profile
            </button>
        </Link>
        )
    } else {
        <div></div>
    }

}

export default UpdateProfileButton