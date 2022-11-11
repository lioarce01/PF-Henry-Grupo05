import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import CardPost from './CardPost'
import PostFilters from './PostFilters'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.managePosts.posts);

  useEffect(() => {
    dispatch(getPostsAction())
  }, [dispatch])

  return (
    <div className='w-full min-h-[50rem] px-32 py-10 mb-4 mt-14 bg-slate-200'>
      <div className='flex items-center justify-end'>
        <PostFilters/>
      </div>
      <div className=''>
        {
          posts && posts.map(post => {
            return (
              <CardPost
                key={post.id}
                image={post.author.image}
                author={post.author.name}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
                comments={post.Comment.length}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Posts