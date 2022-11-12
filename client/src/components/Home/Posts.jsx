import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";
import CardPost from "./CardPost";
import PostFilters from "./PostFilters";
import ModalCreatePost from "./ModalCreatePost";

const Posts = () => {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.managePosts.posts);

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  return (
    <div className="w-full min-h-[50rem] px-32 py-10 mb-4 mt-14 bg-slate-200">
      <div className="flex flex-col w-full">
        <div className="flex w-full">
        <button
          onClick={() => setIsOpen(true)}
          class="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
        >
          Create Post
        </button>
        </div>
        

        <div className="flex items-center justify-end">
          <PostFilters />
        </div>

      </div>
      <div className="">
        {posts &&
          posts.map((post) => {
            return (
              <CardPost
                key={post.id}
                id={post.id}
                image={post.author.profilePic}
                author={post.author.name}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
                comments={post.Comment.length}
                authorId={post.authorId}
              />
            );
          })}
      </div>
      <ModalCreatePost isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
};

export default Posts;
