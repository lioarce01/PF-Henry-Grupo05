import React, { useEffect, useState } from "react"
import { AiFillHeart } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { updatePostAction, updatePostLikesAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions"

const PostData = ({ toogle, details, postId, closeModal, like, setLike }) => {
	const [input, setInput] = useState({ id: postId, content: details.content })
	const dispatch = useDispatch()
	const [likeDisplay, setLikeDisplay] = useState(details.likes)
	console.log(like)
	const inputHandler = (e) => {
		e.preventDefault()
		setInput({ ...input, [e.target.name]: e.target.value })
	}

	const saveHandler = () => {
		dispatch(updatePostAction(input))
		closeModal()
	}

	const fixDisplay = () => {
		if (like) setLikeDisplay(likeDisplay-1)
		else setLikeDisplay(likeDisplay+1)
	}

	/*useEffect(() => {
		like
			? dispatch(updatePostLikesAction({ id: postId, likes: details.like - 1 }))
			: dispatch(updatePostLikesAction({ id: postId, likes: details.like + 1 }))
	}, [like])*/

	return (
		<>
			{details.image && (
				<img
					src={details.image}
					alt="post"
					className="object-cover w-full max-h-[40rem]"
				/>
			)}

			<textarea
				className="w-full mb-1 text-xl font-semibold border border-gray-300 resize-none bg-inherit disabled:border-none "
				type="text"
				name="content"
				onChange={inputHandler}
				defaultValue={details.content}
				disabled={toogle}
				value={input.description}
				cols="1"
			/>

			{! toogle && (
				<div className="flex flex-row-reverse justify-between flex-start">
					<button
						className="px-2 py-1 mt-1 border border-gray-400 rounded hover:bg-gray-300"
						onClick={saveHandler}>
						Save
					</button>
				</div>
			)}

			<div className="flex flex-wrap justify-between">
				<div className="flex items-center mr-2 space-x-2 text-sm text-gray-700">
					<button onClick={fixDisplay}>
						<AiFillHeart onClick={setLike} className={like && "text-red-600"} />
					</button>
					<span>{likeDisplay}</span>
					{console.log("Details likes:", details.likes)}
					{console.log("LikeDisplay:", likeDisplay)}
				</div>
			</div>
		</>
	)
}

export default PostData
