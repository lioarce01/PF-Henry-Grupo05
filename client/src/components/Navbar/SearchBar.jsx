import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSheltersByNameAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions';
import { BsSearch } from 'react-icons/bs'

const SearchBar = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSheltersByNameAction(input))
    setInput('')
  }

  return (
    <div className='w-full p-2'>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-row justify-center">
        <input type="text" placeholder="Search" className="w-[65%] h-10 pl-2 pr-2 mr-4 text-black bg-[#fcfaf6] border-2 rounded-md outline-none  border-[#FAF2E7] placeholder-gray-500 placeholder-opacity-50" onChange={handleChange} value={input} />
        <button className="px-6 py-2 text-black transition duration-300 border-2 rounded-md bg-[#fffcf7] hover:border-[#fffcf7] border-[#fffcf7] hover:bg-[#FAF2E7]" onClick={handleSubmit}><BsSearch className='w-5 h-5'/></button>
      </form>
    </div>
  )
}

export default SearchBar