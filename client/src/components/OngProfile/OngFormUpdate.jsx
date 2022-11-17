import React from "react";
import { useEffect, useState } from "react";
import {
  useLazyGetShelterByIdQuery,
  useUpdateShelterMutation,
} from "../../redux/api/shelters";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { ongSchema } from "../OngForm/validationOngForm";
import UploadImage from "./UploadImage";

const OngFormUpdate = ({
  name,
  country,
  city,
  address,
  website,
  description,
  setIsOpenDonate,
}) => {
  const [getShelterById, { data: details }] = useLazyGetShelterByIdQuery();
  const [updateShelter] = useUpdateShelterMutation();
  const { id } = useParams();
  const [image, setImage] = useState(details?.profilePic);
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    getShelterById(id);
  }, [getShelterById]);

  const onSubmit = () => {
    updateShelter({ updatedShelter: { ...values, profilePic: image }, id });
  };

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
    <div className="fixed left-10 flex flex-col items-center ml-5 border w-fit h-fit p-2 border-4 border-[#462312] rounded-lg ">
      <div className="border w-80 h-fit border-red-50">
        <div className="w-contain">
          <div>
            <UploadImage image={image} setImage={setImage} toggle={toggle} />
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col text-[#462312] font-semibold text-lg">
                <input
                  className="my-2"
                  defaultValue={name}
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  disabled={toggle}
                />
                {errors.name && <p className="text-red-500"> {errors.name}</p>}

                <input
                  className="my-2"
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
                  className="my-2"
                  defaultValue={city}
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={values.city}
                  disabled={toggle}
                />
                {errors.city && <p className="text-red-500"> {errors.city}</p>}

                <input
                  className="my-2"
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
                  className="my-2"
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
                <div className="flex w-full justify-end">
                  <div>
                    {!toggle && Object.entries(errors).length === 0 && (
                      <button
                        type="submit"
                        className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
                      >
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <button
          className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
          onClick={() => setToggle(!toggle)}
        >
          Edit
        </button>
      </div>
      <div className="flex items-center justify-between row">
        <button
          className="bg-transparent mt-4 hover:bg-[#462312] text-[#462312] font-semibold mx-2 hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded transition duration-300"
          onClick={() => setIsOpenDonate(true)}
        >
          Donate
        </button>
      </div>
    </div>
  );
};

export default OngFormUpdate;
