import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import Navbar from '../Navbar/Navbar'
import { useEffect } from 'react'
import { getUserByIdAction } from '../../redux/reducers/dataBack/manageUsers/manageUsersActions'
import CardPost from '../Home/CardPost'
import ONGCard from '../Home/ONGCard'

const UserProfile = () => {
  const { userId } = useParams()
  console.log('userId: ', userId)
  const dispatch = useDispatch()

  const user = useSelector(state => state.manageUsers.details)
  console.log("userDetail: ", user)

  useEffect(() => {
    dispatch(getUserByIdAction('636c0a5c1e78d75d8edfae96'))
  }, [dispatch])

  //traer el author de los posts

  //detructuring of user.following 
  const { following } = user
  console.log('following: ', following)

  return (
    <div className='bg-slate-300'>
      <Navbar/>
      <div className='flex flex-col items-center h-full min-h-screen pt-16'>
        <h1 className='text-4xl font-bold text-black'>
          User Dashboard
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] py-4 px-4 mt-2 bg-slate-200 rounded-md md:flex-row'>
          <div className='flex justify-center'>
            <img src="https://i.pravatar.cc/150?img=4" alt="user" className='border border-4 border-white rounded-full'/>
          </div>
          <div className='mt-2'>
            <div className='flex flex-col items-center'>
              <p className='py-2 text-xl font-bold'>{user.name}</p>
            </div>
            <p className='py-2 md:pl-5'>Email: {user.email}</p>
            <p className='py-2 md:pl-5'>Role: {user.role}</p>
            <button className='inline-block px-2 py-1 text-white bg-black border-2 border-black rounded-md md:ml-4'>Update Profile</button>
          </div>
        </div>
        <h1 className='py-2 text-4xl font-bold text-black'>
          User Posts
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] max-h-[700px] overflow-y-scroll h-auto py-2 px-4 my-4 bg-slate-200 rounded-md justify-center items-center'>
          <div className='mt-2'>
          {
            user?.posts ? user.posts.map(post => {
              return (
                <CardPost
                  key={post.id}
                  id={post.id}
                  author={user.name}
                  content={post.content}
                  image={post.image}
                  createdAt={post.createdAt}
                  likes={post.likes}
                  comments={post.comments}
                />
              )
            }) : <h1>Este usuario no tiene posts</h1>
          }
          </div>
        </div>
        <h1 className='py-4 text-3xl font-bold text-black'>
          User Shelters Following
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] h-auto max-h-[1000px] overflow-y-scroll py-2 px-4 my-4 bg-slate-200 rounded-md'>
          <div className='flex flex-col mt-2 overflow-y-scroll '>
          {
            following ? following.map(ong => {
              return (
                <ONGCard
                  key={ong.id}
                  id={ong.id}
                  name={ong.name}
                  description={ong.description}
                  budget={ong.budget}
                  followers={ong.userFollowers.length}
                />
              )
            }) : <h1>Este usuario no sigue a ninguna ONG</h1>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile