import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import { useAddNewCommentMutation } from "../../../redux/api/posts";

const AddComment = ({ postId }) => {
  const [content, setContent] = useState("");
  const [addNewComment, { isLoading }] = useAddNewCommentMutation();
  const { getAccessTokenSilently } = useAuth0();
  const { isAuth, userDetail } = useSelector(
    (state) => state.localStorage.userState
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) return toast.error("you are not logged in");
    const accessToken = await getAccessTokenSilently();
    addNewComment({
      accessToken,
      comment: { content, authorId: userDetail.id, postId },
    });
    setContent("");
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
		<>
			<form onSubmit={onSubmit} className="flex justify-center">
				<div className="mb-3 w-[100%] md:w-[80%] xl:w-[90%]">
					<textarea
						onChange={handleChange}
						className="form-control block border border-gray-300 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding rounded-xl transition ease-in-out outline-none"
						rows="3"></textarea>
					<div className="flex items-end justify-end">
						<button className="px-4 py-2 mt-2 font-bold text-white transition duration-300 bg-red-400 rounded-xl hover:bg-red-500">
							Comment
						</button>
					</div>
				</div>
			</form>
			{isLoading && (
				<div className="w-full">
					<PuffLoader className="mx-auto" color="#462312" loading size={60} />
				</div>
			)}
		</>
	)
};

export default AddComment;
