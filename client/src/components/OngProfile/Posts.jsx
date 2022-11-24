import React, { useEffect, useState } from "react";
import CardPost from "./CardPost";
import PostFilters from "../Home/PostFilters";
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'

function Posts({ details, setIsOpen}) {
  const {id} = useParams();
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const [render, setRender] = useState(true)

  useEffect(()=>{
    setRender(!render)
  },[userDetail])

  console.log("details: ", details)

	return (
		<div
			className={`${
				details?.posts && details?.posts.length ? "w-9/12 lg:w-full" : "w-9/12 lg:w-full"
			} lg:mt-2 lg:justify-center lg:flex lg:flex-col`}>
			{details.author.id === userDetail?.id && (
				<button
					onClick={() => setIsOpen(true)}
					className="my-2 mx-auto w-full lg:w-[60%] bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  
					rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] 
					shadow-lg cursor-pointer transition ease-in duration-300">
					Create Post
				</button>
			)}

			{details?.posts && details?.posts.length ? (
				<div className="flex items-center justify-end text-xs sm:text-lg">
					<PostFilters />
				</div>
			) : null}
			<div className={details?.posts.length ?"overflow-y-scroll h-[450px] lg:h-[350px] w-full":"w-full lg:h-[350px] lg:flex lg:flex-col lg:content-center"}>
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
						<h2 className="text-black font-semibold text-lg sm:text-xl lg:text-2xl indent-4">
						<strong className="text-[#d45f37]">Start</strong> sharing your activities! <strong className="text-[#d45f37]">Create</strong> a <strong className="text-[#d45f37]">New Post</strong> to encourage People <strong className="text-[#d45f37]">Support</strong> your cause!</h2>
					</div>
				)}
			</div>
		</div>
	)
}

export default Posts;
