import React, { useState } from "react";
import { PuffLoader } from "react-spinners";
import { uploadImage } from "../../utils";


const UploadImage = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setLoading(true);
    const { image } = await uploadImage("preset_posts", e.target.files[0]);
    setImage(image);
    setLoading(false);
  };

  const resetImage = () => setImage(false);

  return (
    <div className="grid grid-cols-1 flex items-center space-y-2">
      <label className="text-xl flex items-center pb-6 font-bold text-black tracking-wide after:content-['*'] after:ml-0.5 after:text-red-500">
        Upload image
      </label>
      {image && (
        <button
          type="button"
          onClick={resetImage}
          className="text-blue-400 w-fit px-2  mx-auto border border-[#FAF2E7] rounded-xl hover:border-blue-100"
        >
          reset
        </button>
      )}
      <div className="flex items-center justify-center w-full">
        {image ? (
          <img alt="uplouted" src={image} />
        ) : loading ? (
          <PuffLoader color="#ed6825" loading size={240} />
        ) : (
          <label
            draggable="true"
            className="flex flex-col rounded-lg  border-4 border-dashed border-[#f06311] w-full h-60 p-10 group text-center cursor-pointer"
          >
            <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
              <div className="flex flex-auto max-h-48 w-2/5 mx-auto ">
                <img
                  className="has-mask h-36 object-center"
                  src="https://i.pinimg.com/originals/00/65/ee/0065ee133294c73fe29dbab81dc6acc9.png"
                  alt="freepik"
                />
              </div>
              <p className="pointer-none text-gray-500 ">
                      <p
                        className="text-[#000000] font-bold"
                      >
                        select a file
                      </p>{" "}
                      from your computer
              </p>
            </div>
            <input
              onChange={handleChange}
              accept="image/*"
              multiple
              draggable
              type="file"
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
