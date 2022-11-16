
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardPost from "./CardPost";
import Spinner from "../Spinner/Spinner";
import PostFilters from "./PostFilters";
import ModalCreatePost from "./ModalCreatePost";
import { useGetPostsQuery } from "../../redux/api/posts";
import { selectPost } from "../../redux/slices/managePosts";
import { PuffLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react"

const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sort } = useSelector((state) => state.localStorage.postState);
  const { isAuthenticated } = useAuth0()

  const {
    data: posts,
    isLoading,
    error,
    isSuccess,
    isFetching,
    refetch,
  } = useGetPostsQuery(sort);
  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    refetch();
  }, []);

	// const handleScroll = () => {
	// 	if (
	// 		window.innerHeight + document.documentElement.scrollTop + 1 >=
	// 		document.documentElement.scrollHeight
	// 	) {
	// 		setPage((prev) => prev + 1)
	// 	}
	// }

	// useEffect(() => {
	// 	window.addEventListener("scroll", handleScroll)
	// }, [])

	return (
		<div className="w-full min-h-[50rem] px-32 py-10 mb-4 bg-[#EEEEE6]">
			<div className={`flex flex-col ${isLoading ? "w-full" : "w-[580px]"}`}>
				<div className="flex w-full">
					{isAuthenticated && (
						<button
							onClick={() => setIsOpen(true)}
							className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto">
							Create Post
						</button>
					)}
				</div>

        <div className={`flex items-center ${isFetching ? 'justify-between' : "justify-end"}`}>
          {isFetching && <PuffLoader color="#462312" loading size={60} />}
          <PostFilters />
        </div>
      </div>

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


export default Posts
