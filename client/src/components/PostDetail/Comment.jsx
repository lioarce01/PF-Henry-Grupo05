import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentAction } from "../../redux/reducers/dataBack/manageComments/manageCommentsActions";
import { getPostsByIdAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";

const Comment = ({ content, author, id, postId}) => {
  const dispatch = useDispatch();
  
  const deleteComment = () => {
    dispatch(deleteCommentAction(id))
            .then(() => dispatch(getPostsByIdAction(postId)));
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[100%] max-w-xl my-4 min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md mx-auto">
        <div className="flex flex-col   px-4 py-6">
          <div className=" w-full flex items-end justify-end">
            <button
              onClick={deleteComment}
              className="flex items-end justify-end"
            >
              <AiFillDelete />
            </button>
          </div>
          <div className="flex">
            <img
              className="object-cover mr-4 rounded-full shadow w-14 h-14"
              src={author.profilePic}
              alt="avatar"
            />
            <div className="">
              <Link className="object-cover w-12 h-12 mr-4 rounded-full shadow ">
                <div className="flex flex-col items-start">
                  <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                    {author.name}
                  </h2>
                  <small className="text-sm text-gray-700">{author.role}</small>
                </div>
              </Link>

              <p className="text-sm text-left text-gray-700">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;