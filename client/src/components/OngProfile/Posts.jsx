import CardPost from "./CardPost";

function Posts({ details }) {

	return (
		<div className={`${details?.posts && details?.posts.length ? "w-9/12 lg:w-full" : "w-9/12 lg:w-full"} lg:mt-[30px] lg:justify-center lg:flex lg:flex-col`}>

			<div className={details?.posts.length 
				? "pr-[60px] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#E06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md h-[450px] lg:h-[700px] w-full" 
				: "w-full lg:h-[350px] lg:flex lg:flex-col lg:content-center"}>
				{details?.posts.length ? (
					details?.posts.map((post) => {
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
								shelter={details?.name}
							/>
						)
					})
				) : (
					<div className="mt-[40px] mb-[80px] justify-center text-center flex flex-row p-2 lg:h-full">
						<h2 className="text-black font-semibold text-lg sm:text-xl lg:text-2xl w-[70%]">
							Start sharing your activities! Create a <strong className="text-[#FF7272]">New Post</strong> to encourage people to <strong className="text-[#FF7272]">Support</strong> your cause!</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Posts;
