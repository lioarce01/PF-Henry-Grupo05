import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {ongSchema} from './validationOngForm';
import {useFormik} from 'formik';
import Navbar from '../Navbar/Navbar';
import {createSheltersAction} from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions";


const OngForm = () => {
    const dispatch = useDispatch();
    const onSubmit = () =>{
      console.log('submitted')
      console.log(values);
      dispatch(createSheltersAction(values)).then(res => alert(res.payload))
    }
    const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues:{
        name:'',
        authorId: '636cfde16804f7dc836bda73', //id user hardcodeado
        description: '',
        profilePic:'',
        city:'',
        country: '',
        goal: 0,
        address:'',
        website: '', 
      },
      validationSchema: ongSchema,
      onSubmit,
    })
    console.log({errors})

  return (
    <div className='w-full  min-h-screen bg-[#EEEEE6] h-full flex flex-col justify-around content-center'>
        <div>
            <Navbar/>
        </div>
        
        <div className="mt-250 min-w-full min-h-screen flex flex-col items-center  justify-center md:col-span-2 md:mt-0 " >
        <form onSubmit={handleSubmit} className="mt-5 min-w-full h-auto flex flex-col items-center justify-center md:col-span-2 md:mt-0">
          <h1 className="text-lg text-4xl font-medium leading-6 text-black">Create your Organization</h1>
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
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Description: </label>
            <input type="text" value={values.description} name= 'description'  placeholder='Add description..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.description && <p className='text-red-500'>{errors.description}</p>}           
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Country: </label>
            <input type="text" value={values.country} name= 'country'  placeholder='Add country..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.country && <p className='text-red-500'>{errors.country}</p>}   
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">City: </label>
            <input type="text" value={values.city} name= 'city'  placeholder='Add city..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.city && <p className='text-red-500'>{errors.city}</p>}   
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Address: </label>
            <input type="text" value={values.address} name= 'address'  placeholder='Add address..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.address && <p className='text-red-500'>{errors.address}</p>}   
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Website: </label>
            <input type="text" value={values.website} name= 'website'  placeholder='Add website..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>  
            {errors.website && <p className='text-red-500'>{errors.website}</p>}
          </div>

          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Goal: </label>
            <input type="number" value={values.goal} name= 'goal' min='1' placeholder='Add goal..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.goal && <p className='text-red-500'>{errors.goal}</p>} 
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Profile Pic: </label>
            <input type="text" value={values.profilePic} name= 'profilePic'  placeholder='Add Profile Pic..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.profilePic && <p className='text-red-500'>{errors.profilePic}</p>} 
          </div>


          {((values.name !== '') && (Object.entries(errors).length === 0) &&  (values.description !=='')&& (values.address !=='') && (values.city !=='') && (values.country !=='')) ?
                         
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 transition bg-[#FAF2E7] border border-gray-800 rounded-md hover:bg-orange-100 hover:text-black duration 300'>Submit</button>
              </div>: 
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 transition border border-gray-800 bg-[#FAF2E7] rounded-md hover:bg-orange-100 hover:text-black duration 300' disabled>Submit</button>
              </div>
          }

        </form>
        </div>
    </div>
  )
}

export default OngForm;