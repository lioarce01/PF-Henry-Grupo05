import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ContentInput from "./ContentInput";
import { createPostAction } from "../../../redux/reducers/dataBack/managePosts/managePostsActions";
import UploadImage from "./UploadInput";
import { AiOutlineClose } from "react-icons/ai";

const shelterId = "636bccfcce65cefec651aeca";
const authorId = "636c0a4f1e78d75d8edfae92";

const PostForm = ({ closeModal }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!image || !content) return alert("content and image are needed");
    const post = { content, image, shelterId, authorId };
    dispatch(createPostAction(post));
    closeModal()
  };

  return (
    <div className="">
      <div className="sm:max-w-lg  max-w-full p-10 bg-[#FAF2E7] rounded-xl z-10">
        <div className="flex items-center justify-end">
          <button onClick={closeModal}>
            <AiOutlineClose className="w-6 h-6 flex " />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#462312]">Create Post</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-3">
          <ContentInput content={content} setContent={setContent} />
          <UploadImage image={image} setImage={setImage} />
          <p className="text-sm text-gray-300">
            <span>File type: types of images</span>
          </p>
          <div>
            <button
              type="submit"
              className="my-5 w-[60%] mx-auto flex justify-center bg-[#ca7c62] text-gray-100 p-3  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
