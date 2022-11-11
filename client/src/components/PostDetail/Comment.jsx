import React, { useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCommentAction } from "../../redux/reducers/dataBack/manageComments/manageCommentsActions";
import { getPostsByIdAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";

const Comment = ({ content, author, id, postId}) => {
  let [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
  const deleteComment = () => {
    dispatch(deleteCommentAction(id))
            .then(() => dispatch(getPostsByIdAction(postId)));
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[100%] max-w-xl my-4 md:min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md mx-auto">
        <div className="flex flex-col px-4 py-6">
          <div className="flex items-end justify-end w-full ">
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
            <div className="w-full">
              <div className="flex flex-row items-start justify-between w-full mb-4">
                <div> 
                  <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                    <Link className="object-cover w-12 h-12 mr-4 rounded-full">
                      {author.name}
                    </Link>
                  </h2>
                  <small className="text-sm text-gray-700">{author.role}</small>
                </div>
             </div>
                <p className="text-sm text-left text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut odit hic! Id, rerum quas exercitationem hic perferendis neque minus minima eos aliquid esse suscipit incidunt vero facere, optio nam.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;