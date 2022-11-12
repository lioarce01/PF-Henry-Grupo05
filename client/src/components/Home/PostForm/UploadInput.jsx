import React from 'react';
import { uploadImage } from '../../../utils';

const UploadImage = ({image, setImage}) => {

    const handleChange = async  (e) => {
        const {image} = await uploadImage('preset_posts', e.target.files[0])
        setImage(image)
    }
    
    const resetImage = () => setImage(false) 

    return ( 
        <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-[#462312] tracking-wide">
                Upload image
              </label>
              {image && <button type='button' onClick={resetImage} className='text-blue-400 w-fit px-2  mx-auto border border-[#FAF2E7] rounded-xl hover:border-blue-100'>reset</button>}
              <div className="flex items-center justify-center w-full">
                {image ? (<img  alt='uplouted' src={image} />)
                :
                <label draggable='true'  className="flex flex-col rounded-lg border-[#E1D7D3] border-4  border-dashed w-full h-60 p-10 group text-center cursor-pointer">
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
                        className="text-[#462312] font-bold"
                      >
                        select a file
                      </p>{" "}
                      from your computer
                    </p>
                  </div>
                  <input onChange={handleChange} accept='image/*'  multiple draggable type="file" className="hidden" />
                </label>
                }
              </div>
            </div>
     );
}
 
export default UploadImage;