import CardPost from "./CardPost";
import { useGetPostsQuery } from "../../redux/api/posts"
import { useSelector } from "react-redux";

function Posts ({ name, id }) {
	const { sort } = useSelector(state => state.localStorage.postState)
	const { data: posts } = useGetPostsQuery({ ...sort, id })

	return (
		<div className={`${posts && posts?.length ? "w-full" : "w-full"} xsm:mt-[20px] lg:mt-[30px] lg:justify-center lg:flex lg:flex-col`}>

			<div className={posts?.length 
				? "xsm:pr-[10px] sm:pr-[20px] pr-[60px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#E06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md h-[450px] lg:h-[700px] w-full" 
				: "w-full lg:h-[350px] lg:flex lg:flex-col lg:content-center"}>
				{posts?.length ? (
					posts?.map(post => {
						return (
							<CardPost
								postVideo={post.video}
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
								shelter={name}
							/>
						)
					})
				) : (
					<div className="mt-[40px] mb-[80px] justify-center text-center flex flex-row p-2 lg:h-full">
						<h2 className="text-[#838788] dark:text-[#b3b8b9] font-semibold text-lg sm:text-xl lg:text-2xl w-[70%] mt-[40px]">
							Start sharing your activities! Create a <strong className="text-[#FF7272]">New Post</strong> to encourage people to <strong className="text-[#FF7272]">Support</strong> your cause!</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Posts;
