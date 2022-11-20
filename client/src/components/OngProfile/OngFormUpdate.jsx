import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDisableShelterMutation,
  useEnableShelterMutation,
  useLazyGetShelterByIdQuery,
  useUpdateShelterMutation,
} from "../../redux/api/shelters";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ongSchema } from "./validationOngFormUpdate.js";
import UploadImage from "./UploadImage";
import { RiUserUnfollowLine } from "react-icons/ri";
import { MdDomainDisabled, MdOutlineDomain } from "react-icons/md";
import { useLazyGetUserByIdQuery } from "../../redux/api/users";
import { setUserAction } from "../../redux/slices/manageUsers/actions";

const OngFormUpdate = ({
  name,
  country,
  city,
  address,
  website,
  description,
  setIsOpenDonate,
  shelter,
}) => {
  const [getShelterById, { data: details }] = useLazyGetShelterByIdQuery();
  const [updateShelter] = useUpdateShelterMutation();
  const { id } = useParams();
  const [image, setImage] = useState(details?.profilePic);
  const [toggle, setToggle] = useState(true);
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const [getUser] = useLazyGetUserByIdQuery()
  const dispatch = useDispatch()
  

  useEffect(() => {
    getShelterById(id);
  }, [getShelterById]);

  const onSubmit = () => {
    updateShelter({ updatedShelter: { ...values, profilePic: image }, id });
  };

  const [enableShelter] = useEnableShelterMutation();
  const [disableShelter] = useDisableShelterMutation();

  const enable = async (id) => {
	await enableShelter(id).unwrap()
	let newUser = await getUser(userDetail.id).unwrap()
	dispatch(setUserAction(newUser, true))
  }

  const disable = async(id) => {
	await disableShelter(id).unwrap()
	let newUser = await getUser(userDetail.id).unwrap()
	dispatch(setUserAction(newUser, true))
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name,
      description,
      city,
      country,
      address,
      website,
    },
    validationSchema: ongSchema,
    onSubmit,
  });
  console.log(errors);

  return (
		<div className="flex mt-20 bg-white flex-col shadow-[rgba(255,213,201)] shadow-xl items-center p-2 rounded-2xl">
			<div className="p-2 w-80 h-fit">
				<div className="w-contain">
					<div>
						{
							!toggle ? <UploadImage image={image} setImage={setImage} toggle={toggle} /> : <img
							className=""
							src={details?.profilePic}
							alt="avatar"
						/>
						}
						
					</div>
					<div>
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col text-lg font-semibold text-black">
								<input
									className="my-2 bg-white"
									defaultValue={name}
									type="text"
									name="name"
									onChange={handleChange}
									value={values.name}
									disabled={toggle}
								/>
								{errors.name && <p className="text-red-500"> {errors.name}</p>}

								<input
									className="my-2 bg-white"
									defaultValue={country}
									type="text"
									name="country"
									onChange={handleChange}
									value={values.country}
									disabled={toggle}
								/>
								{errors.country && (
									<p className="text-red-500"> {errors.country}</p>
								)}

								<input
									className="my-2 bg-white"
									defaultValue={city}
									type="text"
									name="city"
									onChange={handleChange}
									value={values.city}
									disabled={toggle}
								/>
								{errors.city && <p className="text-red-500"> {errors.city}</p>}

								<input
									className="my-2 bg-white"
									defaultValue={address}
									type="text"
									name="address"
									onChange={handleChange}
									value={values.address}
									disabled={toggle}
								/>
								{errors.address && (
									<p className="text-red-500"> {errors.address}</p>
								)}

								<input
									className="my-2 bg-white"
									defaultValue={website}
									type="text"
									name="website"
									onChange={handleChange}
									value={values.website}
									disabled={toggle}
								/>
								{errors.website && (
									<p className="text-red-500"> {errors.website}</p>
								)}
								<div className="flex justify-end w-full">
								</div>
							</div>
										{!toggle && Object.entries(errors).length === 0 && (
											<button
												type="submit"
												className="my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300">
												Save
											</button>
										)}
						</form>
					</div>
				</div>
				{shelter.author.id === userDetail?.id && (
					<button
					className="my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
						onClick={() => setToggle(!toggle)}>
						Edit
					</button>
				)}
			</div>
			<div className="flex items-center justify-between row">
				<button
					className="my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
					onClick={() => setIsOpenDonate(true)}>
					Donate
				</button>

				{userDetail.role === "Admin" || shelter.author.id === userDetail.id ? (
					<>
						{shelter.enable ? (
							<button
								onClick={() => disableShelter({ shelterId: id })}
								className="bg-transparent hover:bg-[#d32727] bg-[#b90707] text-white transition duration-300 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded-lg flex flex-row items-center justify-center border">
								Disable
								<span className="pl-2">
									<MdDomainDisabled />
								</span>
							</button>
						) : (
							<button
								onClick={() => enableShelter({ shelterId: id })}
								className="bg-transparent hover:bg-[#24c531] bg-[#22b92f] transition duration-300 text-white font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded-lg flex flex-row items-center justify-center">
								Enable
								<span className="pl-2">
									<MdOutlineDomain />
								</span>
							</button>
						)}
					</>
				) : null}
			</div>
		</div>
	)
};

export default OngFormUpdate;
