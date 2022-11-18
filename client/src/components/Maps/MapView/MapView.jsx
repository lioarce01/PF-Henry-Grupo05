import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useUpdateShelterMutation } from '../../../redux/api/shelters';
import { useSelector } from 'react-redux';
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





const MapView =  ({name, lat, lon, id, shelter}) => {

const [position, setPosition] = useState([lat, lon]);
const center = [40.78093334132345, -73.96678400687304]
const [updateShelter, { error }] = useUpdateShelterMutation()
const [cpos, setCpos] = useState([])
const [update, setUpdate] = useState(false)
const { userDetail } = useSelector((state) => state.localStorage.userState);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  const crd = pos.coords;
  setCpos([crd?.latitude, crd?.longitude])
  setUpdate(true)
  // console.log('Your current position is:');
  // console.log(`Latitude : ${crd.latitude}`);
  // console.log(`Longitude: ${crd.longitude}`);
  // console.log(`More or less ${crd.accuracy} meters.`);
}

function error2(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

useEffect(()=>{
  navigator.geolocation.getCurrentPosition(success, error2, options);
  console.log('current location', cpos)
},[update, updateShelter])

const handleclick = ()=>{
  updateShelter({updatedShelter:{lat: cpos[0], lon: cpos[1]}, id})
  
}


function LocationMarker ({center, name}) {
    const nolocation = 'No location detected, double click on map to set current location'
    const [position2, setPosition2] = useState(center)
    const map = useMapEvents({
      dblclick() {
        map.locate()
      },
      locationfound(e) {
        setPosition2(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })

    return position2 === center ? (
            <Marker position={position2}>
              <Popup>{nolocation}</Popup>
            </Marker>
    ) : (
      <Marker position={position2}>
        <Popup>{name}</Popup>
      </Marker>
    )
  }


  if(lat !== null && lon !== null){
    return (
        <div className='h-80 w-full border-4 border-[#462312] rounded-lg p-1'>
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
  else return(
    <div className='h-80 w-full border-4 border-[#462312] rounded-lg p-1'>
            <MapContainer center={center} zoom={14} scrollWheelZoom={false} className='w-full h-full'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker center={center} name={name} />
            </MapContainer>
                {shelter.author.id === userDetail?.id && <button onClick={handleclick}>Set current</button>}
        </div>
  )
}

export default MapView