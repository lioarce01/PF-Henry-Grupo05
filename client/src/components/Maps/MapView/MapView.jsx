import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useGetCoordsQuery } from '../../../redux/api/map';
import Spinner from '../../Spinner/Spinner';





const MapView = ({name, country, city, address}) => {

const [position, setPosition] = useState([-33.305619, -66.343286]);
const [flag, setFlag] = useState(false);
const urlApi = `https://api.mymappi.com/v2/geocoding/direct?apikey=${process.env.REACT_APP_MAPPI_KEY}&q=${address}, ${city}, ${country}&layers=address`
const {data, isLoading, error} = useGetCoordsQuery(urlApi)



  if(!isLoading){
    return (
        <div className='h-80 w-full border-2 border-black'>
            <MapContainer center={[data?.data[0].lat,data?.data[0].lon]} zoom={14} scrollWheelZoom={false} className='w-full h-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data?.data[0].lat,data?.data[0].lon]}>
                    <Popup>
                        {name}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
      )
  }
  else return <Spinner/>
}

export default MapView