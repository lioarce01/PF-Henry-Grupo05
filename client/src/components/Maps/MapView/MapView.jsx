import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useUpdateShelterMutation } from '../../../redux/api/shelters';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import 'leaflet/dist/leaflet.css'
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";





const MapView = ({ name, lat, lon, id, author }) => {

	const [position, setPosition] = useState([lat, lon]);
	const center = [40.78093334132345, -73.96678400687304]
	const [updateShelter, { error }] = useUpdateShelterMutation()
	const [cpos, setCpos] = useState([])
	const [toogle, setToogle] = useState(false)
	const { userDetail } = useSelector((state) => state.localStorage.userState);
	const navigate = useNavigate()

	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};

	function success(pos) {
		const crd = pos.coords;
		setCpos([crd?.latitude, crd?.longitude])
	}

	function error2(err) {
		console.warn(`ERROR(${err.code}): ${err.message}`);
	}


	const handleClick = (event) => {
		event.stopPropagation()
		navigator.geolocation.getCurrentPosition(success, error2, options);
		setToogle(true)
	}
	const handleClick2 = () => {
		setToogle(false)
	}
	const handleSave = () => {
		updateShelter({ updatedShelter: { lat: cpos[0], lon: cpos[1] }, id })
		setToogle(false)
		Swal.fire({
			icon: 'success',
			title: 'Shelter´s Coordinates Saved!',
			preConfirm: () => {
				navigate(0)
			}
		})
	}


	function LocationMarker({ center, name }) {
		const nolocation = 'No location detected. Set new one by using Change Location button'
		const [position2, setPosition2] = useState(center)
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


	if (lat && lon) {
		return (
			<div className={(author?.id === userDetail?.id) ?
				"sm:h-80 h-64 w-full bg-white rounded-lg p-1 mb-5" :
				"h-48 sm:h-80 w-full lg:h-80 bg-white rounded-lg p-1 mb-5"}
				onClick={handleClick2}>
				<MapContainer
					center={position}
					zoom={14}
					scrollWheelZoom={false}
					className="w-full h-full relative z-0">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position}>
						<Popup>{name}</Popup>
					</Marker>
				</MapContainer>
				<div className='flex flex-col w-full items-center'>
					{(author?.id === userDetail?.id && !toogle) && (
						<button className="mt-2 mb-[20px] w-full bg-[#FF7272] hover:bg-[#e76464] text-gray-100 p-2 hover:text-white rounded-lg tracking-wide font-semibold  focus:outline-none cursor-pointer transition ease-in duration-300"
							onClick={handleClick}>Set Current Position</button>
					)}
					{(author?.id === userDetail?.id && cpos.length > 0 && toogle) && (
						<button className="mt-2 mb-[20px] w-full bg-[#FF7272] hover:bg-[#e76464] text-gray-100 p-2 hover:text-white rounded-lg tracking-wide font-semibold  focus:outline-none cursor-pointer transition ease-in duration-300"
							onClick={handleSave}>Save as Current</button>
					)}
				</div>
			</div>
		)
	} else
		return (
			<div className="h-48 sm:h-80 w-full bg-white rounded-lg p-1 mb-5">
				<MapContainer center={center} zoom={14} scrollWheelZoom={false} className="w-full h-full relative z-0">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					<LocationMarker center={center} name={name} />
				</MapContainer>
				
				<div className='flex flex-row-reverse justify-between'>
					{(author?.id === userDetail?.id && !toogle) && (
						<button className="mt-2 mb-[20px] w-[60%] bg-[#FF7272] hover:bg-[#e76464] text-gray-100 p-2 hover:text-white rounded-full tracking-wide font-semibold  focus:outline-none cursor-pointer transition ease-in duration-300"
							onClick={handleClick}>Set Current Position</button>
					)}
					{(author?.id === userDetail?.id && cpos.length > 0 && toogle) && (
						<button className="mt-2 mb-[20px] bg-[#FF7272] hover:bg-[#e76464] text-gray-100 p-2 hover:text-white rounded-full tracking-wide font-semibold  focus:outline-none cursor-pointer transition ease-in duration-300"
							onClick={handleSave}>Save as Current</button>
					)}
				</div>
			</div>
		)
}

export default MapView