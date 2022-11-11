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
      <div className="w-[100%] max-w-xl my-4 min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md mx-auto">
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
                  <div>
                    <div className="fixed inset-0 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={openModal}
                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                      >
                        Open dialog
                      </button>
                    </div>

                    <Transition appear show={isOpen} as={Fragment}>
                      <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                          <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 scale-95"
                              enterTo="opacity-100 scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 scale-100"
                              leaveTo="opacity-0 scale-95"
                            >
                              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                  as="h3"
                                  className="text-lg font-medium leading-6 text-gray-900"
                                >
                                  Payment successful
                                </Dialog.Title>
                                <div className="mt-2">
                                  <p className="text-sm text-gray-500">
                                    Your payment has been successfully submitted. We’ve sent
                                    you an email with all of the details of your order.
                                  </p>
                                </div>

                                <div className="mt-4">
                                  <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    onClick={closeModal}
                                  >
                                    Got it, thanks!
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition>
                  </div>
                </div>

              <p className="text-sm text-left text-gray-700">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;