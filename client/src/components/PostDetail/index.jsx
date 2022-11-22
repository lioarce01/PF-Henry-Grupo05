import React, { useState } from "react";
import ModalEditPost from "./ModalEditPost";
import Comments from "./Comments";
import AuthorData from "./AuthorData";
import PostData from "./PostData";
import { useGetPostByIdQuery } from "../../redux/api/posts";

const Post = ({ postId, closeModal, setLike, like, likes }) => {
  const [toogle, setToogle] = useState(true);

  const { data: details, isFetching } = useGetPostByIdQuery(postId);
  
  if (!details || Object.keys(details).length === 0) return;

	return (
		<div>
			<div className="flex flex-row bg-white rounded-xl shadow-md w-[65rem] max-h-[50rem]">
				<div className="w-[60%] py-20">
					{details.image && (
						<img
							src={details.image}
							alt="post"
							className="object-cover w-full max-h-[40rem]"
						/>
					)}
				</div>
				<div className="pt-4 w-[40%]">
					<div>
						<div className="px-4">
							<AuthorData details={details} />
						</div>
						<div className="overflow-y-scroll h-[40rem]">
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