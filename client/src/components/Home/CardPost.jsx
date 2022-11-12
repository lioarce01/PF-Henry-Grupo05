import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BiCommentDetail} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'
import {getTimeAgo} from '../../utils'
import {AiOutlineHeart} from 'react-icons/ai'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updatePostLikesAction} from '../../redux/reducers/dataBack/managePosts/managePostsActions'


const CardPost = ({image, author, content, likes, createdAt, comments, id, authorId}) => {
  const [likesActuals, setLikesActuals] = useState(likes);
  const [like, setLike] = useState(false)
  const dispatch = useDispatch()
  const toggleLike = () => {
    
    setLike(!like)
    like? setLikesActuals(likesActuals - 1 ): setLikesActuals(likesActuals + 1);
    like? dispatch(updatePostLikesAction({id, likes: likesActuals - 1})): dispatch(updatePostLikesAction({id, likes: likesActuals + 1}));
  }

  useEffect(() => {
    setLike(like)
  }, [like])
  
  if(!image) {
    image = 'https://www.humanesociety.org/sites/default/files/styles/1240x698/public/2018/06/kittens-in-shelter-69469.jpg?h=ece64c50&itok=tOiKeqHY'
  }
  
  return (
    <div className='flex flex-col'>
      <div className="w-[100%] max-w-xl my-4 md:min-w-[500px] bg-[#fffcf7] border border-[#FAF2E7] rounded-lg">
        <div className="flex items-start px-4 py-4">
          <img className="object-cover mr-4 rounded-full shadow w-14 h-14" src={image} alt="avatar"/>
        <div className="w-full">
          <Link to={`/users/${authorId}`} className="text-lg font-semibold text-gray-700">
          <div className="flex flex-col items-start">
            <h2 className="mb-1 -mt-1 text-lg font-bold text-gray-800">{author}</h2>
          <small className="px-2 py-0.5 font-normal text-sm text-[#585858] rounded-md bg-[#FAF2E7]">{getTimeAgo(createdAt)}</small>
          </div>
          </Link>
          <Link to={`/posts/${id}`}>
        <p className="w-full mt-4 mb-4 font-semibold text-left text-gray-900 text-md">
          {content}
        </p>
        <div className='flex flex-row justify-end w-full items-'>
          {
            comments > 1 ? <p className='p-1 text-sm text-gray-700'>{comments} comments</p>
            : comments === 1 ? <p className='p-1 text-sm text-gray-700'>{comments} comment</p>
            : null
          }
          {
            likes > 1 ? <p className='p-1 text-sm text-gray-700'>{likes} likes</p>
            : <p className='p-1 text-sm text-gray-700'>{likes} like</p>
          }
        </div>
        </Link>
        <div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-400">
          <div className="flex mr-4 text-sm text-gray-700">
            {
                like
                ? <button className='flex flex-row items-center border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300e' onClick={toggleLike}>
                    <AiFillHeart className='w-5 h-5 text-red-600'/>
                    <p className='pl-1 text-lg font-semibold text-gray-800'>{likesActuals}</p>

                  </button>
                : <button className='flex flex-row items-center border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300' onClick={toggleLike}>
                    <AiOutlineHeart className='w-5 h-5'/>
                    <p className='pl-1 text-lg font-semibold text-gray-800'>{likeActuals}</p>
                  </button>
              }
            </div>
            <div className="flex mr-2 text-sm text-gray-700">
              <Link to={`/posts/${id}`} className='flex flex-row items-center pr-4 border border-[#fffcf7] hover:border hover:border-[#FAF2E7] py-1 px-3 rounded-md hover:bg-[#FAF2E7] transition duration-300'>
                <BiCommentDetail className='w-5 h-5'/>
                <p className='pl-2 text-lg font-semibold '>Comment</p>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPost