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

  return (
    <div
      className={`${
        details?.posts && details?.posts.length ? "w-full" : "w-[360px]"
      } min-h-[50rem] py-10 mb-4 mt-14`}
    >
      {details.author.id === userDetail?.id && <button
        onClick={() => setIsOpen(true)}
        className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto flex"
      >
        Create Post
      </button>}

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
              />
            );
          })
        ) : (
          <h2 className="mt-[40px] text-center">No posts available.</h2>
        )}
      </div>
    </div>
  );
}

export default Posts;
