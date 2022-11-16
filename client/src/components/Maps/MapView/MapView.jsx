import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import axios from 'axios';



const MapView = ({name, country, city, address}) => {
const [position, setPosition] = useState([-33.305619, -66.343286]);

const urlApi = `https://api.mymappi.com/v2/geocoding/direct?apikey=${process.env.REACT_APP_MAPPI_KEY}&q=${address}, ${city}, ${country}&layers=address`
const coords = async ()=>{
    try {
         const data = await axios.get(urlApi)
         console.log('data', data.data)
         return data;
    } catch (error) {
        alert('Algo salio mal en obtener las coordenadas')
    }
}
const position2 = coords();

  return (
    <div className='h-80 w-full border-2 border-black'>
        <MapContainer center={position} zoom={14} scrollWheelZoom={false} className='w-full h-full'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    {name}
                </Popup>
            </Marker>
        </MapContainer>
    </div>
  )
}

export default MapView