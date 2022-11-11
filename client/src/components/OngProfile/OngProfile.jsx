import React from "react";
import { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSheltersByIdAction, updateSheltersAction } from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions"; 
import CardPost from "../Home/CardPost";
import PostFilters from "../Home/PostFilters";
import NavBar from '../Navbar/Navbar'

//antes del lio que voy a hacer
const OngDetail  = ()=>{

const dispatch = useDispatch();
const {id} = useParams();
const details = useSelector(state => state.manageShelters.details);

useEffect (()=>{
//dispatch find ONG by ID
dispatch(getSheltersByIdAction(id))
// Agregar 
},[dispatch])
console.log(details)

//objeto hardcodeado para ir mostrando algo hasta usar la db
const [input, setInput] = useState({
    profilePic : details.profilePic,
    name: details.name,
    country: details.country,
    city: details.city,
    address: details.address,
    website: details.website,
    description: details.description
})
const [toogle, setToogle] = useState(true)
const [toogle2, setToogle2] = useState(true)


const inputHandler = (e)=>{
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
}
const editHandler = ()=>{
    setToogle(!toogle);
}
const editHandler2 = ()=>{
    setToogle2(!toogle2);
    //si toogle es true deberia hacer un dispatch de los cambios (useEffect on update)
}
const saveHandler = ()=>{
    dispatch(updateSheltersAction(input,id))
}


return (
    <div>
        <NavBar/>
        
    <div className=' w-full h-full bg-slate-300 flex flex-row justify-end pt-20'>
        {details.posts?.length >0 && <div className="fixed left-0 w-60 ml-5 h-fit border border-red-50 flex flex-col items-center">
            <div className="w-fit h-fit border border-red-50">
                <img src={details.profilePic} alt="imagen ONG ejemplo" />
            </div>
            <div className="mt-1">
                <button>Upload image</button>
            </div>
            <div className="mt-3">
                <form>
                    <input className="my-2" defaultValue={details.name}
                    type="text" name="name" onChange={inputHandler} value={input.name}  disabled={toogle}/>
                    <input className="my-2" defaultValue={details.country}
                    type="text" name="country" onChange={inputHandler} value={input.country} disabled={toogle}/>
                    <input className="my-2" defaultValue={details.city}
                    type="text" name="city" onChange={inputHandler} value={input.city} disabled={toogle}/>
                    <input className="my-2" defaultValue={details.address}
                    type="text" name="address" onChange={inputHandler} value={input.address} disabled={toogle}/>
                    <input className="my-2" defaultValue={details.website}
                    type="text" name="website" onChange={inputHandler} value={input.website} disabled={toogle}/>
                </form>
                    <button onClick={editHandler}>Edit</button>
                   {!toogle && <button onClick={saveHandler}>Save</button>}
            </div>
            <button>Suscribe</button>
        </div>}
        <div>
        <div className="mr-16 flex flex-col items-center">
            <textarea className="h-60 w-full resize-none"
            type="text" name="description" onChange={inputHandler} defaultValue={details.description}
            disabled={toogle2} value={input.description} rows='1' cols='1'/>
            <button onClick={editHandler2}>Edit</button>
            {!toogle2 && <button onClick={saveHandler}>Save</button>}
            <button>New Post</button>
            {/* componente post */}
            <div className='w-full min-h-[50rem] px-32 py-10 mb-4 mt-14 bg-slate-200'>
      <div className='flex items-center justify-end'>
        <PostFilters/>
      </div>
      <div className=''>
        {
          details.posts?.map(post => {
            return (
              <CardPost
                key={post.id}
                image={post.image}
                content={post.content}
                likes={post.likes}
                createdAt={post.createdAt}
              />
            )
          })
        }
      </div>
    </div>
        </div>
        </div>
    </div>
    </div>
)


}

export default OngDetail