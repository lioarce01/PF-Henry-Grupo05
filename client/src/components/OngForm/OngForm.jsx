import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {ongSchema} from './validationOngForm';
import {useFormik} from 'formik';
import Navbar from '../Navbar/Navbar';
import {createSheltersAction} from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions";


const OngForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = async () =>{
      console.log('submitted')
      console.log(values);
      await dispatch(createSheltersAction(values)).then(res => alert('Ong Created')).catch(()=> alert('error'));
      navigate('/home')
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
  return (
    <div className='w-full  min-h-screen bg-[#E1D7D3] flex flex-col justify-between content-center'>
        <div >
            <Navbar/>
        </div>
        
        <div className="mt-32 min-w-full  flex flex-col items-center  justify-center md:col-span-2 md:mt-0" >
        <form onSubmit={handleSubmit} className="mt-5 min-w-full h-auto flex flex-col items-center justify-center md:col-span-2 md:mt-0">
          <h1 className="text-lg text-4xl font-medium leading-6 text-black">Create your Shelter</h1>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Name: </label>
            <div className="flex items-center justify-arround w-full">

            <input type="text" 
            value={values.name} 
            name= 'name'  
            placeholder='Add name...' 
            onChange={handleChange} 
            onBlur={handleBlur} 
            className="bg-gray-50 border w-3/4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.name && <p className='text-red-500'>  {errors.name}</p>}
            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Description: </label>
            <div className="flex items-center">
            <input type="text" value={values.description} name= 'description'  placeholder='Add description..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border  border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.description && <p className='text-red-500'>{errors.description}</p>}           

            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Country: </label>
            <div className="flex items-center">

            <input type="text" value={values.country} name= 'country'  placeholder='Add country..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.country && <p className='text-red-500'>{errors.country}</p>}   
            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">City: </label>
            <div className="flex items-center">

            <input type="text" value={values.city} name= 'city'  placeholder='Add city..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.city && <p className='text-red-500'>{errors.city}</p>}   
            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Address: </label>
            <div className="flex items-center">

            <input type="text" value={values.address} name= 'address'  placeholder='Add address..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            {errors.address && <p className='text-red-500'>{errors.address}</p>}   
            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Website: </label>
            <div className="flex items-center">

            <input type="text" value={values.website} name= 'website'  placeholder='Add website..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/>  
            {errors.website && <p className='text-red-500'>{errors.website}</p>}
            </div>
          </div>

          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Goal: </label>
            <div className="flex items-center">

            <input type="number" value={values.goal} name= 'goal' min='1' placeholder='Add goal..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.goal && <p className='text-red-500'>{errors.goal}</p>} 
            </div>
          </div>
          <div className="mb-6 w-3/4">
            <label className="block mb-2 text-sm font-medium text-black dark:text-black">Profile Pic: </label>
            <div className="flex items-center">
            <input type="text" value={values.profilePic} name= 'profilePic'  placeholder='Add Profile Pic..' onChange={handleChange} onBlur={handleBlur}  className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"/> 
            {errors.profilePic && <p className='text-red-500'>{errors.profilePic}</p>} 

            </div>
          </div>


          {((values.name !== '') && (Object.entries(errors).length === 0) &&  (values.description !=='')&& (values.address !=='') && (values.city !=='') && (values.country !=='')) ?
                         
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 transition bg-[#FAF2E7] border border-gray-800 rounded-md hover:bg-orange-100 hover:text-black duration 300'>Submit</button>
              </div>: 
              <div>
                  <button type='submit' className='pt-1 pb-1 pl-2 pr-2 mr-4 hidden transition border border-gray-800 bg-[#FAF2E7] rounded-md hover:bg-orange-100 hover:text-black duration 300' disabled>Submit</button>
                  <p className='text-red-500'>Fields Required</p>
              </div>
          }

        </form>
        </div>
    </div>
  )
}

export default OngForm;