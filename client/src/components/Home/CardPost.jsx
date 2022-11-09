import React from 'react'
import { Link } from 'react-router-dom'
import {BiCommentDetail} from 'react-icons/bi'
import {AiFillHeart} from 'react-icons/ai'

const CardPost = () => {
  return (
    <div className='flex flex-col'>
      <div className="w-[100%] max-w-xl my-4 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex items-start px-4 py-6">
          <img className="object-cover w-12 h-12 mr-4 rounded-full shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar"/>
        <div className="">
          <Link to='/:ongId/profile' className="object-cover w-12 h-12 mr-4 rounded-full shadow">
        <div className="flex flex-col items-start">
            <h2 className="-mt-1 text-lg font-semibold text-gray-900">Juan carlo</h2>
          <small className="text-sm text-gray-700">22h ago</small>
        </div>
          </Link>
        <p className="text-sm text-left text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo accusamus, quis vel suscipit voluptas ullam iure provident quasi nisi excepturi ab laborum asperiores tempora sint debitis dolorem qui assumenda architecto!
        </p>
        <div className="flex items-center mt-4">
          <div className="flex mr-2 text-sm text-gray-700">
            <AiFillHeart/>
              <span>12</span>
            </div>
            <div className="flex mr-2 text-sm text-gray-700">
              <Link to='/post/:postId' className='flex flex-row'>
                <BiCommentDetail/>
                <span>8</span>
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