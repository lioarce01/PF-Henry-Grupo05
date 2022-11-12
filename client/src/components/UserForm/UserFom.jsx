import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {userSchema} from './validationUserForm';
import {useFormik} from 'formik';
import Navbar from '../Navbar/Navbar';
import {createUserAction} from "../../redux/reducers/dataBack/manageUsers/manageUsersActions";

const UserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async () =>{
      console.log('submitted')
      console.log(values);
     await dispatch(createUserAction(values)).then(res => alert('User Created')).catch(()=> alert('error'));
     navigate('/home')
    }
    const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues:{
        name:'',
        email: '',
        profilePic:''
      },
      validationSchema: userSchema,
      onSubmit,
    })
  return (
    <div className='w-full  min-h-screen bg-[#E1D7D3] h-full flex flex-col justify-between content-center'>
        <div>
            <Navbar/>
        </div>
        
        <div className="mt-50 min-w-full min-h-screen flex flex-col items-center justify-center md:col-span-2 md:mt-0 " >
        <form onSubmit={handleSubmit} className="mt-5 min-w-full h-auto flex flex-col items-center justify-center md:col-span-2 md:mt-0">
          <h1 className="text-lg text-4xl font-medium leading-6 text-black">Create your User</h1>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Name: </label>
            <input type="text" 
            value={values.name} 
            name= 'name'  
            placeholder='Add name...' 
            onChange={handleChange} 
            onBlur={handleBlur} 
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.name && <p className='text-red-500'>{errors.name}</p>}
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">email: </label>
            <input type="email" value={values.email} name= 'email'  placeholder='Add your email..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.email && <p className='text-red-500'>{errors.email}</p>}           
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Profile Pic: </label>
            <input type="text" value={values.profilePic} name= 'profilePic'  placeholder='Add Profile Pic..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.profilePic && <p className='text-red-500'>{errors.profilePic}</p>} 
          </div>

          {((values.name !== '') && (Object.entries(errors).length === 0) &&  (values.email !=='')&& (values.profilePic !=='')) ?
                         
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 transition bg-[#FAF2E7] border border-gray-800 rounded-md hover:bg-orange-100 hover:text-black duration 300'>Submit</button>
              </div>: 
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 transition border hidden border-gray-800 bg-[#FAF2E7] rounded-md hover:bg-orange-100 hover:text-black duration 300' disabled>Submit</button>
                  <p className='text-red-500'>Fields Required</p>
              </div>
          }

        </form>
        </div>
    </div>
  )
}

export default UserForm;