import React from "react";
import { useEffect, useState } from "react";
import {
  useUpdateShelterMutation,
} from "../../../redux/api/shelters";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ongSchema } from "./validationOngFormUpdate.js";
import UploadImage from "./UploadImage";
import Swal from "sweetalert2"


const FormUpdateShelter = ({
  details,
  shelterRefetch
}) => {
  //const [getShelterById, { data: details }] = useLazyGetShelterByIdQuery();
  const [updateShelter] = useUpdateShelterMutation();
  const { id } = useParams();
  const [image, setImage] = useState(details?.profilePic);
  const [toggle, setToggle] = useState(true);

  useEffect(()=>{
    return(()=>{
        shelterRefetch();
    })
  },[])

  const onSubmit = () => {
    updateShelter({ updatedShelter: { ...values, profilePic: image }, id });
    Swal.fire({ icon: "success", title: "Shelter Updated!", 
    // preConfirm: () => {
    //     shelterRefetch();
    // }
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
		<div className="flex flex-col items-center  lg:w-[600px] mt-4 lg:mt-4 lg:mt-0 lg:w-full">
			<div className="w-full mb-2 lg:my-4 h-fit lg:p-0 lg:min-w-0 lg:w-full lg:max-w-full flex flex-row justify-center ">
				<div className="bg-white shadow-[rgba(255,213,201)] shadow-xl p-2 rounded-2xl mt-2 lg:w-[85%] lg:flex lg:flex-col lg:items-center">
                    <div className="lg:w-[450px] lg:h-fit rounded-lg">
						<UploadImage
							image={image}
							setImage={setImage}
							toggle={toggle}
							className="object-cover"
						/>
                    </div>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col text-xs font-semibold text-black sm:text-base lg:w-[450px]">
                            <div className="flex flex-row items-baseline">
                                <label className="text-[#d45f37]">Name:</label>
                                <div className="flex flex-col w-full">
                                <input
										className="w-full my-2 bg-white indent-4"
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
								<label className="text-[#d45f37]">Country: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
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
								<label className="text-[#d45f37]">City: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
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
								<label className="text-[#d45f37]">Address: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
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

                            <div className="flex flex-col justify-start text-left w-full">
                                <label className="text-[#d45f37]">Descrption: </label>
                                <div className="flex flex-col w-full">
                                <textarea
				                    className="w-full text-xs sm:text-lg font-semibold text-black bg-white resize-none h-28 indent-4"
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
								<label className="text-[#d45f37]">Website: </label>
                                <div className="flex flex-col w-full">
									<input
										className="w-full my-2 bg-white indent-4 lg:my-1"
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
                            {Object.entries(errors).length === 0 &&
                                <button type="submit"> Save</button>}
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};

export default FormUpdateShelter;