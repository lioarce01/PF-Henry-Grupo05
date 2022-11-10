import React, { useState } from 'react'

const SearchBar = () => {
  const [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(input)
  }

  return (
    <div className='p-2'>
      <input type="text" placeholder="Search" className="h-10 pl-2 pr-2 mr-4 text-black bg-white border-2 rounded-md outline-none border-slate-300" onChange={handleChange} value={input}/>
      <button className="px-4 py-1.5 text-black border-2 border-slate-300 rounded-md hover:bg-slate-300 transition duration-300" onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default SearchBar