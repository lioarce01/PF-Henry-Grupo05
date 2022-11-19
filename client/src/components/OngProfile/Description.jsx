
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useUpdateShelterMutation } from '../../redux/api/shelters';


function Description({ details, id}) {

    const [toggle, setToggle] = useState(true)
    const { userDetail } = useSelector((state) => state.localStorage.userState);
    console.log('User Details',userDetail)
    const [updateShelter] = useUpdateShelterMutation();
    const [input, setInput] = useState({
        description: details?.description,
      });
    const inputHandler = (e) => {
        e.preventDefault();
        setInput({ description: e.target.value });
      };
    
    const saveHandler = () =>
        updateShelter({
          updatedShelter: { ...details, description: input.description },
          id,
        });

  return (
		<div className="w-full mb-4 p-4 mt-4 bg-white shadow-xl shadow-[rgb(255,213,201)] rounded-2xl">
			<textarea
				className="text-lg font-semibold bg-white text-black resize-none w-[310px] h-60 lg:w-[600px] lg:h-60"
				type="text"
				name="description"
				onChange={inputHandler}
				defaultValue={details?.description}
				disabled={toggle}
				value={input.description}
				rows="1"
				cols="1"
			/>
			<div className="flex flex-row-reverse justify-between w-full">
				<div>
					{details.author.id === userDetail?.id && (
						<button
							className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
							onClick={() => setToggle(!toggle)}>
							Edit
						</button>
					)}
				</div>
				<div>
					{!toggle && (
						<button
							className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
							onClick={saveHandler}>
							Save
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Description