import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPostsAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions"
import CardPost from "./CardPost"
import Spinner from "../Spinner/Spinner"
import PostFilters from "./PostFilters"
import ModalCreatePost from "./ModalCreatePost"

const Posts = () => {

	const [isOpen, setIsOpen] = useState(false)
	const [page, setPage] = useState(1)
	const dispatch = useDispatch()
	const posts = useSelector((state) => state.managePosts.posts)

	const closeModal = () => setIsOpen(false)

	useEffect(() => {
		dispatch(getPostsAction())
	}, [dispatch, page])

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			setPage((prev) => prev + 1)
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
	}, [])

	return (
		<div className="w-full min-h-[50rem] px-32 py-10 mb-4 bg-[#FAF2E7]">
			<div className={`flex flex-col ${posts.length ? "w-full" : "w-[580px]"}`}>
				<div className="flex w-full">
					<button
						onClick={() => setIsOpen(true)}
						className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto">
						Create Post
					</button>
				</div>

				<div className="flex items-center justify-end">
					<PostFilters />
				</div>
			</div>

			<div className="flex flex-col justify-center w-full min-w-full">

				{posts.length ? (
					posts.map((post) => {
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
				) : <Spinner />}
			</div>
			<ModalCreatePost isOpen={isOpen} closeModal={closeModal} />
		</div>
	)
}

export default Posts
