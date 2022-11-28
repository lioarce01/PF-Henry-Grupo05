import React from "react";
import { useEffect, useState } from "react";
import {
  useUpdateShelterMutation,
} from "../../../redux/api/shelters";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { ongSchema } from "./validationOngFormUpdate.js";
import UploadImage from "./UploadImage";
import Swal from "sweetalert2"
import location from '../../OngForm/location'


const FormUpdateShelter = ({
  details,
  shelterRefetch
}) => {
  //const [getShelterById, { data: details }] = useLazyGetShelterByIdQuery();
  const [updateShelter] = useUpdateShelterMutation();
  const { id } = useParams();
  const [image, setImage] = useState(details?.profilePic);
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    return(()=>{
        shelterRefetch();
    })
  },[])

  const newCoords = async (e) =>{
	e.preventDefault();
	e.stopPropagation();
	const data = await location({ address: values.address, city: values.city, country: values.country });
	const { lat, lon } = data;
	updateShelter({updatedShelter:{lat: lat, lon: lon,address: values.address, city: values.city, country: values.country }, id})
	Swal.fire({icon:'success',
			  title: 'Shelter´s Coordinates Saved!',
			  preConfirm: ()=>{
				navigate(0)
			  }
			})
  }

  const onSubmit = () => {
    updateShelter({ updatedShelter: { ...values, profilePic: image }, id });
    Swal.fire({ icon: "success", title: "Shelter Updated!", 
	preConfirm: ()=>{
		navigate(0)
	  }
    });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: details?.name,
      description: details?.description,
      city: details?.city,
      country: details?.country,
      address: details?.address,
      website: details?.website,
    },
    validationSchema: ongSchema,
    onSubmit,
  });
  console.log(errors);

  return (
		<div className="flex flex-col items-center  lg:w-[600px] my-4 lg:mt-4 lg:mt-0 lg:w-full">
			<div className="w-full mb-2 lg:my-4 h-fit lg:p-0 lg:min-w-0 lg:w-full lg:max-w-full flex flex-row justify-center ">
				<div className="dark:bg-[#1B1A1F] bg-white dark:shadow-[#E06161] shadow-[#FF7272] shadow-xl p-2 rounded-2xl mt-2 lg:w-[85%] lg:flex lg:flex-col lg:items-center">
                    <div className="lg:w-[450px] lg:h-fit rounded-lg">
						<UploadImage
							image={image}
							setImage={setImage}
							toggle={toggle}
							setToggle={setToggle}
							className="object-cover"
						/>
                    </div>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col text-xs font-semibold dark:text-[#F0EEEE] text-black sm:text-base lg:w-[450px]">
                            <div className="flex flex-row items-baseline">
                                <label className="dark:text-white text-[#FF7272]">Name:</label>
                                <div className="flex flex-col w-full">
                                <input
										className="w-full my-2 dark:bg-[#1B1A1F] bg-white indent-4"
										defaultValue={details?.name}
										type="text"
										name="name"
										onChange={handleChange}
										value={values.name}
									/>
								{errors.name && <p className="text-red-500"> {errors.name}</p>}
                                </div>
                            </div>
							<div className="flex flex-row items-baseline">
								<label className="dark:text-white text-[#FF7272]">Country: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 dark:bg-[#1B1A1F] bg-white indent-4 lg:my-1"
										defaultValue={details?.country}
										type="text"
										name="country"
										onChange={handleChange}
										value={values.country}
									/>
								{errors.country && (
									<p className="text-red-500"> {errors.country}</p>
								)}
                            </div>
							</div>
							<div className="flex flex-row items-baseline">
								<label className="dark:text-white text-[#FF7272]">City: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 dark:bg-[#1B1A1F] bg-white indent-4 lg:my-1"
										defaultValue={details?.city}
										type="text"
										name="city"
										onChange={handleChange}
										value={values.city}
									/>
								{errors.city && <p className="text-red-500"> {errors.city}</p>}
                                </div>
							</div>

							<div className="flex flex-row items-baseline">
								<label className="dark:text-white text-[#FF7272]">Address: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 dark:bg-[#1B1A1F] bg-white indent-4 lg:my-1"
										defaultValue={details?.address}
										type="text"
										name="address"
										onChange={handleChange}
										value={values.address}
									/>
								{errors.address && (
									<p className="text-red-500"> {errors.address}</p>
								)}
                                </div>
							</div>
									<button
									onClick={newCoords}
									className={(!errors.city && !errors.address && !errors.country)?
										"dark:bg-[#E06161] bg-[#FF7272] hover:bg-[#e76464] transition-all hover:scale-[1.05] duration-300 text-white font-semibold text-xs sm:text-base py-1 px-4  rounded-full mx-auto"
										:"bg-[#FF7272] text-white font-semibold text-xs sm:text-base py-1 px-4  rounded-full mx-auto opacity-50 cursor-default"}
									>
										Set New Coordinates
									</button>
                            <div className="flex flex-col justify-start text-left w-full">
                                <label className="dark:text-white text-[#FF7272]">Description: </label>
                                <div className="flex flex-col w-full">
                                <textarea
				                    className="w-full text-xs sm:text-lg font-semibold dark:text-[#F0EEEE] text-black dark:bg-[#1B1A1F] bg-white resize-none h-28 indent-4"
				                    type="text"
				                    name="description"
				                    onChange={handleChange}
				                    defaultValue={details?.description}
				                    value={values.description}
				                    rows="1"
				                    cols="1"
			                        />
                                {errors.description && (
									<p className="text-red-500"> {errors.description}</p>
								)}
                                </div>
                            </div>

							<div className="flex flex-row items-baseline w-full">
								<label className="dark:text-white text-[#FF7272]">Website: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 dark:bg-[#1B1A1F] bg-white indent-4 lg:my-1"
										defaultValue={details?.website}
										type="text"
										name="website"
										onChange={handleChange}
										value={values.website}
									/>
								{errors.website && (
									<p className="text-red-500"> {errors.website}</p>
								)}
                                </div>
							</div>
                                <button type="submit" disabled={!toggle}
								className={(Object.entries(errors).length === 0 && toggle)?"dark:bg-[#E06161] bg-[#FF7272] hover:bg-[#e76464] transition-all hover:scale-[1.05] duration-300 text-white font-semibold text-xs sm:text-base py-1 px-4  rounded-full mx-auto"
								:"bg-[#FF7272] text-white font-semibold text-xs sm:text-base py-1 px-4  rounded-full mx-auto opacity-50 cursor-default"}
								> Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};

export default FormUpdateShelter;