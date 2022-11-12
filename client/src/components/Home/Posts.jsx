import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import Spinner from '../Spinner/Spinner'
import CardPost from './CardPost'
import PostFilters from './PostFilters'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.managePosts.posts);
  console.log(posts)

  useEffect(() => {
    dispatch(getPostsAction())
  }, [dispatch])

  return (
    <div className='w-full min-h-[50rem] px-32 py-10 mb-4 bg-[#FAF2E7]'>
      <div className='flex items-center justify-end'>
        <PostFilters/>
      </div>
      <div className='flex flex-col justify-center w-full min-w-full'>
        {
          posts.length ? posts.map(post => {
            return (
              <CardPost
                key={post.id}
                id={post.id}
                image={post.author.profilePic}
                author={post.author.name}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
                comments={post.Comment.length}
                authorId={post.authorId}
              />
            )
          }) : <Spinner/>
        }
      </div>
    </div>
  )
}

export default Posts