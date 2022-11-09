import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import CardPost from './CardPost'

const Posts = () => {
  // const dispatch = useDispatch()
  // const posts = useSelector(state => state.posts)

  // useEffect(() => {
  //   dispatch(getPostsAction())
  // }, [dispatch])

  // if(!posts.length) return <h1>Loading...</h1>

  return (
    <div>
      <div className='flex items-center h-[48.5rem] bg-gray-700 w-[800px] mt-14 overflow-y-scroll flex-col'>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
        <CardPost/>
      </div>
    </div>
  )
}

export default Posts