import React from 'react'
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSheltersByIdAction, updateSheltersAction } from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions"; 
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ongSchema } from "../OngForm/validationOngForm";
import UploadImage from './UploadImage'


const OngFormUpdate = ({toogle}) => {

  const dispatch = useDispatch();
  const {id} = useParams();
  const details = useSelector(state => state.manageShelters.details);
  const [image, setImage] = useState(details.profilePic);
  
  useEffect (()=>{
  dispatch(getSheltersByIdAction(id))
  },[dispatch])

  const onSubmit = ()=>{
    dispatch(updateSheltersAction({...values, profilePic:image },id))
}
const {values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues:{
      name:details.name,
      description: details.description,
      city:details.city,
      country: details.country,
      address:details.address,
      website: details.website, 
    },
    validationSchema: ongSchema,
    onSubmit,
  })

  return (
    <div className='w-contain'>
      <div>
      <UploadImage image={image} setImage={setImage} />
      </div>
      <div >
      <form  onSubmit={handleSubmit}>
        <div className='flex flex-col text-[#462312] font-semibold text-lg' >
                    <input className="my-2" defaultValue={details.name}
                    type="text" name="name" onChange={handleChange} value={values.name}  disabled={toogle}/>
                    {errors.name && <p className='text-red-500'>  {errors.name}</p>}

                    <input className="my-2" defaultValue={details.country}
                    type="text" name="country" onChange={handleChange} value={values.country} disabled={toogle}/>
                    {errors.country && <p className='text-red-500'>  {errors.country}</p>}

                    <input className="my-2" defaultValue={details.city}
                    type="text" name="city" onChange={handleChange} value={values.city} disabled={toogle}/>
                    {errors.city && <p className='text-red-500'>  {errors.city}</p>}

                    <input className="my-2" defaultValue={details.address}
                    type="text" name="address" onChange={handleChange} value={values.address} disabled={toogle}/>
                    {errors.address && <p className='text-red-500'>  {errors.address}</p>}

                    <input className="my-2" defaultValue={details.website}
                    type="text" name="website" onChange={handleChange} value={values.website} disabled={toogle}/>
                    {errors.website && <p className='text-red-500'>  {errors.website}</p>}
                    <div className='flex w-full justify-end'>
                    <div >
                    {(!toogle && Object.entries(errors).length === 0)
                    && <button type='submit' className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                    >Save</button>}
                    </div>
                    </div>
                  </div>
              </form>
          </div>
    </div>
  )
}

export default OngFormUpdate