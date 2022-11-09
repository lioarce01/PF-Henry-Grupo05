import React from "react";
import { useEffect , useState} from "react";
import { useParams } from "react-router-dom";


const OngDetail  = ()=>{

// useEffect (()=>{
// //dispatch find ONG by ID
// //dispatch del /get post by ID
// // Agregar 
// },[toogle, toogle2])

//objeto hardcodeado para ir mostrando algo hasta usar la db
const [input, setInput] = useState({
    image : 'https://i.ibb.co/6JxWZYJ/ONG-image.png',
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
        <div>
            <div>
                <img src={input.image} alt="imagen ONG ejemplo" />
                <button>Upload image</button>
            </div>
            <div>
                <form>
                    <input type="text" name="name" onChange={inputHandler} value={input.name}  disabled={toogle}/>
                    <input type="text" name="country" onChange={inputHandler} value={input.country} disabled={toogle}/>
                    <input type="text" name="city" onChange={inputHandler} value={input.city} disabled={toogle}/>
                    <input type="text" name="address" onChange={inputHandler} value={input.address} disabled={toogle}/>
                    <input type="text" name="website" onChange={inputHandler} value={input.website} disabled={toogle}/>
                </form>
                    <button onClick={editHandler}>Edit</button>
            </div>
            <button>Suscribe</button>
        </div>
        <div>
            <input type="text" name="desciption" onChange={inputHandler} value={input.description} disabled={toogle2}/>
            <button onClick={editHandler2}>Edit</button>
        </div>
    </div>
)


}

export default OngDetail