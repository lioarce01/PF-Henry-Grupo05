import React, { useState } from "react"
import { Link } from "react-router-dom"
import { BiCommentDetail } from "react-icons/bi"
import { AiFillHeart } from "react-icons/ai"
import { getTimeAgo } from "../../utils"
import { AiOutlineHeart } from "react-icons/ai"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { updatePostLikesAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions"
import ModalPostDetail from "./ModalPostDetail"

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
}) => {
	const [likesActuals, setLikesActuals] = useState(likes)
	const [like, setLike] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)

	const dispatch = useDispatch()
	const toggleLike = () => {
		setLike(!like)
		like ? setLikesActuals(likesActuals - 1) : setLikesActuals(likesActuals + 1)
		like
			? dispatch(updatePostLikesAction({ id, likes: likesActuals - 1 }))
			: dispatch(updatePostLikesAction({ id, likes: likesActuals + 1 }))
	}

	useEffect(() => {
		setLike(like)
	}, [like])

	useEffect(() => {
		setLikesActuals(likes)
	}, [likes])

	if (!image) {
		image =
			"https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY"
	}

	return (
		<div className="flex flex-col">
			<div className="w-[100%] max-w-xl my-4 md:min-w-[500px] bg-[#fffcf7] border border-[#FAF2E7] rounded-lg">
				<div className="flex flex-col px-4 py-4">
					<div className="flex flex-row">
						<img
							className="object-cover mr-4 rounded-full shadow w-14 h-14"
							src={profilePic}
							alt="avatar"
						/>
						<div className="flex flex-col items-start">
							<Link
								to={`/users/${authorId}`}
								className="text-lg font-semibold text-gray-700">
								<h2 className="mb-1 text-lg font-bold text-gray-800 border-b border-[#fffcf7] hover:border-black transition duration-200">
									{author}
								</h2>
							</Link>
							<small className="px-2 py-0.5 font-normal text-sm text-[#585858] rounded-md bg-[#FAF2E7]">
								{getTimeAgo(createdAt)}
							</small>
						</div>
					</div>
					<div className="flex flex-col w-full"></div>
					<p className="w-full py-4 font-normal text-left text-gray-900 text-md">
						{content}
					</p>
					<div>
						<img
							src={postImage}
							alt="post"
							className="object-cover w-full max-h-[40rem] mb-2 rounded-md"
						/>
					</div>
					<div className="flex flex-row justify-end w-full items-">
						{comments > 1 ? (
							<p className="p-1 text-sm text-gray-700">{comments} comments</p>
						) : comments === 1 ? (
							<p className="p-1 text-sm text-gray-700">{comments} comment</p>
						) : null}
						{likes > 1 ? (
							<p className="p-1 text-sm text-gray-700">{likesActuals} likes</p>
						) : likes === 1 ? (
							<p className="p-1 text-sm text-gray-700">{likesActuals} like</p>
						) : null}
					</div>
					<div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-400">
						<div className="flex mr-4 text-sm text-gray-700">
							{like ? (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300e"
									onClick={toggleLike}>
									<AiFillHeart className="w-5 h-5 text-red-600" />
									<p className="pl-1 text-lg font-semibold text-gray-800">
										Like
									</p>
								</button>
							) : (
								<button
									className="flex flex-row items-center border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300"
									onClick={toggleLike}>
									<AiOutlineHeart className="w-5 h-5" />
									<p className="pl-1 text-lg font-semibold text-gray-800">
										Like
									</p>
								</button>
							)}
						</div>
						<div className="flex mr-2 text-sm text-gray-700">
							<button
								onClick={() => setIsOpen(true)}
								className="flex flex-row items-center pr-4 border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300">
								<BiCommentDetail className="w-5 h-5" />
								<button
									className="pl-2 text-lg font-semibold"
									onClick={() => setIsOpen(true)}>
									Comment
								</button>
							</button>
						</div>
					</div>
				</div>
			</div>
			<ModalPostDetail id={id} closeModal={closeModal} isOpen={isOpen} />
		</div>
	)
}

export default CardPost
