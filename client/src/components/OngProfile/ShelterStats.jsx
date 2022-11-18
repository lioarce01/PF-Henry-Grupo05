import React from "react"
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri"
import {
	useAddFollowersMutation,
	useDeleteFollowersMutation,
} from "../../redux/api/shelters"
import { useGetUserByIdQuery } from "../../redux/api/users"

function ShelterStats({ shelterId, userDetail, details, shelterRefetch }) {
	const [unfollow] = useDeleteFollowersMutation()
	const [follow] = useAddFollowersMutation()
	console.log("userdetail: ", userDetail)

	const { data: userDetails, refetch: userRefetch } = useGetUserByIdQuery(
		userDetail?.id
	)

	const deleteFollow = async () => {
		await unfollow({ shelterId, userId: userDetail.id })
		shelterRefetch()
		userRefetch()
	}

	const addFollow = async () => {
		await follow({ shelterId, userId: userDetail.id })
		shelterRefetch()
		userRefetch()
	}
	return (
		<>
			<div>
				<h1 className="text-xl">Shelter stats</h1>
			</div>
			<div className="border-2 border-black rounded-md w-[360px] my-2 p-2">
				<div className="flex flex-col justify-between">
					<div className="flex flex-col">
						<p>
							Followers: <span>{details?.followers?.length}</span>
						</p>
						<p>
							Posts: <span>{details?.posts?.length}</span>
						</p>
						<p>
							Donations: <span>{details?.donations?.length}</span>
						</p>
						<p>
							Budget: <span>{details?.budget}</span>
						</p>
						<p>
							Goal: <span>{details?.goal}</span>
						</p>
					</div>
					<div>
						{userDetails?.following?.find(
							(shelter) => shelter.id === shelterId
						) ? (
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
