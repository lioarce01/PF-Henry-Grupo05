import React from "react"
import { useEffect } from "react";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";
import {
	useAddFollowersMutation,
	useDeleteFollowersMutation,
} from "../../redux/api/shelters"
import { useGetUserByIdQuery } from "../../redux/api/users"
import { addFollowingAction, removeFollowingAction } from '../../redux/slices/manageUsers/actions';

function ShelterStats({ shelterId, userDetail, details, shelterRefetch }) {
	const dispatch= useDispatch();
	const user = useSelector(state => state.localStorage.userState)
	const [unfollow] = useDeleteFollowersMutation()
	const [follow] = useAddFollowersMutation()

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
			dispatch(addFollowingAction(details))
			shelterRefetch()
			userRefetch()
		}
	}

	useEffect(()=>{
		userRefetch()
	},[user])
	return (
		<>
			<div className="my-4">
				<h1 className="text-xl font-bold">Shelter stats</h1>
			</div>
			<div className="shadow-[rgb(255,213,201)] shadow-xl bg-white rounded-2xl w-[340px] py-2 px-4">
				<div className="flex flex-col justify-between">
					<div className="flex flex-col font-semibold">
						<p className="pt-2">
							Followers: <span>{details?.followers?.length}</span>
						</p>
						<p className="pt-2">
							Posts: <span>{details?.posts?.length}</span>
						</p>
						<p className="pt-2">
							Budget: <span>{details?.budget}</span>
						</p>
						<p className="pt-2">
							Goal: <span>{details?.goal}</span>
						</p>
					</div>
					<div className="flex justify-center w-full">
						{(userDetails?.following?.find(
							(shelter) => shelter.id === shelterId
						) || user.following?.find(
							(shelter) => shelter.id === shelterId
						) )? (
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
					</div>
				</div>
			</div>
		</>
	)
}

export default ShelterStats
