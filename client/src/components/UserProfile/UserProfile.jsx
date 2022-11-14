import React from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "../Navbar/Navbar"
import { useEffect } from "react"
import { getUserByIdAction } from "../../redux/reducers/dataBack/manageUsers/manageUsersActions"
import CardPost from "../Home/CardPost"
import ONGCard from "../Home/ONGCard"
import Spinner from "../Spinner/Spinner"

const UserProfile = () => {
	const params = useParams()
	console.log("params:", params)
	const dispatch = useDispatch()

	const user = useSelector((state) => state.manageUsers.details)
	console.log("userDetail: ", user)

	useEffect(() => {
		dispatch(getUserByIdAction(params.userId))
	}, [dispatch, params.userId])

	const { following } = user

	return (
		<div className="bg-[#FAF2E7]">
			<Navbar />
			<div className="flex flex-col items-center h-full min-h-screen pt-16">
				<h1 className="my-5 text-4xl font-bold text-[#462312]">
					User Dashboard
				</h1>
				<div className="flex flex-col w-[90%] md:w-[640px] lg:w-[768px] py-4 px-4 mt-2 bg-[#fffcf7] rounded-md md:flex-row">
					<div className="flex justify-center">
						<img
							src={user.profilePic}
							alt="user"
							className="border-4 border-white rounded-full w-36 h-36"
						/>
					</div>
					<div className="mt-2">
						<div className="flex flex-col items-center sm:items-start sm:pl-5">
							<p className="py-2 text-xl font-bold">{user.name}</p>
						</div>
						<p className="py-2 md:pl-5">Email: {user.email}</p>
						<p className="py-2 md:pl-5">Role: {user.role}</p>
						<button className="inline-block px-2 py-1 font-semibold text-[#462312] bg-[#FAF2E7] border-2 border-[#FAF2E7] hover:bg-[#462312] transition duration-300 hover:text-[#fffcf7] rounded-md md:ml-4">
							Update Profile
						</button>
					</div>
				</div>
				<h1 className="py-2 text-4xl font-bold text-[#462312]">User Posts</h1>
				<div
					className={`flex flex-col w-[90%] md:w-[640px] lg:w-[768px] ${
						user.posts?.length > 0 ? "max-h-[700px]" : "max-h-[160px]"
					} overflow-y-scroll h-auto py-2 px-4 my-4 bg-[#fffcf7] rounded-md items-center`}>
					<div className="mt-2">
						{user.posts?.length < 1 ? (
							<div className="my-10">
								<h1 className="text-xl font-bold text-[#462312]">
									You have no posts!
								</h1>
							</div>
						) : user.posts === 0 ? (
							<div className="my-10">
								<h1 className="text-xl font-bold text-[#462312]">
									You have no posts!
								</h1>
							</div>
						) : user.posts?.length ? (
							user.posts.map((post) => {
								return (
									<CardPost
										key={post.id}
										id={post.id}
										author={user.name}
										content={post.content}
										postImage={post.image}
										profilePic={user.profilePic}
										createdAt={post.createdAt}
										likes={post.likes}
										comments={post.comments}
									/>
								)
							})
						) : (
							<div className="">
								<Spinner />
							</div>
						)}
					</div>
				</div>
				<h1 className="py-4 text-3xl font-bold text-[#462312]">
					User Shelters Following
				</h1>
				<div className="flex flex-col w-[90%] md:w-[640px] lg:w-[768px] h-auto max-h-[1000px] py-2 px-4 my-4 bg-[#fffcf7] rounded-md">
					<div className="flex flex-col mt-2 overflow-y-scroll ">
						{Array.isArray(following) ? (
							following?.length ? (
								following?.map((ong) => {
									return (
										<ONGCard
											key={ong.id}
											id={ong.id}
											name={ong.name}
											description={ong.description}
											goal={ong.goal}
											followers={ong.userFollowers.length}
										/>
									)
								})
							) : (
								<h2>You are not following any shelters.</h2>
							)
						) : (
							<Spinner />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
