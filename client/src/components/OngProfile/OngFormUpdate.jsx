import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDisableShelterMutation,
  useEnableShelterMutation,
  useLazyGetShelterByIdQuery,
  useUpdateShelterMutation,
} from "../../redux/api/shelters";
import { useParams, Link } from "react-router-dom";
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

  return (
		<div className="flex flex-col items-center w-9/12 mt-10 lg:mt-0 lg:w-full">
			<div className="w-full mb-2 h-fit lg:p-0 lg:min-w-0 lg:w-full lg:max-w-full">
				<div
					className="bg-white shadow-[rgba(255,213,201)] shadow-xl p-2 rounded-2xl lg:flex lg:items-center lg:flex-col
					lg:w-full lg:p-0 lg:border-2 lg:border-blue lg:max-w-full lg:min-w-[250px]"
				>
					{!toggle ? (
						<UploadImage
							image={image}
							setImage={setImage}
							toggle={toggle}
							className="lg:w-full lg:min-w-[250px]"
						/>
					) : (
						<img
							className="object-cover rounded-2xl lg:w-full lg:p-1 w-[300px] h-[300px]"
							src={details?.profilePic}
							alt="avatar"
						/>
					)}
					<div className="min-w-full">
						<form onSubmit={handleSubmit}>
							<div className="text-lg font-bold text-center text-black sm:text-2xl lg:text-lg">
								{!toggle && (
									<input
										className="min-w-full my-2 bg-white"
										defaultValue={name}
										type="text"
										name="name"
										onChange={handleChange}
										value={values.name}
										disabled={toggle}
									/>
								)}
								{toggle && (
									<p className="min-w-full pl-2 my-2 bg-white cursor-default">
										{values.name}
									</p>
								)}
								{errors.name && <p className="text-red-500"> {errors.name}</p>}
							</div>
						</form>
					</div>
				</div>
				<div className="bg-white shadow-[rgba(255,213,201)] shadow-xl p-2 rounded-2xl mt-2 lg:w-full lg:flex lg:flex-col">
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col text-xs font-semibold text-black sm:text-base lg:w-full">
							<div className="flex flex-row items-baseline">
								<label className="text-[#d45f37]">Country: </label>
								{!toggle && (
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
										defaultValue={country}
										type="text"
										name="country"
										onChange={handleChange}
										value={values.country}
										disabled={toggle}
									/>
								)}
								{toggle && (
									<p className="w-full pl-4 my-2 bg-white cursor-default lg:my-1">
										{values.country}
									</p>
								)}
								{errors.name && <p className="text-red-500"> {errors.name}</p>}
								{errors.country && (
									<p className="text-red-500"> {errors.country}</p>
								)}
							</div>
							<div className="flex flex-row items-baseline">
								<label className="text-[#d45f37]">City: </label>
								{!toggle && (
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
										defaultValue={city}
										type="text"
										name="city"
										onChange={handleChange}
										value={values.city}
										disabled={toggle}
									/>
								)}
								{toggle && (
									<p className="w-full pl-4 my-2 bg-white cursor-default lg:my-1">
										{values.city}
									</p>
								)}
								{errors.city && <p className="text-red-500"> {errors.city}</p>}
							</div>
							<div className="flex flex-row items-baseline">
								<label className="text-[#d45f37]">Address: </label>
								{!toggle && (
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
										defaultValue={address}
										type="text"
										name="address"
										onChange={handleChange}
										value={values.address}
										disabled={toggle}
									/>
								)}
								{toggle && (
									<p className="w-full pl-4 my-2 bg-white cursor-default lg:my-1">
										{values.address}
									</p>
								)}
								{errors.address && (
									<p className="text-red-500"> {errors.address}</p>
								)}
							</div>

							<div className="flex flex-row items-baseline w-full">
								<label className="text-[#d45f37]">Website: </label>
								{!toggle && (
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
										defaultValue={website}
										type="text"
										name="website"
										onChange={handleChange}
										value={values.website}
										disabled={toggle}
									/>
								)}
								{toggle && (
									<a target="_blank" rel="noreferrer" className="w-full pl-4 my-2 truncate bg-white cursor-pointer lg:my-1" href={values.website}>{values.website}</a>
									// <Link
									// 	to={{ pathname: `${values.website}` }}
									// 	target="_blank"
									// 	className="w-9/12 "
									// >
									// 	<p className="w-full pl-4 my-2 truncate bg-white cursor-pointer lg:my-1">
									// 		{values.website}
									// 	</p>
									// </Link>
								)}
								{errors.website && (
									<p className="text-red-500"> {errors.website}</p>
								)}
							</div>
						</div>
						{!toggle && Object.entries(errors).length === 0 && (
							<button
								type="submit"
								className="text-xs sm:text-lg my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
							>
								Save
							</button>
						)}
						{shelter.author.id === userDetail?.id && (
							<button
								className="text-xs sm:text-lg my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
								onClick={() => setToggle(!toggle)}
							>
								Edit
							</button>
						)}
					</form>
					{userDetail.role === "Admin" ||
					shelter.author.id === userDetail.id ? (
						<div className="flex flex-row justify-end w-full text-xs sm:text-sm">
							<>
								{shelter.enable ? (
									<button
										onClick={() => disableShelter({ shelterId: id })}
										className="bg-transparent hover:bg-[#d32727] bg-[#b90707] text-white transition duration-300 
								font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded-lg flex flex-row 
								items-center justify-center border lg:text-sm lg:border-transparent "
									>
										Disable
										<span className="pl-2">
											<MdDomainDisabled />
										</span>
									</button>
								) : (
									<button
										onClick={() => enableShelter({ shelterId: id })}
										className="bg-transparent hover:bg-[#24c531] bg-[#22b92f] transition duration-300 text-white 
								font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded-lg flex flex-row 
								items-center justify-center lg:text-sm lg:border-transparent"
									>
										Enable
										<span className="pl-2">
											<MdOutlineDomain />
										</span>
									</button>
								)}
							</>
						</div>
					) : null}
				</div>
			</div>
			{shelter.author.id !== userDetail?.id && (
				<div className="relative flex items-center justify-between min-w-full row w-80 ">
					<div className="fixed inset-x-0 bottom-0  sm:bottom-0 z-[61] lg:left-4 lg:bottom-2">
						<button
							className="my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-4 px-8  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
							onClick={() => setIsOpenDonate(true)}
						>
							Support Us!!
						</button>
					</div>
					<div className="fixed  inset-x-0 bottom-0 sm:bottom-0  z-[60] lg:left-4 lg:bottom-2">
						<button className="my-2 mx-auto animate-custom-ping hover:animate-none w-full bg-[#ca7c62] text-gray-100 hover:text-white py-4 px-8  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300">
							Support Us!!
						</button>
					</div>
				</div>
			)}
		</div>
	)
};

export default OngFormUpdate;
