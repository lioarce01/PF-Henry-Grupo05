import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useSelector } from "react-redux"
import ShowMoreText from "react-show-more-text"
import toast, { Toaster } from "react-hot-toast"
import {
	useUpdatePostLikesMutation,
	useUpdatePostMutation,
} from "../../redux/api/posts"
import { useAuth0 } from "@auth0/auth0-react"
import { MdComment } from "react-icons/md"
const PostData = ({
	toogle,
	setToogle,
	details,
	postId,
	like,
	setLike,
	likes,
}) => {
	const [input, setInput] = useState({ id: postId, content: details.content })
	const [likesActuals, setLikesActuals] = useState(likes)
	const [updatePost, {}] = useUpdatePostMutation()
	const [updateLikes, {}] = useUpdatePostLikesMutation()
	const { getAccessTokenSilently } = useAuth0()
	const { isAuth } = useSelector((state) => state.localStorage.userState)

	const inputHandler = (e) => {
		e.preventDefault()
		setInput({ ...input, [e.target.name]: e.target.value })
	}

	//rows exactly equal to content length to avoid scroll bar
	const rows = details.content.length / 35

	console.log("postdata: ", details)

	const toggleLike = () => {
		if (!isAuth) return toast.error("you are not logged in")
		setLike(!like)
		like ? setLikesActuals(likesActuals - 1) : setLikesActuals(likesActuals + 1)
		like
			? updateLikes({ id: postId, likes: likes - 1 })
			: updateLikes({ id: postId, likes: likes + 1 })
	}

	const saveHandler = async () => {
		const accessToken = await getAccessTokenSilently()
		setToogle(true)
		updatePost({ accessToken, post: input })
		toast.success("post edited")
	}

	return (
		<div className="pt-2">
			<div className="flex flex-col dark:text-[#F0EEEE] h-auto">
				<ShowMoreText
					lines={3}
					more="Show more"
					less="Show less"
					className="content-css"
					anchorClass="show-more-less-clickable"
					expanded={false}
					truncatedEndingComponent={"... "}>
					<textarea
						className="w-full mb-1 border border-gray-300 resize-none bg-inherit disabled:border-none"
						type="text"
						name="content"
						onChange={inputHandler}
						defaultValue={details.content}
						disabled={toogle}
						value={input.description}
						cols="10"
						rows={rows}
					/>
				</ShowMoreText>
			</div>

			{!toogle && (
				<div className="flex flex-row-reverse justify-between flex-start">
					<button
						className="px-2 py-1 mt-1 border border-gray-400 rounded hover:bg-gray-300"
						onClick={saveHandler}>
						Save
					</button>
				</div>
			)}

			<div className="flex flex-row items-center justify-start w-full py-2 mt-4 border-t border-gray-200 dark:border-[#38353d]">
				<div className="flex px-3 py-2 space-x-1 text-sm text-gray-500 transition duration-300 rounded-md cursor-pointer hover:bg-[#ff727260] dark:text-[#857d91] dark:hover:bg-[#afb3b486] dark:hover:text-[#F0EEEE]">
					<span className={like ? `font-bold text-black dark:text-[#b5afc0]` :`font-bold text-gray-500 dark:text-[#857d91]`}>{likesActuals}</span>
					<button onClick={toggleLike}>
						{like ? (
							<AiFillHeart className="w-5 h-5 text-red-500" />
						) : (
							<AiOutlineHeart className="w-5 h-5 text-red-500" />
						)}
					</button>
				</div>
				<div className="flex px-3 py-2 mr-2 text-sm text-gray-500 transition duration-300 rounded-md dark:text-[#857d91]">
					<p className="mr-[7px] mb-[1px] font-bold">
						{details.Comment?.length}
					</p>
					<MdComment className="w-5 h-5 text-[#6D91E9]" />
				</div>
			</div>
		</div>
	)
}

export default PostData;
