import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import CardPost from './CardPost'
import PostFilters from './PostFilters'

const Posts = () => {
  // const dispatch = useDispatch()
  // const posts = useSelector(state => state.posts)

  // useEffect(() => {
  //   dispatch(getPostsAction())
  // }, [dispatch])

  // if(!posts.length) return <h1>Loading...</h1>

  return (
    <div className='w-full px-32 py-10 mb-4 bg-slate-200 mt-14'>
      <div className='flex items-center justify-end'>
        <PostFilters/>
      </div>
      <div className=''>
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