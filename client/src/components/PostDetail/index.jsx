import React, { useState } from "react";
import Comments from "./Comments";
import AuthorData from "./AuthorData";
import PostData from "./PostData";
import { useGetPostByIdQuery } from "../../redux/api/posts";
import VideoPlayer from "../VideoPlayer";
import { useSelector } from "react-redux";
import ModalEditPost from "./ModalEditPost";

const Post = ({ postId, closeModal, setLike, like, likes }) => {
	const [toogle, setToogle] = useState(true);

	const { data: details, isFetching } = useGetPostByIdQuery(postId);

	const { darkmode } = useSelector(state => state.localStorage.manageTheme)

	if (!details || Object.keys(details).length === 0) return;

	return (
		<div className={darkmode && `dark`}>
			<div className="flex flex-row bg-white rounded-xl shadow-md w-[75vw] max-h-[94vh] dark:bg-[#3b3742]">
			<div className="w-[50vw] my-auto">
					{details.video && <VideoPlayer public_id={details.video}/>}
					{details.image && (
						<img
							src={details.image}
							alt="post"
							className="object-cover object-center w-full"
						/>
					)}
				</div>
				<div className="pt-4 w-[40%]">
					<div>
						<div className="px-4 flex flex-row justify-between">
							<div>
								<AuthorData details={details} />
							</div>
							<div>
								<ModalEditPost
									authorId={details.author.id}
									closeModal={closeModal}
									setToogle={setToogle}
									postId={postId}
								/>
							</div>
						</div>
						<div className="overflow-y-scroll h-[40rem] scrollbar-thin scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#E06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
							<div className="px-4">
								<PostData
									setToogle={setToogle}
									isFetching={isFetching}
									likes={likes}
									closeModal={closeModal}
									toogle={toogle}
									postId={postId}
									details={details}
									setLike={setLike}
									like={like}
								/>
							</div>
							<div>
								<Comments
									postAuthorId={details.authorId}
									isFetching={isFetching}
									postId={postId}
									details={details}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		// <div className="flex flex-col w-[50rem] mt-[80px] p-6 space-y-6 overflow-hidden rounded-lg shadow-md  bg-[#FAF2E7] border border-gray-200 mx-auto">
		//   <div className="flex flex-row space-x-4">
		//     <AuthorData details={details} />
		//     <ModalEditPost
		//       authorId={details.author.id}
		//       closeModal={closeModal}
		//       setToogle={setToogle}
		//       postId={postId}
		//     />
		//   </div>

		//   <PostData
		//     setToogle={setToogle}
		//     isFetching={isFetching}
		//     likes={likes}
		//     closeModal={closeModal}
		//     toogle={toogle}
		//     postId={postId}
		//     details={details}
		//     setLike={setLike}
		//     like={like}
		//   />
		//   <Comments isFetching={isFetching} postId={postId} details={details} />
		// </div>
	)
};

export default Post;