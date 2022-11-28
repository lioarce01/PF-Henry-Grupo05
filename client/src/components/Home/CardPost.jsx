import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdAdminPanelSettings, MdComment } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { getTimeAgo } from "../../utils";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect } from "react";
import ModalPostDetail from "./Modals/ModalPostDetail";
import ShowMoreText from "react-show-more-text";
import { useUpdatePostLikesMutation } from "../../redux/api/posts";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { selectUser } from "../../redux/slices/manageUsers";
import { addLikeAction, removeLikeAction } from "../../redux/slices/manageUsers/actions";
import VideoPlayer from "../VideoPlayer";

const CardPost = ({
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
	const [likesActuals, setLikesActuals] = useState(likes);
	const dispatch = useDispatch()
	const myLike = () => {
		if (userLikes?.length < 1) return false
		if (userLikes?.includes(id)) return true
		return false
	}
	const [like, setLike] = useState(myLike);
	const [isOpen, setIsOpen] = useState(false);
	const { isAuth } = useSelector((state) => state.localStorage.userState);
	const closeModal = () => setIsOpen(false);

	const { getAccessTokenSilently } = useAuth0()

	const [updateLikes, { }] = useUpdatePostLikesMutation();

	const toggleLike = async () => {
		if (!isAuth) return toast.error("you are not logged in");

		setLike(!like);
		like
			? setLikesActuals(likesActuals - 1)
			: setLikesActuals(likesActuals + 1);
		const accessToken = await getAccessTokenSilently()
		like
			? updateLikes({ post: { id, likes: likesActuals - 1 }, accessToken })
			: updateLikes({ post: { id, likes: likesActuals + 1 }, accessToken })

		like
			? dispatch(removeLikeAction(id))
			: dispatch(addLikeAction(id))
	};

	useEffect(() => {
		setLike(like);
	}, [like]);

	useEffect(() => {
		setLikesActuals(likes);
	}, [likes]);

	if (!image)
		image = "https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY";

	return (
		<div className="flex flex-col">
			<div className="w-full my-4 bg-white dark:bg-[#1b1a1f] rounded-[30px] px-[25px]">
				<div className="flex flex-col mx-auto border dark:border-[#38353d] m-[30px] rounded-[20px] px-[20px] py-[20px] ">
					<div className="flex flex-row">
						<img
							className="object-cover mr-4 rounded-[20px] shadow w-14 h-14 dark:outline dark:outline-offset-2 dark:outline-2 dark:outline-[#38353d]"
							src={profilePic}
							alt="avatar"
						/>

						<div className="flex flex-col items-start mt-[-5px]">
							<Link to={`/users/${authorId}`}>
								<h2 className="flex items-center justify-center mb-1 text-lg font-bold text-[#474747] dark:text-[#dcdedf] border-b border-[#fffcf7] dark:border-[#1b1a1f] hover:border-black dark:hover:border-[#dcdedf] transition duration-300">
									{author}{" "}
									{authorRole === "Admin" && (
										<MdAdminPanelSettings className="ml-2 text-yellow-500" />
									)}
								</h2>
							</Link>
							
							<div className="flex flex-row">
								<Link to={`/${shelterId}/profile`}>
									<p className="px-2 py-1 mb-2 flex text-sm font-semibold text-white transition duration-300 bg-red-400 dark:bg-[#e06161] rounded-lg hover:shadow-md hover:shadow-red-400">
										{shelter}
									</p>
								</Link>
								<small className="ml-[10px] px-2 py-1 h-[28px] flex text-sm text-white font-semibold rounded-md bg-[#6D91E9] dark:bg-[#7f8af3]">
									{getTimeAgo(createdAt)}
								</small>
							</div>
						</div>
					</div>

					<div className="flex flex-col w-full py-[20px] px-[70px] font-normal text-justify text-gray-900 dark:text-[#dad6d6] text-md">
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
						{postVideo && <VideoPlayer public_id={postVideo} />}
						{postImage && <img
							src={postImage}
							alt="post"
							className="pb-object-cover w-[400px] mt-[20px] mb-[30px] flex mx-auto rounded-[20px]"
						/>}
					</div>

					<div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-400 dark:border-[#38353d]">
						<div className="flex mr-4 text-sm text-gray-700">
							{like ? (
								<button
									className="flex flex-row items-center border border-[#fffcf7] dark:border-[#38353d] hover:border dark:text-[#f0eeee] dark:hover:text-[#38353d] hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300e"
									onClick={toggleLike}>

									<p className="mr-[7px] mb-[1px] font-[800]">{likesActuals}</p>
									<AiFillHeart className="w-5 h-5 text-[#FF7272]" />
								</button>
							) : (
								<button
									className="flex flex-row items-center border border-[#fffcf7] dark:border-[#38353d] dark:text-[#f0eeee] dark:hover:text-[#38353d] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300"
									onClick={toggleLike}>

									<p className="mr-[7px] mb-[1px] font-[800]">{likesActuals}</p>
									<AiOutlineHeart className="w-5 h-5 text-[#FF7272]" />
								</button>
							)}
						</div>

						<div className="flex mr-2 text-sm text-gray-700">
							<button
								onClick={() => setIsOpen(true)}
								className="flex flex-row items-center pr-4 border border-[#fffcf7] dark:border-[#38353d] dark:text-[#f0eeee] dark:hover:text-[#38353d] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300">
									
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
	);
};

export default CardPost;
