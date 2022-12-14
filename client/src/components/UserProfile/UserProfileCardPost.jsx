import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings, MdComment } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { getTimeAgo } from "../../utils";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect } from "react";
import ModalPostDetail from "../Home/Modals/ModalPostDetail";
import ShowMoreText from "react-show-more-text";
import { useUpdatePostLikesMutation } from "../../redux/api/posts";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { selectUser } from "../../redux/slices/manageUsers";
import { addLikeAction, removeLikeAction } from "../../redux/slices/manageUsers/actions";
import VideoPlayer from "../VideoPlayer";

const UserProfileCardPost = ({
	image,
	author,
	content,
	profilePic,
	postImage,
	likes,
	createdAt,
	comments,
	id,
	authorId,
	authorRole,
	shelter,
	shelterId,
	postVideo
}) => {
	const { likes: userLikes } = useSelector(selectUser)
	const [likesActuals, setLikesActuals] = useState(likes)
	const dispatch = useDispatch()

	const myLike = () => {
		if (userLikes?.length < 1) return false
		if (userLikes?.includes(id)) return true
		return false
	}

	const [like, setLike] = useState(myLike)
	const [isOpen, setIsOpen] = useState(false)
	const { isAuth } = useSelector((state) => state.localStorage.userState)
	const closeModal = () => setIsOpen(false)

	const { getAccessTokenSilently } = useAuth0()

	const [updateLikes] = useUpdatePostLikesMutation()

	const toggleLike = async () => {
		if (!isAuth) return toast.error("you are not logged in")

		setLike(!like)
		like ? setLikesActuals(likesActuals - 1) : setLikesActuals(likesActuals + 1)
		const accessToken = await getAccessTokenSilently()
		like
			? updateLikes({ post: { id, likes: likesActuals - 1 }, accessToken })
			: updateLikes({ post: { id, likes: likesActuals + 1 }, accessToken })

		like ? dispatch(removeLikeAction(id)) : dispatch(addLikeAction(id))
	}

	useEffect(() => {
		setLike(like)
	}, [like])

	useEffect(() => {
		setLikesActuals(likes)
	}, [likes])
	if (!image)
		image =
			"https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY"

	return (
		<div className="flex flex-col">
			<div className="2xl:w-[800px] xl:w-[600px] xsm:w-[350px] my-4 mx-auto md:min-w-[500px] bg-white rounded-[30px] shadow-[6px_16px_54px_-27px_rgba(133,133,133,0.4)] dark:bg-[#1B1A1F]">
				<div className="flex flex-col mx-auto m-[30px] rounded-[30px] px-[20px] 2xl:w-[800px] xl:w-[600px]">
					<div className="flex flex-row">
						<img
							className="object-cover mr-4 rounded-[20px] shadow w-14 h-14"
							src={profilePic}
							alt="avatar"
						/>

						<div className="flex flex-col items-start">
							<Link to={`/users/${authorId}`} className="">
								<h2 className="flex items-center justify-center mb-1 text-lg font-bold text-[#838788] border-b border-[#fffcf7] hover:border-[#838788] transition duration-300 dark:text-[#F0EEEE] dark:border-[#1B1A1F] dark:hover:border-[#F0EEEE]">
									{author}{" "}
									{authorRole === "Admin" && (
										<MdAdminPanelSettings className="ml-2 text-yellow-500" />
									)}
								</h2>
							</Link>
							<div className="flex flex-row gap-2">
								<Link to={`/${shelterId}/profile`}>
									<p className="px-2 py-1 text-sm font-semibold text-white transition duration-300 bg-[#FF7272] rounded-lg hover:shadow-md hover:shadow-red-400">
										{shelter}
									</p>
								</Link>
								<small className="px-2 py-1 text-sm text-white font-semibold rounded-md bg-[#6D91E9]">
									{getTimeAgo(createdAt)}
								</small>
							</div>
						</div>
					</div>

					<div className="flex flex-col 2xl:w-full xl:w-[500px] py-[20px] 2xl:px-[70px] xsm:px-0 xsm:w-[80%] xl:px-2 mx-auto font-normal text-justify text-gray-900 text-md dark:text-[#AFB3B4]">
						<ShowMoreText
							lines={3}
							more="Show more"
							less="Show less"
							className="content-css"
							anchorClass="show-more-less-clickable"
							expanded={false}
							truncatedEndingComponent={"... "}>
							{content}
						</ShowMoreText>
					</div>

					<div className="rounded-[20px]">
						{postImage && <img
							src={postImage}
							alt="post"
							className="object-center object-contain w-[400px] mt-[20px] mb-[30px] flex mx-auto rounded-[20px] lg:max-h-[300px]"
						/>}
						{postVideo && <VideoPlayer public_id={postVideo}/>}
					</div>

					<div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-400 dark:border-[#38353d]">
						<div className="flex mr-4 text-sm text-gray-700 dark:text-[#857d91]">
							{like ? (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border-[#EFF0F3] py-1 px-3 rounded-md hover:bg-[#EFF0F3] transition duration-300 dark:border-[#38353d] dark:hover:bg-[#F0EEEE]"
									onClick={toggleLike}>
									<p className="mr-[7px] mb-[1px] font-[800]">{likesActuals}</p>
									<AiFillHeart className="w-5 h-5 text-red-600" />
								</button>
							) : (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border hover:border-[#EFF0F3] py-1 px-3 rounded-md hover:bg-[#EFF0F3] transition duration-300 dark:border-[#38353d] dark:hover:bg-[#F0EEEE]"
									onClick={toggleLike}>
									<p className="mr-[7px] mb-[1px] font-[800]">{likesActuals}</p>
									<AiOutlineHeart className="w-5 h-5 text-red-600" />
								</button>
							)}
						</div>

						<div className="flex mr-2 text-sm text-gray-700 dark:text-[#857d91]">
							<button
								onClick={() => setIsOpen(true)}
								className="flex flex-row items-center pr-4 border border-[#fffcf7] hover:border hover:border-[#EFF0F3] py-1 px-3 rounded-md hover:bg-[#EFF0F3] transition duration-300 dark:border-[#38353d] dark:hover:bg-[#F0EEEE]">
								<p className="mr-[7px] mb-[1px] font-[800]">{comments}</p>
								<MdComment className="w-5 h-5 text-[#6D91E9]" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<ModalPostDetail
				id={id}
				closeModal={closeModal}
				isOpen={isOpen}
				setLike={toggleLike}
				like={like}
				likes={likesActuals}
			/>
		</div>
	)
}

export default UserProfileCardPost;
