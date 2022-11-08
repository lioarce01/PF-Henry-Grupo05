import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const OngDetail  = ()=>{

// useEffect (()=>{
// //dispatch find ONG by ID
// //dispatch del /get post by ID
// },[])

//objeto hardcodeado para ir mostrando algo hasta usar la db
const OngInfo = {
    image : 'https://i.ibb.co/6JxWZYJ/ONG-image.png',
    name: 'Amigos del Perro',
    country: 'Argentina',
    city: 'San Luis',
    address: 'Felipe Velazquez 600',
    website: 'MyWebsite.com'
}


return (
    <div>
        <div>
            <div>
                <img src={OngInfo.image} alt="imagen ONG ejemplo" />
                <button>Upload image</button>
            </div>
            <div>
                <ul>
                    <p>{OngInfo.name}</p>
                    <p>{OngInfo.country}</p>
                    <p>{OngInfo.city}</p>
                    <p>{OngInfo.address}</p>
                    <p>{OngInfo.website}</p>
                </ul>
                <button>Edit</button>
            </div>
            <button>Suscribe</button>
        </div>
        <div>
            <span>Descripcion</span>
            <button>Edit</button>
        </div>
    </div>
)


}

export default OngDetail