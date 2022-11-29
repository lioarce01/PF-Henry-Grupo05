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

const CardPost = ({ postVideo,image, author, content, profilePic, postImage, likes, createdAt, comments, id, authorId, authorRole, shelter, shelterId }) => {
	const dispatch = useDispatch()
	const { getAccessTokenSilently } = useAuth0()
	const { isAuth } = useSelector((state) => state.localStorage.userState)
	
	const [likesActuals, setLikesActuals] = useState(likes)
	const { likes: userLikes } = useSelector(selectUser)
	const [updateLikes] = useUpdatePostLikesMutation()

	const myLike = () => {
		if (userLikes?.length < 1) return false
		if (userLikes?.includes(id)) return true
		return false
	}

	const [like, setLike] = useState(myLike)
	
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)
	
	const toggleLike = async () => {
		if (!isAuth) return toast.error("you are not logged in");

		setLike(!like)

		like
			? setLikesActuals(likesActuals - 1)
			: setLikesActuals(likesActuals + 1)

		const accessToken = await getAccessTokenSilently()

		like
			? updateLikes({ post: { id, likes: likesActuals - 1 }, accessToken })
			: updateLikes({ post: { id, likes: likesActuals + 1 }, accessToken })

		like
			? dispatch(removeLikeAction(id))
			: dispatch(addLikeAction(id))
	};

	useEffect(() => {
		setLike(like)
	}, [like]);

	useEffect(() => {
		setLikesActuals(likes)
	}, [likes]);

	if (!image) image = "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY"

	return (
		<div className="flex flex-col items-center first:mt-0 mt-2 sm:mt-4 lg:w-full lg:min-h-[450px] lg:max-h-fit lg:mt-[30px] rounded-[30px] bg-white dark:bg-[#1B1A1F] py-[20px]">
			<div className="sm:w-[400px] w-[270px] my-4 lg:w-11/12 lg:h-full bg-white dark:bg-[#1B1A1F] rounded-[20px] border dark:border-[#514d58]">
				<div className="flex flex-col mx-auto  m-[30px] lg:m-0 rounded-[30px] px-[20px] py-[20px] w-full">
					<div className="flex flex-row lg:items-center">
						<img
							className="object-cover mr-4 rounded-[20px] shadow w-11 h-11 sm:w-14 sm:h-14 dark:outline outline-offset-2 outline-2 outline-[#514d58]"
							src={profilePic}
							alt="avatar"
						/>

						<div className="flex flex-col items-start mt-[-5px] lg:mt-0">
							<Link to={`/users/${authorId}`}>
								<h2 className="flex items-center justify-center mb-0 sm:mb-1 text-sm sm:text-xl lg:mb-0 font-bold text-[#474747] dark:text-[#F0EEEE] border-b border-[#fffcf7] dark:border-[#1B1A1F] hover:scale-[1.05] transition duration-300">
									{author}{" "}
									{authorRole === "Admin" && (
										<MdAdminPanelSettings className="ml-2 text-yellow-500" />
									)}
								</h2>
							</Link>
							
							<div className="flex flex-row mt-[5px]">
								<Link to={`/${shelterId}/profile`}>
									<p className="px-2 py-1 mb-2 lg:mb-0 flex text-xs sm:text-sm lg:text-sm font-semibold text-white transition duration-300 bg-[#FF7272] dark:bg-[#E06161] rounded-lg hover:scale-[1.05]">
										{shelter}
									</p>
								</Link>
								<small className="ml-[10px] px-2 py-1 h-[24px] sm:h-[28px] flex text-xs sm:text-sm text-white font-semibold rounded-md bg-[#6371f1] dark:bg-[#7F8AF3]">
									{getTimeAgo(createdAt)}
								</small>
							</div>
						</div>
					</div>

					<div className="flex flex-col w-cover py-[20px] px-[20px] lg:pl-[70px] lg:pr-[20px] lg:pt-[10px] lg:pb-1 font-normal text-justify text-gray-900 dark:text-[#F0EEEE] text-md ">
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

					<div>
						{postImage && <img
							src={postImage}
							alt="post"
							className="pb-object-cover w-[400px] mt-[20px] mb-[30px] flex mx-auto rounded-[20px]"
						/>}
						{postVideo && <VideoPlayer public_id={postVideo}/>}
					</div>

					<div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-400">
						<div className="flex mr-4 text-sm text-gray-700">
							{like ? (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border group hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300e"
									onClick={toggleLike}>

									<p className="mr-[7px] mb-[1px] font-[800] dark:text-white dark:group-hover:text-[#27242C]">{likesActuals}</p>
									<AiFillHeart className="w-5 h-5 text-[#FF7272]" />
								</button>
							) : (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border group hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300"
									onClick={toggleLike}>

									<p className="mr-[7px] mb-[1px] font-[800] dark:text-white dark:group-hover:text-[#27242C]">{likesActuals}</p>
									<AiOutlineHeart className="w-5 h-5 text-[#FF7272]" />
								</button>
							)}
						</div>

						<div className="flex mr-2 text-sm text-gray-700">
							<button
								onClick={() => setIsOpen(true)}
								className="flex flex-row items-center pr-4 border border-[#fffcf7] group hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300">
									
								<p className="mr-[7px] mb-[1px] font-[800] dark:text-white dark:group-hover:text-[#27242C]">{comments}</p>
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
	);
};

export default CardPost;
