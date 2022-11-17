import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useUpdateShelterMutation } from '../../../redux/api/shelters';
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





const MapView =  ({name, lat, lon, id}) => {

const [position, setPosition] = useState([lat, lon]);
const center = [40.78093334132345, -73.96678400687304]
const [updateShelter, { error }] = useUpdateShelterMutation()



function LocationMarker ({center, name, id}) {
    const nolocation = 'No location detected, double click on map to set current location'
    const [position, setPosition] = useState(center)
    const map = useMapEvents({
      dblclick() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        console.log('latitude', position[0])
        updateShelter({updateShelter:{lat: position[0], lon: position[1]}, id}) 
      },
    })
  
    return position === center ? (
            <Marker position={position}>
              <Popup>{nolocation}</Popup>
            </Marker>
    ) : (
      <Marker position={position}>
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
                <LocationMarker center={center} name={name} id={id} />
            </MapContainer>
        </div>
  )
}

export default MapView