import React from 'react';
import { uploadImage } from '../../../utils';

const UploadImage = ({image, setImage, toogle, setToggle}) => {

    const handlerChange = async  (e) => {
        const {image} = await uploadImage('preset_posts', e.target.files[0])
        setImage(image)
        setToggle(true)
    }
    
    const resetImage = () => {
      setImage(false)
      setToggle(false)
    } 

    return ( 
        <div className="grid grid-cols-1 space-y-2">
              
              <div className="flex items-center justify-center w-full">
                {image ? (<img  alt='uplouted' src={image} className="rounded-lg w-full max-h-[275px]" />)
                :
                <label draggable='true'  className="flex flex-col lg:mt-2 rounded-lg dark:border-[#E06161] border-[#FF7272] border-4  border-dashed w-full h-60 p-10 group text-center cursor-pointer">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto ">
                      <img
                        className="has-mask h-36 object-center dark:invert"
                        src="https://i.pinimg.com/originals/00/65/ee/0065ee133294c73fe29dbab81dc6acc9.png"
                        alt="freepik"
                      />
                    </div>
                    <p className="pointer-none text-base sm:text-lg dark:text-[#F0EEEE] text-#838788 ">
                      <p
                        className="dark:text-white text-black text-base sm:text-lg font-bold"
                      >
                        select a file
                      </p>{" "}
                      from your computer
                    </p>
                  </div>
                  <input onChange={handlerChange} accept='image/*'  multiple draggable type="file" className="hidden" />
                </label>
                }
              </div>
              <div className='flex justify-end '><div>
                
              {(image && !toogle) && <button type='button' onClick={resetImage} 
              className="dark:bg-[#E06161] bg-[#FF7272] hover:bg-[#e76464] transition-all hover:scale-[1.05] duration-300 text-white font-semibold text-xs sm:text-base py-1 px-4  rounded-full mx-auto"
              >Reset</button>}
              </div></div>
            </div>
     );
}
 
export default UploadImage;