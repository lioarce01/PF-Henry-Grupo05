import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../../redux/reducers/dataBack/manageComments/manageCommentsActions";
import { getPostsByIdAction } from "../../../redux/reducers/dataBack/managePosts/managePostsActions";



const AddComment = ({ postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAction({
      content,
      authorId: "636cfde16804f7dc836bda73",
      postId: postId
    })
    ).then(() => dispatch(getPostsByIdAction(postId)));
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={onSubmit} className="flex justify-center">
      <div className="mb-3 w-[100%] md:w-[80%] xl:w-[60%]">
        <h4
          htmlFor="exampleFormControlTextarea1"
          className="inline-block mb-2 text-gray-700"
        >
          Add comment
        </h4>
        <textarea
          onChange={handleChange}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-[#FAF2E7] bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700  focus:border-gray-600 focus:outline-none"
          rows="3"
        ></textarea>
        <div className="flex items-end justify-end">
          <button className="px-2 py-1 mt-1 border border-gray-400 rounded hover:bg-gray-300">
            Add comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
