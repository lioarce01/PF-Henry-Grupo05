import React, { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import AddComment from "./AddComment";
import Comment from "./Comment";

import { getPostsByIdAction } from "../../redux/reducers/dataBack/managePosts/managePostsActions";
import { selectPost } from "../../redux/reducers/dataBack/managePosts/managePostsSlice";
import { getTimeAgo } from "../../utils";

const Post = () => {
  const { details } = useSelector(selectPost);
  const dispatch = useDispatch();
  const {postId} = useParams()
  const [toogle, setToogle] = useState(true)
  console.log("details: ", details);

  useEffect(() => {
    dispatch(getPostsByIdAction(postId));
  }, [dispatch, postId]);

  const [input, setInput] = useState({
    id:postId,
    content: details.content,
    
  })

  const inputHandler = (e)=>{
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
}

  const editHandler = ()=>{
    setToogle(!toogle);
}
const saveHandler = ()=>{
  dispatch(updatePostAction(input))
}

  if (!details || Object.keys(details).length === 0) return;

  return (
    <div className="flex flex-col max-w-[100%] md:max-w-[80%] lg:max-w-[50%] p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-900 dark:text-gray-100 bg-white border border-gray-200 mx-auto">
      <div className="flex space-x-4">
        <img
          className="object-cover mr-4 rounded-full shadow w-14 h-14"
          src={details.author.profilePic}
          alt="avatar"
        />
        <div className="flex items-center ">
          <Link
            to={`/${details.shelterId}/profile`}
            className="object-cover w-max "
          >
            <div className="flex flex-col items-start">
              <h2 className="-mt-1 text-lg font-semibold text-gray-900">
                {details.author.name}
              </h2>
              <small className="text-sm text-gray-700">
                {getTimeAgo(details.createdAt)}
              </small>
            </div>
          </Link>
        </div>
      </div>
      {
        details.image && (
          <img
        src={details.image}
        alt="post"
        className="object-cover w-full lg:max-w-[50%] mb-4  dark:bg-gray-500 mx-auto"
      />
        )
      }

      <textarea className="mb-1 text-xl font-semibold h-28 w-full resize-none"
       type="text" name="content" onChange={inputHandler} defaultValue={details.content}
       disabled={toogle} value={input.description} rows='1' cols='1'/>
      <button onClick={editHandler}>Edit</button>
      {!toogle && <button onClick={saveHandler}>Save</button>}

      <div className="flex flex-wrap justify-between">
        <div className="flex items-center mr-2 space-x-2 text-sm text-gray-700">
          <AiFillHeart />
          <span>{details.likes}</span>
        </div>
      </div>

      <div>
        <AddComment postId={postId} />
        {details.Comment &&
          details.Comment.map((comment) => {
            return (
              <Comment
                key={comment.id}
                postId={postId}
                author={comment.author}
                content={comment.content}
                id={comment.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Post;