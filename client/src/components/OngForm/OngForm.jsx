import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import location from './location'
import { useFormik } from "formik"
import Navbar from "../Navbar/Navbar"
import UploadImage from "./UploadImage"
import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { ongSchema } from "./validationOngForm"
import { useDispatch, useSelector } from "react-redux"
import { useAddShelterMutation } from "../../redux/api/shelters";
import { addShelterAction } from '../../redux/slices/manageUsers/actions';

const OngForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate()
	const [listAnimals, setListAnimals] = useState([])
	const [createShelter, { data1, isLoading, error }] = useAddShelterMutation();
	const user = useSelector(state => state.localStorage.userState)
	const { getAccessTokenSilently, loginWithPopup } = useAuth0();
	const [image, setImage] = useState("")
	useEffect(()=>{
		if(Object.entries(user.userDetail).length && user.userDetail.Shelter.length) {
			Swal.fire({
				icon: 'error', title: 'You already own a shelter',
				preConfirm: () => {
					navigate(`/${user.userDetail.Shelter[0].id}/profile`)
				}
			})
		}
	},[])
	useEffect(()=>{
		if(!user.isAuth) {
			Swal.fire({ icon: 'error', title: 'You need to be logged in to create a shelter' })
			setTimeout(async () => {
				navigate("/home")
				await loginWithPopup()
			}, 3500)
		}
	},[])

	const onSubmit = async () => {
		if (!user.isAuth) {
			Swal.fire({ icon: 'error', title: 'You need to be logged in to create a shelter' })
			setTimeout(async () => {
				navigate("/home")
				await loginWithPopup()
			}, 4500)

		}
		if (user.isAuth && !user.userDetail.Shelter.length && image.length && listAnimals.length) {
			const data = await location({ address: values.address, city: values.city, country: values.country });
			const { lat, lon } = data;
			const accessToken = await getAccessTokenSilently()
			const newShelter = { ...values, authorId: user.userDetail.id, profilePic: image, lat, lon, listAnimals };
			const newShelterCreated = await createShelter({ accessToken, newShelter }).unwrap()
			dispatch(addShelterAction(newShelterCreated));
			await Swal.fire({ icon: 'success', title: 'Shelter Created',
				preConfirm: () => {
					navigate("/home")
				} 
			})
		}
	}

	const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			name: "",
			description: "",
			city: "",
			country: "",
			address: "",
			website: "",
		},
		validationSchema: ongSchema,
		onSubmit,
	});
	const handleSelect =(e)=>{
		e.preventDefault();
		if(listAnimals.includes(e.target.value)) return;
		setListAnimals([...listAnimals, e.target.value])
	}
	const handlerDelete = (e) =>{
            setListAnimals(
                listAnimals.filter(a => a !== e.target.value)
			);
	}
	return (
		<div className="w-full min-h-screen h-fit text-black bg-white dark:bg-[#1b1a1f] dark:text-[#F0EEEE]">
			<div>
				<Navbar />
			</div>

			<div className="flex flex-col items-center justify-center min-w-full pt-0 cursor-pointer">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center h-auto min-w-full pt-6">
						<div className="animate-tracking-animation ">
							<h1 className="text-4xl text-black w-fit h-fit font-bold leading-6 hover:animate-pulse md:text-6xl dark:text-white">
								Create yo<span className="text-[#ff7272]">ur Shelter</span>
							</h1>
							
						</div>
					
					<div className="w-full h-full p-6 2xl:flex flex-row">
						<div className="flex flex-col w-full h-full items-center">
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0">
								<label className="block mb-2 text-xl font-bold   after:content-['*'] after:ml-0.5 after:text-red-500 ">
									Name
								</label>
								<div className="flex flex-col items-start w-full justify-arround justify-items-start">
									<input
										type="text"
										value={values.name}
										name="name"
										placeholder="Add name..."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-[#f7baba] w-full text-black border border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4"
									/>									
									<div className="w-full flex flex-start">
										{errors.name && (
											<p className="text-red-500 font-bold animate-errors-animation"> {errors.name}</p>
										)}
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0">
								<label className="block mb-2 text-xl font-bold after:content-['*'] after:ml-0.5 after:text-red-500 ">
									Country
								</label>
								<div className="flex flex-col items-start w-full justify-arround justify-items-start">
									<input
										type="text"
										value={values.country}
										name="country"
										placeholder="Add country.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-[#f7baba] w-full text-black border border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4"
									/>
									<div className="w-full flex flex-start ">
										{errors.country && (
											<p className="text-red-500 font-bold animate-errors-animation">{errors.country}</p>
										)}
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0">
								<label className="block mb-2  text-xl font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
									City
								</label>
								<div className="flex flex-col items-start w-full justify-arround justify-items-start">
									<input
										type="text"
										value={values.city}
										name="city"
										placeholder="Add city.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-[#f7baba] w-full border text-black border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4"
									/>
									<div className="w-full flex flex-start">
										{errors.city && <p className="text-red-500 font-bold animate-errors-animation">{errors.city}</p>}
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0 ">
								<label className="block mb-2 text-xl font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
									Address
								</label>
								<div className="flex flex-col items-start w-full justify-arround justify-items-start ">
									<input
										type="text"
										value={values.address}
										name="address"
										placeholder="Add address.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-[#f7baba] w-full border text-black border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4"
									/>
									<div className="w-full flex flex-start">
										{errors.address && (
											<p className="text-red-500 font-bold animate-errors-animation">{errors.address}</p>
										)}
									</div>
									
								</div>
							</div>
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0">
								<label className="block mb-2 text-xl font-bold">
									Website:{" "}
								</label>
								<div className="flex flex-col items-start w-full justify-arround justify-items-start">
									<input
										type="text"
										value={values.website}
										name="website"
										placeholder="Add website.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-[#f7baba] w-full text-black border border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4"
									/>
									<div className="w-full flex flex-start">
										{errors.website && (
											<p className="text-red-500 font-bold animation-pulse animate-errors-animation">{errors.website}</p>
										)}
									</div>
								</div>
							</div>
							<div className="w-full flex flex-col p-2 mb-4 lg:px-14 xl:px-32 2xl:p-0">
								<label className="block mb-2 text-xl font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
									Animals you help:{" "}
								</label>
								<div className="flex flex-col items-start w-full justify-start justify-items-start">

								<select
										name="animals"
										onChange={(e) => {handleSelect(e)}}
										className="bg-[#f7baba] w-full text-black border border-[#ff7272] text-sm rounded-lg focus:shadow-lg focus:shadow-pink-200 p-2.5 2xl:w-3/4">
										<option value="disabled" name="disabled" disabled selected>
											Select the types of animals you help
										</option>
										<option value="Dogs" name="Dogs">
											Dogs
										</option>
										<option value="Cats" name="Cats">
											Cats
										</option>
										<option value="Domestic Animals" name="Domestic Animals">
											Domestic Animals
										</option>
										<option value="Wild Animals" name="Wild Animals">
											Wild Animals
										</option>
										<option value="Farm Animals" name="Farm Animals">
											Farm Animals
										</option>
									</select>
									<div className="w-full flex flex-start">
										{!listAnimals.length && <p className="text-red-500 font-bold animate-errors-animation">Required Animals</p>}
									</div>
								</div>
								<div className="w-full mb-6 mt-6">
									{
										!listAnimals.length ? '' : (
											<div className="w-full 2xl:w-3/4">
												<label className="block mb-2 text-xl font-bold">Remove animals you help: </label>
												<div className="w-full sm:grid-cols-2 md:grid-cols-3 lg:flex items-center justify-evenly">
													{	
														listAnimals.map( a=>
															<button value={a} name={a} onClick={(e) =>{handlerDelete(e)}}
															className="pt-1 pb-1 pl-1 w-[160px] pr-1 mr-4 mt-2 text-black text-base font-bold transition  border border-[#ff7272] bg-[#f69c9c] rounded-md hover:bg-[#f34646] hover:text-white hover:animate-delete-animation"
																> {a}</button>
														)
													}
												</div>
											</div>
										)
									}
								</div>
									
							</div>
						</div>

						<div className="w-full flex flex-col mb-4 lg:px-14 xl:px-32 2xl:p-0">
							
								<div>
									<div className="mb-2">
									<label className="text-xl mb-6 pb-6 font-bold tracking-wide after:content-['*'] after:ml-0.5 after:text-red-500">
										Description
									</label>
									</div>
									<textarea
										name="description"
										placeholder="Add description.."
										value={values.description}
										onChange={handleChange}
										onBlur={handleBlur}
										className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-[#f7baba] bg-clip-padding border border-solid border-[#ff7272] rounded transitionease-in-out m-0 focus:text-[#080808] focus:border-gray-600 focus:outline-none focus:shadow-lg focus:shadow-pink-200"
										rows="3"></textarea>
										<div >
											{errors.description && (
												<p className="text-red-500 font-bold animate-errors-animation">{errors.description}</p>
											)}
										</div>
								</div>

								<div className="flex flex-col items-center p-14">
									<UploadImage image={image} setImage={setImage} />
									<div>
										{!image.length &&
											<p className="text-red-500 font-bold animate-errors-animation">Required Image</p>}
									</div>
								</div>
							
						</div>
					</div>

					{values.name !== "" &&
						Object.entries(errors).length === 0 &&
						values.description !== "" &&
						values.address !== "" &&
						values.city !== "" &&
						values.country !== "" &&
						image.length &&
						listAnimals.length > 0 ? (
						<div className="mt-0">
							<button
								type="submit"
								className="pt-1 pb-1 pl-2 w-32 pr-2 mr-4 mt-0 text-xl font-bold text-black transition bg-[#f7baba] rounded-md hover:bg-[#ff7272] border border-[#ff7272] animate-create-animation hover:animate-none">
								Create
							</button>
						</div>
					) : (
						<div className="animate-pulse hover:animate-none">
							<button
								className="pt-1 pb-1 pl-2 w-64 pr-2 mr-4 mt-0 text-white text-xl font-bold rounded-md bg-[#eb1414] border border-[#ed6868] ">
								Fields incompletes
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default OngForm
