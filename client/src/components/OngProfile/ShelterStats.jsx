import React from "react"
import { useEffect } from "react";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import {
	useAddFollowersMutation,
	useDeleteFollowersMutation,
} from "../../redux/api/shelters"
import { useGetUserByIdQuery } from "../../redux/api/users"
import { addFollowingAction, removeFollowingAction } from '../../redux/slices/manageUsers/actions';
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react"


function ShelterStats({ shelterId, userDetail, details, shelterRefetch }) {
	const navigate = useNavigate();
	const dispatch= useDispatch();
	const user = useSelector(state => state.localStorage.userState)
	const [unfollow] = useDeleteFollowersMutation()
	const [follow] = useAddFollowersMutation()
	const { loginWithPopup } = useAuth0();

	const { data: userDetails, refetch: userRefetch } = useGetUserByIdQuery(
		userDetail?.id
	)

	const deleteFollow = async () => {
		if(user.isAuth){
			await unfollow({ shelterId, userId: userDetail.id })
			shelterRefetch()
			userRefetch()
		}else{
			dispatch(removeFollowingAction(shelterId))
			shelterRefetch()
			userRefetch()
		}
	}

	const addFollow = async () => {
		if(user.isAuth){
			await follow({ shelterId, userId: userDetail.id })
			shelterRefetch()
			userRefetch()
		}else{
			if(user.following.length > 2){
				Swal.fire({
					icon: 'error', title: 'Create a user or log in to save your following',
					preConfirm: async () => {
						navigate(`/home`)
						await loginWithPopup()
					}
				})
			}else{
				dispatch(addFollowingAction(details))
				shelterRefetch()
				userRefetch()
			}
		}
	}

	useEffect(()=>{
		userRefetch()
	},[dispatch])

	return (
			<div className="w-full flex flex-col items-center lg:my-4">
			<div className="shadow-[rgb(255,213,201)] shadow-xl bg-white rounded-2xl py-2 px-2 w-9/12 lg:w-full">
				<div className="flex flex-col justify-between">
					<div className="flex flex-col font-semibold text-xs sm:text-base">
						<div className="flex flex-row items-center pt-2">
						<label className=" text-[#d45f37]">Followers: </label>
						<span className="text-black indent-4">{details?.followers?.length}</span>
						</div>
						<div className="flex flex-row items-center pt-2">
						<label className=" text-[#d45f37]">Posts: </label>
						<span className="text-black indent-4">{details?.posts?.length}</span>
						</div>
						<div className="flex flex-row items-center pt-2">
						<label className=" text-[#d45f37]">Budget: </label>
						<span className="text-black indent-4">{`$ARS ${details?.budget}`}</span>
						</div>
						{/* <div className="flex flex-row items-center pt-2">
						<label className=" text-[#d45f37]">Goal: </label>
						<span className="text-black indent-4">{`$ARS ${details?.goal}`}</span>
						</div> */}
					</div>
					{ !(userDetail.id === details.authorId) && <div className="flex justify-center text-xs sm:text-base w-full mt-2">
						{(userDetails?.following?.find(
							(shelter) => shelter.id === shelterId
						) || user.following?.find(
							(shelter) => shelter.id === shelterId
						)) ? (
							<button
								className="bg-transparent hover:bg-[#d32727] bg-[#b90707] text-white transition duration-300 font-semibold hover:text-white py-1 px-4 hover:border-transparent rounded flex flex-row items-center justify-center border"
								onClick={deleteFollow}>
								Unfollow{" "}
								<span className="pl-2">
									<RiUserUnfollowLine />
								</span>
							</button>
						) : (
							<button
								className="bg-transparent hover:bg-[#24c531] bg-[#22b92f] transition duration-300 text-white font-semibold hover:text-white py-1 px-4 border hover:border-transparent rounded flex flex-row items-center justify-center"
								onClick={addFollow}>
								Follow{" "}
								<span className="pl-2">
									<RiUserFollowLine />
								</span>
							</button>
						)}
					</div>}
				</div>
			</div>
			</div>
	)
}

export default ShelterStats
