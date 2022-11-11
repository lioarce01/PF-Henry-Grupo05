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
    <div className='p-2'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Search" className="h-10 pl-2 pr-2 mr-4 text-black bg-white border-2 rounded-md outline-none border-slate-300" onChange={handleChange} value={input} />
        <button className="px-2 py-2 text-black transition duration-300 border-2 rounded-lg border-slate-300 hover:bg-slate-300" onClick={handleSubmit}><BsSearch/></button>
      </form>
    </div>
  )
}

export default SearchBar