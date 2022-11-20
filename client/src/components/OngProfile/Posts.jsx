import React, { useEffect, useState } from "react";
import CardPost from "../Home/CardPost";
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
				details?.posts && details?.posts.length ? "w-full" : "w-[360px]"
			} mt-10`}>
			{details.author.id === userDetail?.id && (
				<button
					onClick={() => setIsOpen(true)}
					className="my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300">
					Create Post
				</button>
			)}

			{details?.posts && details?.posts.length ? (
				<div className="flex items-center justify-end">
					<PostFilters />
				</div>
			) : null}
			<div className="">
				{details?.posts.length ? (
					details?.posts.map((post) => {
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
								shelter={details?.name}
							/>
						)
					})
				) : (
					<h2 className="mt-[40px] text-center">No posts available.</h2>
				)}
			</div>
		</div>
	)
}

export default Posts;
