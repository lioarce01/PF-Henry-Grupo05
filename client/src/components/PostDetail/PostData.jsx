import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  useUpdatePostLikesMutation,
  useUpdatePostMutation,
} from "../../redux/api/posts";
import { useAuth0 } from "@auth0/auth0-react";
const PostData = ({
  toogle,
  setToogle,
  details,
  postId,
  like,
  setLike,
  likes,
}) => {
  const [input, setInput] = useState({ id: postId, content: details.content });
  const [likesActuals, setLikesActuals] = useState(likes);
  const [updatePost, {}] = useUpdatePostMutation();
  const [updateLikes, {}] = useUpdatePostLikesMutation();
  const { getAccessTokenSilently } = useAuth0();
  const { isAuth } = useSelector((state) => state.localStorage.userState);

  const inputHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const toggleLike = () => {
    if (!isAuth) return toast.error("you are not logged in");
    setLike(!like);
    like
      ? setLikesActuals(likesActuals - 1)
      : setLikesActuals(likesActuals + 1);
    like
      ? updateLikes({ id: postId, likes: likes - 1 })
      : updateLikes({ id: postId, likes: likes + 1 });
  };

  const saveHandler = async () => {
    const accessToken = await getAccessTokenSilently();
    setToogle(true);
    updatePost({ accessToken, post: input });
    toast.success("post edited");
  };

  return (
    <>
      {details.image && (
        <img
          src={details.image}
          alt="post"
          className="object-cover w-full max-h-[40rem]"
        />
      )}

      <textarea
        className="w-full mb-1 text-xl font-semibold border border-gray-300 resize-none bg-inherit disabled:border-none "
        type="text"
        name="content"
        onChange={inputHandler}
        defaultValue={details.content}
        disabled={toogle}
        value={input.description}
        cols="1"
      />

      {!toogle && (
        <div className="flex flex-row-reverse justify-between flex-start">
          <button
            className="px-2 py-1 mt-1 border border-gray-400 rounded hover:bg-gray-300"
            onClick={saveHandler}
          >
            Save
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-between">
        <div className="flex items-center mr-2 space-x-2 text-sm text-gray-700">
          <button onClick={toggleLike}>
            <AiFillHeart className={like && "text-red-600"} />
          </button>
          <span>{likesActuals}</span>
        </div>
      </div>
    </>
  );
};

export default PostData;
