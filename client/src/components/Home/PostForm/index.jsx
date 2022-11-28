import React, { useState } from "react";
import ContentInput from "./ContentInput";
import UploadImage from "./UploadInput";
import { AiOutlineClose } from "react-icons/ai";
import { useAddNewPostMutation } from "../../../redux/api/posts";
import toast from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import VideoPlayer from "../../VideoPlayer";

const PostForm = ({ closeModal }) => {
	const [content, setContent] = useState("");
	const [url, setUrl] = useState([false, false]);
	const { getAccessTokenSilently } = useAuth0();
	const { userDetail } = useSelector((state) => state.localStorage.userState);

  const [addNewPost] = useAddNewPostMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    if (!url[0] || !content) return alert("content and file are needed");
    const newPost = {
      content,
      image: url[0] === "image" ? url[1] : "",
	  video: url[0] === "video" ? url[1] : "",
      shelterId: userDetail.Shelter[0].id,
      authorId: userDetail.id,
    };
    const myPromise = addNewPost({ accessToken, newPost });
    toast.promise(myPromise, {
      loading: "Creating post",
      success: "Post created",
      error: "There was an error creating post",
    });
    setContent("");
    setUrl([false, false]);
  };

	return (
		<div className="">
			<div className="sm:max-w-lg  max-w-full p-10 pt-6 bg-white rounded-xl z-10 ">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-[#FF7272]">Create Post</h2>
				</div>
				<form onSubmit={onSubmit} className="mt-5 space-y-3">
					<ContentInput content={content} setContent={setContent} />
					<UploadImage url={url} setUrl={setUrl} />
					{url[0] === "video" && <VideoPlayer public_id={url[1]} />}
					<p className="text-sm text-[#b2b3b4]">
						<span>File type: types of images</span>
					</p>
					<div>
						<button
							type="submit"
							className="my-5 w-[60%] mx-auto flex justify-center bg-[#FF7272] text-gray-100 p-3 rounded-full tracking-wide 
							font-semibold focus:outline-none focus:shadow-outline hover:bg-[#e76464] shadow-lg cursor-pointer transition ease-in duration-300">
							CREATE
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default PostForm;
