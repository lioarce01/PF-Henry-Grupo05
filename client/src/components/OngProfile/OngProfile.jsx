import React from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import Posts from "../Home/Posts";
import NavBar from '../Navbar/Navbar'


const OngDetail  = ()=>{

// useEffect (()=>{
// //dispatch find ONG by ID
// //dispatch del /get post by ID
// // Agregar 
// },[toogle, toogle2])

//objeto hardcodeado para ir mostrando algo hasta usar la db
const [input, setInput] = useState({
    profilePic : 'https://i.ibb.co/6JxWZYJ/ONG-image.png',
    name: 'Amigos del Perro',
    country: 'Argentina',
    city: 'San Luis',
    address: 'Felipe Velazquez 600',
    website: 'MyWebsite.com',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
})
const [toogle, setToogle] = useState(true)
const [toogle2, setToogle2] = useState(true)


const inputHandler = (e)=>{
    e.preventDefault();
    setInput({...input, [e.target.name]: e.target.value});
}
const editHandler = ()=>{
    setToogle(!toogle);
    //si toogle es true deberia hacer un dispatch de los cambios (useEffect on update)
}
const editHandler2 = ()=>{
    setToogle2(!toogle2);
    //si toogle es true deberia hacer un dispatch de los cambios (useEffect on update)
}


return (
    <div>
        <NavBar/>
    <div className=' w-full h-full bg-slate-300 flex flex-row justify-end pt-20'>
        <div className="fixed left-0 w-60 ml-5 h-fit border border-red-50 flex flex-col items-center">
            <div className="w-fit h-fit border border-red-50">
                <img src={input.profilePic} alt="imagen ONG ejemplo" />
            </div>
            <div className="mt-1">
                <button>Upload image</button>
            </div>
            <div className="mt-3">
                <form>
                    <input className="my-2"
                    type="text" name="name" onChange={inputHandler} value={input.name}  disabled={toogle}/>
                    <input className="my-2"
                    type="text" name="country" onChange={inputHandler} value={input.country} disabled={toogle}/>
                    <input className="my-2"
                    type="text" name="city" onChange={inputHandler} value={input.city} disabled={toogle}/>
                    <input className="my-2"
                    type="text" name="address" onChange={inputHandler} value={input.address} disabled={toogle}/>
                    <input className="my-2"
                    type="text" name="website" onChange={inputHandler} value={input.website} disabled={toogle}/>
                </form>
                    <button onClick={editHandler}>Edit</button>
            </div>
            <button>Suscribe</button>
        </div>
        <div>
        <div className="mr-16 flex flex-col items-center">
            <textarea className="h-60 w-full resize-none"
            type="text" name="desciption" onChange={inputHandler}
            disabled={toogle2} rows='1' cols='1' >{input.description}</textarea>
            <button onClick={editHandler2}>Edit</button>
            <button>New Post</button>
            <Posts/>
        </div>
        </div>
    </div>
    </div>
)


}

export default OngDetail