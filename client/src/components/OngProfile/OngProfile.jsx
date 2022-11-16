import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
	useAddFollowersMutation,
	useDeleteFollowersMutation,
	useUpdateShelterMutation,
} from "../../redux/api/shelters"
import { useGetShelterByIdQuery } from "../../redux/api/shelters"
import OngFormUpdate from "./OngFormUpdate"
import CardPost from "../Home/CardPost"
import PostFilters from "../Home/PostFilters"
import NavBar from "../Navbar/Navbar"
import CreatePostModal from "../Home/ModalCreatePost"
import Spinner from "../Spinner/Spinner"
import ModalDonate from "./Donate/ModalDonate"
import MapView from "../Maps/MapView/MapView"
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri"
import { useGetUserByIdQuery } from "../../redux/api/users"

const OngDetail = () => {
	const { id } = useParams()

	let [isOpenDonate, setIsOpenDonate] = useState(false)
	const closeModalDonate = () => setIsOpenDonate(false)

	const {
		data: details,
		isLoading,
		error,
		isSuccess,
		isFetching,
		refetch,
	} = useGetShelterByIdQuery(id)

	const [updateShelter, { data: updated, updaterLoading, updaterError }] =
		useUpdateShelterMutation()
	const [addFollowers] = useAddFollowersMutation()

	const [deleteFollowers] = useDeleteFollowersMutation()
	const { data: users, refetch: refetchUser } = useGetUserByIdQuery(
		"636c0a4f1e78d75d8edfae92"
	)

	console.log("users: ", users)

	const userId = "636c0a4f1e78d75d8edfae92"

	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)

	const [input, setInput] = useState({
		description: details?.description,
	})

	const [toggle, setToggle] = useState(true)
	const [toggle2, setToggle2] = useState(true)

	const inputHandler = (e) => {
		e.preventDefault()
		setInput({ description: e.target.value })
	}

	const editHandler = () => setToggle(!toggle)
	const editHandler2 = () => setToggle2(!toggle2)
	const saveHandler = () =>
		updateShelter({
			updatedShelter: { ...details, description: input.description },
			id,
		})

	const addFollow = () => {
		addFollowers({
			shelterId: id,
			userId: userId,
		})

		refetchUser()

		updateShelter({
			id: id,
			followers: details?.followers,
		})
	}

	const deleteFollow = () => {
		deleteFollowers({
			shelterId: id,
			userId: userId,
		})
		refetchUser()

		updateShelter({
			id: id,
			followers: details?.followers,
		})
	}

	console.log("followers: ", details?.followers?.length)

	return (
		<div>
			{!isLoading ? (
				<div className="w-full min-h-screen h-fit bg-[#FAF2E7]">
					<NavBar />
					<div className="flex flex-row justify-end w-full h-full pt-20 ">
						{details?.description?.length > 0 && (
							<div className="fixed left-10 flex flex-col items-center ml-5 border w-fit h-fit p-2 border-4 border-[#462312] rounded-lg ">
								<div className="border w-80 h-fit border-red-50">
									<OngFormUpdate
										toggle={toggle}
										name={details?.name}
										country={details?.country}
										city={details?.city}
										address={details?.address}
										website={details?.website}
										description={details?.description}
									/>
									<button
										className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
										onClick={editHandler}>
										Edit
									</button>
								</div>
								<div className="flex items-center justify-between row">
									<button
										className="bg-transparent mt-4 hover:bg-[#462312] text-[#462312] font-semibold mx-2 hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded transition duration-300"
										onClick={() => setIsOpenDonate(true)}>
										Donate
									</button>
								</div>
							</div>
						)}
						<div>
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
										{users?.following?.find(
											(shelter) => shelter.id === details.id
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
							<div className="flex flex-col items-center mr-16">
								<div className="w-full border-4 border-[#462312] rounded-lg p-4">
									<textarea
										className="w-full resize-none h-60 text-[#462312] font-semibold text-lg"
										type="text"
										name="description"
										onChange={inputHandler}
										defaultValue={details?.description}
										disabled={toggle2}
										value={input.description}
										rows="1"
										cols="1"
									/>
									<div className="flex flex-row-reverse justify-between w-full">
										<div>
											<button
												className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
												onClick={editHandler2}>
												Edit
											</button>
										</div>
										<div>
											{!toggle2 && (
												<button
													className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
													onClick={saveHandler}>
													Save
												</button>
											)}
										</div>
									</div>
								</div>
								<MapView
									name={details?.name}
									country={details?.country}
									city={details?.city}
									address={details?.address}
								/>
								{/* componente post */}
								<div
									className={`${
										details?.posts && details?.posts.length
											? "w-full"
											: "w-[360px]"
									} min-h-[50rem] py-10 mb-4 mt-14`}>
									<button
										onClick={() => setIsOpen(true)}
										className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto flex">
										Create Post
									</button>

									{details?.posts && details?.posts.length ? (
										<div className="flex items-center justify-end">
											<PostFilters />
										</div>
									) : null}

<<<<<<< HEAD
                            <div className=''>
                                {details?.posts.length ? details?.posts.map(post => {
                                    return (
                                        <CardPost
                                            key={post.id}
                                            id={post.id}
                                            profilePic={post.author.profilePic}
                                            postImage={post.image}
                                            author={post.author.name}
                                            content={post.content}
                                            likes={post.likes}
                                            createdAt={post.createdAt}
                                            comments={post.Comment.length}
                                            authorId={post.authorId}
                                        />
                                    )
                                }) : <h2 className="mt-[40px] text-center">No posts available.</h2>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CreatePostModal isOpen={isOpen} closeModal={closeModal} />

            <ModalDonate isOpen={isOpenDonate} closeModal={closeModalDonate} name={details?.name} id={id}/>

        </div>
        ) : (<Spinner />)}
        </div>
    )
=======
									<div className="">
										{details?.posts.length ? (
											details?.posts.map((post) => {
												return (
													<CardPost
														key={post.id}
														id={post.id}
														profilePic={post.author.profilePic}
														postImage={post.image}
														author={post.author.name}
														content={post.content}
														likes={post.likes}
														createdAt={post.createdAt}
														comments={post.Comment.length}
														authorId={post.authorId}
													/>
												)
											})
										) : (
											<h2 className="mt-[40px] text-center">
												No posts available.
											</h2>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
>>>>>>> 24f22c6c41f6aec9724382457b5460eaddd2840f

					<CreatePostModal isOpen={isOpen} closeModal={closeModal} />

					<ModalDonate
						isOpen={isOpenDonate}
						closeModal={closeModalDonate}
						name={details.name}
						id={id}
					/>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	)
}

export default OngDetail
