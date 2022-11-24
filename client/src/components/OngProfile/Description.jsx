import { useState } from 'react'
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
		<div className="w-9/12 mb-4 p-4 mt-4 lg:w-full lg:p-2 lg:mt-0 bg-white shadow-xl shadow-[rgb(255,213,201)] rounded-2xl">
			<textarea
				className="w-full text-xs sm:text-lg font-semibold text-black bg-white resize-none h-52 sm:h-60"
				type="text"
				name="description"
				onChange={inputHandler}
				defaultValue={details?.description}
				disabled={toggle}
				value={input.description}
				rows="1"
				cols="1"
			/>
			<div className="flex flex-row-reverse text-xs sm:text-lg justify-between w-full">
				<div>
					{details.author.id === userDetail?.id && (
						<button
							className="my-0 sm:my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
							onClick={() => setToggle(!toggle)}>
							Edit
						</button>
					)}
				</div>
				<div>
					{!toggle && (
						<button
						className="my-0 sm:my-2 mx-auto w-full bg-[#ca7c62] text-gray-100 hover:text-white py-2 px-4  rounded-lg tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
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