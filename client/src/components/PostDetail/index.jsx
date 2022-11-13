import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByIdAction, cleanDetailsAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";
import { selectPost } from "../../redux/reducers/dataBack/managePosts/managePostsSlice";

import ModalEditPost from "./ModalEditPost";
import Comments from "./Comments";
import AuthorData from "./AuthorData";
import PostData from "./PostData";

const Post = ({ postId, closeModal, setLike, like }) => {

  const { details } = useSelector(selectPost);
  const dispatch = useDispatch();
  const [toogle, setToogle] = useState(true)

  useEffect(() => {
    dispatch(getPostsByIdAction(postId));
    return () => {
      dispatch(cleanDetailsAction())
    }
  }, [dispatch, postId]);

  if (!details || Object.keys(details).length === 0) return;

  return (
    <div className="flex flex-col w-[50rem]  p-6 space-y-6 overflow-hidden rounded-lg shadow-md  bg-[#FAF2E7] border border-gray-200 mx-auto">
      <div className="flex flex-row space-x-4">
        <AuthorData details={details} />
        <ModalEditPost setToogle={setToogle} postId={postId} />
      </div>
      
      <PostData closeModal={closeModal} toogle={toogle} postId={postId} details={details} setLike={setLike} like={like} />
      <Comments postId={postId} details={details} />
    </div>
  );
};

export default Post;