
import React, { useState } from 'react'
import { useUpdateShelterMutation } from '../../redux/api/shelters';

function Description({ details, id}) {

    const [toggle, setToggle] = useState(true)
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
    <div className="w-full border-4 border-[#462312] rounded-lg p-4">
    <textarea
      className="w-full resize-none h-60 text-[#462312] font-semibold text-lg"
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
        <button
          className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
          onClick={() => setToggle(!toggle)}
        >
          Edit
        </button>
      </div>
      <div>
        {!toggle && (
          <button
            className="bg-transparent hover:bg-[#462312] text-[#462312] font-semibold hover:text-white py-1 px-4 border border-[#462312] hover:border-transparent rounded mx-auto"
            onClick={saveHandler}
          >
            Save
          </button>
        )}
      </div>
    </div>
  </div>
  )
}

export default Description