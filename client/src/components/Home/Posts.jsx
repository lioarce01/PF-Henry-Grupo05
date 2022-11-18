import { useEffect } from "react"
import { useSelector } from "react-redux"
import CardPost from "./CardPost"
import Spinner from "../Spinner/Spinner"
import PostFilters from "./PostFilters"
import { useGetPostsQuery } from "../../redux/api/posts"
import { useAuth0 } from "@auth0/auth0-react"
import { PuffLoader } from "react-spinners"

const Posts = () => {
	const { sort } = useSelector((state) => state.localStorage.postState)
	const { isAuthenticated } = useAuth0()

	const {
		data: posts,
		isLoading,
		isSuccess,
		isFetching,
		refetch,
	} = useGetPostsQuery(sort)

	//consolog of shelter name of the post
	// console.log("name: ", posts[0].shelter.name)

	useEffect(() => {
		refetch()
	}, [])

	return (
		<div className="w-auto h-screen min-h-[50rem] mt-[20px] px-6 mb-4 bg-none overflow-y-scroll scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
			<div className="flex flex-col justify-center w-full min-w-full">
				{isLoading ? (
					<div className="mt-[140px]">
						<Spinner />
					</div>
				) : null}
				{isSuccess &&
					posts.map((post) => {
						return (
							<CardPost
								key={post.id}
								id={post.id}
								profilePic={post.author.profilePic}
								postImage={post.image}
								author={post.author.name}
								shelter={post.shelter.name}
								shelterId={post.shelter.id}
								authorRole={post.author.role}
								content={post.content}
								likes={post.likes}
								createdAt={post.createdAt}
								comments={post.Comment.length}
								authorId={post.authorId}
							/>
						)
					})}
			</div>
		</div>
	)
};

export default Posts;
