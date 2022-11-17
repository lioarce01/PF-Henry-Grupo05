import React, { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { AiFillDelete, AiFillEdit, AiOutlineEllipsis } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../../../redux/api/posts";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Comment = ({ content, author, id }) => {
  const [trigger, {}] = useDeleteCommentMutation();
  const [update] = useUpdateCommentMutation()
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const [commentContent, setCommentContent] = useState(content)
  const [toggle, setToggle] = useState(true)

  const handleChange = (e) => {
    setCommentContent(e.target.value)

  }

  const saveHandler =  async() => {
    const accessToken = await getAccessTokenSilently();
    update({accessToken, comment: {id, content: commentContent}})
    setToggle(!toggle)
  }

  const deleteComment = async () => {
    const accessToken = await getAccessTokenSilently();
    trigger({ accessToken, id });
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="w-[100%] max-w-xl my-4 md:min-w-[500px] bg-white border border-gray-200 rounded-lg shadow-md mx-auto">
        <div className="flex flex-col px-4 py-6">
          <div className="flex items-end justify-end w-full "></div>
          <div className="flex">
            <img
              className="object-cover mr-4 rounded-full shadow w-14 h-14"
              src={author.profilePic}
              alt="avatar"
            />
            <div className="w-full">
              <div className="flex flex-row items-start justify-between w-full mb-4">
                <div className="flex flex-col">
                  <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                    <Link className="object-cover w-12 h-12 mr-4 rounded-full">
                      {author.name}
                    </Link>
                  </h2>
                  <small className="text-sm text-gray-700">{author.role}</small>
                </div>
                <div className="">
                  {author.id === userDetail.id && (
                    <Menu as="div" className="relative z-50 outline-none">
                      <div className="flex items-center justify-center">
                        <Menu.Button className="inline-flex justify-center w-fit text-sm font-medium text-gray-700">
                          <AiOutlineEllipsis className="  p-1 px-2 text-xl font-bold text-black transition duration-300 rounded-full hover:bg-gray-200 w-8 h-8" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 rounded-sm">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  onClick={() => setToggle(!toggle)}
                                  className={classNames(
                                    active
                                      ? "bg-slate-200 text-gray-900"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  <div className="flex flex-row items-start justify-start">
                                    <span>
                                      <AiFillEdit className="mx-1 text-xl" />
                                    </span>
                                    <p className="mx-1">Edit</p>
                                  </div>
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  type="submit"
                                  onClick={() => deleteComment(id)}
                                  className={classNames(
                                    active
                                      ? "bg-red-600 text-white"
                                      : "text-gray-700",
                                    "block w-full px-4 py-2 text-left text-sm"
                                  )}
                                >
                                  <div className="flex flex-row items-start justify-start">
                                    <span>
                                      <AiFillDelete className="mx-1 text-xl" />
                                    </span>
                                    <p>Delete</p>
                                  </div>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
              <input onChange={handleChange} disabled={toggle}  className={`text-sm text-left text-gray-700 bg-white ${!toggle && "border border-gray-300"}`} type="text" value={commentContent}/>
              {!toggle && <button onClick={saveHandler} className="border border-gray-300 px-2 py-1 hover:bg-gray-300">Save</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
