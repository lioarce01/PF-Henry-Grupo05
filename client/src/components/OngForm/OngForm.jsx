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
	console.log(user)
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
		if (user.isAuth && !user.userDetail.Shelter.length) {
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
			goal: 1,
			address: "",
			website: "",
		},

		validationSchema: ongSchema,
		onSubmit,
	});
    console.log({ ...values, authorId: user.userDetail.id, profilePic: image, listAnimals });
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
		<div className="w-full min-h-screen h-fit bg-[#fff5f4]">
			<div>
				<Navbar />
			</div>

			<div className="flex flex-col items-center justify-center min-w-full pt-14 md:col-span-2 md:mt-0">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center h-auto min-w-full pt-14 md:col-span-2 md:mt-0">
					<h1 className="text-4xl font-bold leading-6 text-black">
						Create your Shelter
					</h1>
					<div className="flex flex-row w-full h-full p-14">
						<div className="flex flex-col w-full h-full">
							<div className="w-full mb-6 ">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									Name
								</label>
								<div className="flex items-center w-full justify-arround">
									<input
										type="text"
										value={values.name}
										name="name"
										placeholder="Add name..."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg[#f8cdcd] w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:bg[#f8cdcd] focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd] dark:border-gray-600  dark:text-black dark:focus:bg[#f8cdcd] dark:focus:border-blue-500"
									/>
									{errors.name && (
										<p className="text-red-500 font-bold"> {errors.name}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									Country
								</label>
								<div className="flex items-center">
									<input
										type="text"
										value={values.country}
										name="country"
										placeholder="Add country.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.country && (
										<p className="text-red-500 font-bold">{errors.country}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2  text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									City
								</label>
								<div className="flex items-center">
									<input
										type="text"
										value={values.city}
										name="city"
										placeholder="Add city.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.city && <p className="text-red-500 font-bold">{errors.city}</p>}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									Address
								</label>
								<div className="flex items-center">
									<input
										type="text"
										value={values.address}
										name="address"
										placeholder="Add address.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.address && (
										<p className="text-red-500 font-bold">{errors.address}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black">
									Website:{" "}
								</label>
								<div className="flex items-center">
									<input
										type="text"
										value={values.website}
										name="website"
										placeholder="Add website.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.website && (
										<p className="text-red-500 font-bold">{errors.website}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									Goal
								</label>
								<div className="flex items-center">
									<input
										type="number"
										value={values.goal}
										name="goal"
										min="1"
										placeholder="Add goal.."
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#f8cdcd]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.goal && <p className="text-red-500 font-bold">{errors.goal}</p>}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-bold text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
									Animals you help:{" "}
								</label>
								<div className="flex items-center">

								<select
										name="animals"
										onChange={(e) => {handleSelect(e)}}
										className="bg-gray-50 w-3/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
										<option disabled selected>
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
									{!listAnimals.length && <p className="text-red-500 font-bold">Required Animals</p>}
								</div>
								<div className="w-full mb-6 mt-6">
									{
										!listAnimals.length ? '' : (
											<div >
												<label className="block mb-2 text-xl font-bold text-black dark:text-black">Remove animals you help: </label>
												<div className="w-3/4 flex items-center justify-around">
													{	
														listAnimals.map( a=>
															<button value={a} name={a} onClick={(e) =>{handlerDelete(e)}}
															className="pt-1 pb-1 pl-2 w-fit pr-2 mr-4 mt-2 text-base transition  border border-[#f8cdcd] bg-[#fff5f4] rounded-md hover:bg-[#f8cdcd] border border-[#fffefe] hover:text-black duration 300"
																> X {a}</button>
														)
													}
												</div>
											</div>
										)
									}
								</div>
									
							</div>
						</div>

						<div className="flex flex-col w-full h-full">
							<div className="grid grid-cols-1 space-y-2">
								<div>
									<label className="text-xl pb-6 font-bold text-black tracking-wide after:content-['*'] after:ml-0.5 after:text-red-500">
										Description
									</label>
									<textarea
										name="description"
										placeholder="Add description.."
										value={values.description}
										onChange={handleChange}
										onBlur={handleBlur}
										className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-[#fff5f4] bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-out m-0 focus:text-[#080808] focus:bg-[#fbe4e2] focus:border-gray-600 focus:outline-none"
										rows="3"></textarea>
									{errors.description && (
										<p className="text-red-500 font-bold">{errors.description}</p>
									)}
								</div>

								<div className="flex flex-col items-center p-14">
									<UploadImage image={image} setImage={setImage} />
									{!image.length &&
										<p className="text-red-500 font-bold">Required Image</p>}
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
						listAnimals.length ? (
						<div className="mt-0">
							<button
								type="submit"
								className="pt-1 pb-1 pl-2 w-32 pr-2 mr-4 mt-0 text-xl transition bg-[#fff5f4] rounded-md hover:bg-[#f8cdcd] border border-[#fffefe] hover:text-black duration 300">
								Submit
							</button>
						</div>
					) : (
						<div>
							<button
								type="submit"
								className="pt-1 pb-1 pl-2 pr-2 mr-4 transition border border-white bg-[#fff5f4] hidden rounded-md hover:bg-orange-100 hover:text-black duration 300"
								disabled>
								Submit
							</button>
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default OngForm
