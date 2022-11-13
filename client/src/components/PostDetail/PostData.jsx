import React, { useState } from 'react'
import { useEffect } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction, updatePostAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import { selectPost } from '../../redux/reducers/dataBack/managePosts/managePostsSlice'

const PostData = ({ toogle, details, postId, closeModal }) => {
  const [input, setInput] = useState({ id: postId, content: details.content, })
  const dispatch = useDispatch()

  const inputHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const saveHandler =  () => {
    dispatch(updatePostAction(input))
    closeModal()
  }

  return (
    <>
      {
        details.image && (
          <img
            src={details.image}
            alt="post"
            className="object-cover w-[70%]  mb-4   mx-auto"
          />
        )
      }

      <textarea className="mb-1 text-xl font-semibold  w-full resize-none  bg-inherit disabled:border-none border border-gray-300 "
        type="text" name="content" onChange={inputHandler} defaultValue={details.content}
        disabled={toogle} value={input.description}  cols='1' />
      {!toogle && <div className="flex flex-row-reverse flex-start justify-between"><button className="px-2 py-1 mt-1 border border-gray-400 rounded hover:bg-gray-300"
        onClick={saveHandler}>Save</button></div>}
      <div className="flex flex-wrap justify-between">
        <div className="flex items-center mr-2 space-x-2 text-sm text-gray-700">
          <AiFillHeart />
          <span>{details.likes}</span>
        </div>
      </div>
    </>
  )
}

export default PostData