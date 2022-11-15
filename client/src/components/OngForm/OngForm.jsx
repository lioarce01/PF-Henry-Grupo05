import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ongSchema } from "./validationOngForm"
import { useFormik } from "formik"
import Navbar from "../Navbar/Navbar"
import UploadImage from "./UploadImage"
import { useAuth0 } from "@auth0/auth0-react"
import { useAddShelterMutation } from "../../redux/api/shelters";

const OngForm = () => {
	const [createShelter, { data, isLoading, error }] = useAddShelterMutation()
	const [image, setImage] = useState("")
	const navigate = useNavigate()
	const { isAuthenticated, getAccessTokenSilently } = useAuth0()

	const onSubmit = async () => {
		if (image.length && isAuthenticated) {
			console.log("submitted")
			console.log({ ...values, profilePic: image })
			const accessToken = await getAccessTokenSilently()
			await createShelter({accessToken, newShelter: { ...values, profilePic: image }}).then(res => alert('Shelter Created')).catch(() => alert('error'))
			navigate("/home")
		} else {
			alert("Please login")
		}
	}
	console.log(image)
	const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			name: "",
			authorId: "636cfde16804f7dc836bda73", //id user hardcodeado
			description: "",
			city: "",
			animals: "",
			country: "",
			goal: 0,
			address: "",
			website: "",
		},
		validationSchema: ongSchema,
		onSubmit,
	})
	console.log("values:", { ...values, profilePic: image })
	return (
		<div className="w-full min-h-screen h-fit bg-[#FAF2E7]">
			<div>
				<Navbar />
			</div>

			<div className="flex flex-col items-center justify-center min-w-full pt-14 md:col-span-2 md:mt-0">
				<form
					onSubmit={handleSubmit}
					className="flex flex-col items-center justify-center h-auto min-w-full pt-14 md:col-span-2 md:mt-0">
					<h1 className="text-lg text-4xl font-medium leading-6 text-black">
						Create your Shelter
					</h1>
					<div className="flex flex-row w-full h-full p-14">
						<div className="flex flex-col w-full h-full">
							<div className="w-full mb-6 ">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
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
										className="bg-gray-50 border w-2/4 border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6] dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.name && (
										<p className="text-red-500"> {errors.name}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
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
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.country && (
										<p className="text-red-500 ">{errors.country}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
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
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.city && <p className="text-red-500">{errors.city}</p>}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
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
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.address && (
										<p className="text-red-500">{errors.address}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black">
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
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.website && (
										<p className="text-red-500">{errors.website}</p>
									)}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black after:content-['*'] after:ml-0.5 after:text-red-500">
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
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
									/>
									{errors.goal && <p className="text-red-500">{errors.goal}</p>}
								</div>
							</div>
							<div className="w-full mb-6">
								<label className="block mb-2 text-xl font-medium text-black dark:text-black">
									Animals:{" "}
								</label>
								<div className="flex items-center">
									<select
										name="animals"
										onChange={handleChange}
										onBlur={handleBlur}
										className="bg-gray-50 w-2/4 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg[#EEEEE6]  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
										<option disabled selected>
											Select the types of animals you help
										</option>
										<option value="All" name="All">
											All
										</option>
										<option value="Dogs" name="Dogs">
											Dogs
										</option>
										<option value="Cats" name="Cats">
											Cats
										</option>
										<option value="Wild Animals" name="Wild Animals">
											Wild Animals
										</option>
										<option value="Farm Animals" name="Farm Animals">
											Farm Animals
										</option>
									</select>
								</div>
							</div>
						</div>

						<div className="flex flex-col w-full h-full">
							<div className="grid grid-cols-1 space-y-2">
								<div>
									<label className="text-xl  font-bold text-black tracking-wide after:content-['*'] after:ml-0.5 after:text-red-500">
										Description
									</label>
									<textarea
										name="description"
										placeholder="Add description.."
										value={values.description}
										onChange={handleChange}
										onBlur={handleBlur}
										className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700  bg-[#FAF2E7] bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-out m-0 focus:text-[#462312] focus:bg-[#FAF2E7] focus:border-gray-600 focus:outline-none"
										rows="3"></textarea>
									{errors.description && (
										<p className="text-red-500">{errors.description}</p>
									)}
								</div>

								<div>
									<UploadImage image={image} setImage={setImage} />
								</div>
							</div>
						</div>
					</div>
					{values.name !== "" &&
					Object.entries(errors).length === 0 &&
					values.description !== "" &&
					values.address !== "" &&
					values.city !== "" &&
					values.country !== "" ? (
						<div>
							<button
								type="submit"
								className="pt-1 pb-1 pl-2 w-32 pr-2 mr-4 mt-0 text-xl transition bg-[#FAF2E7] border border-[#ca7c62] rounded-md hover:bg-[#ca7c62] border border-[#fffefe] hover:text-black duration 300">
								Submit
							</button>
						</div>
					) : (
						<div>
							<button
								type="submit"
								className="pt-1 pb-1 pl-2 pr-2 mr-4 transition border border-white bg-[#FAF2E7] hidden rounded-md hover:bg-orange-100 hover:text-black duration 300"
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