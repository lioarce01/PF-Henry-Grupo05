import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getSheltersByNameAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions';
import { BsSearch } from 'react-icons/bs'

const SearchBar = () => {
  const dispatch = useDispatch();
  
  const [input, setInput] = useState('')
  
  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getSheltersByNameAction(input));
  }

  return (
    <div className='p-2'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Search" className="h-10 pl-2 pr-2 mr-4 text-black bg-white border-2 rounded-md outline-none border-slate-300" onChange={handleChange} value={input}/>
        <button className="px-2 py-2 text-black border-2 border-slate-300 rounded-lg hover:bg-slate-300 transition duration-300" onClick={handleSubmit}><BsSearch/></button>
      </form>
    </div>
  )
}

export default SearchBar