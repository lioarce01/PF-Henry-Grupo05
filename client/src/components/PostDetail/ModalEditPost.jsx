import React from "react";
import { AiFillDelete, AiFillEdit, AiOutlineEllipsis } from "react-icons/ai";
import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useDeletePostMutation } from "../../redux/api/posts";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const ModalEditPost = ({ authorId, setToogle, postId, closeModal }) => {
  const [trigger, {}] = useDeletePostMutation();
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const { getAccessTokenSilently } = useAuth0();

  const deletePost = async () => {
    const accessToken = await getAccessTokenSilently();
    const myPromise = trigger({ accessToken, id: postId });
    toast.promise(myPromise, {
      loading: "deleting post",
      success: "post deleted",
      error: "error deleting post",
    });
    closeModal();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div className="relative z-50 inline-block text-right">
      {authorId === userDetail.id || userDetail.role === "Admin" ? (
        <Menu
          as="div"
          className="relative z-50 inline-block text-left"
        >
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-800 rounded-md shadow-sm hover:bg-[#ff72728a] transition duration-300 dark:text-[#AFB3B4] dark:hover:bg-[#afb3b4b0] dark:hover:text-[#F0EEEE]">
              <AiOutlineEllipsis className="w-8 h-8 " aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-[#27242C]">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setToogle((toogle) => !toogle)}
                      type="submit"
                      className={classNames(
                        active ? "bg-slate-200 text-gray-900 dark:bg-[#AFB3B4]" : "text-gray-700 dark:text-[#AFB3B4]",
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
                      onClick={() => deletePost(postId)}
                      className={classNames(
                        active ? "bg-red-600 text-white" : "text-gray-700 dark:text-[#AFB3B4]",
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
      ) : null}
    </div>
  );
};

export default ModalEditPost;
