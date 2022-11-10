import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { getUserByIdAction } from '../../redux/reducers/dataBack/manageUsers/manageUsersActions'
import Navbar from '../Navbar/Navbar'
import CardPost from '../Home/CardPost'

const UserProfile = () => {
  // const dispatch = useDispatch()
  const { id } = useParams()
  console.log('user', id)

  // useEffect(() => {
  //   dispatch(getUserByIdAction(id))
  //   console.log('user', id)
  // }, [dispatch, id])

  const user = useSelector(state => state.manageUsers.details)
  console.log(user)

  return (
    <div className='bg-slate-300'>
      <Navbar/>
      <div className='flex flex-col items-center h-full min-h-screen pt-16'>
        <h1 className='text-4xl font-bold text-black'>
          User Dashboard
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] py-4 px-4 mt-2 bg-slate-200 rounded-md'>
          <div className='flex justify-center'>
            <img src="https://i.pravatar.cc/150?img=4" alt="user" className='border border-4 border-white rounded-full'/>
          </div>
          <div className='mt-2'>
            <p className='py-2'>Name: name</p>
            <p className='py-2'>Email: email@email.com</p>
            <p className='py-2'>Role: User</p>
          </div>
          <button className='inline-block text-white bg-black border-2 border-black'>Update Profile</button>
        </div>
        <h1 className='py-2 text-4xl font-bold text-black'>
          User Posts
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] h-auto py-2 px-4 my-4 bg-slate-200 rounded-md'>
          <div className='mt-2'>
            
          </div>
        </div>
        <h1 className='py-4 text-3xl font-bold text-black'>
          User Shelters Following
        </h1>
        <div className='flex flex-col w-[90%] md:w-[640px] lg:w-[768px] h-auto py-2 px-4 my-4 bg-slate-200 rounded-md'>
          <div className='mt-2'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile