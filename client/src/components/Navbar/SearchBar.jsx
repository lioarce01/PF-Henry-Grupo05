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
    <div>
      <input type="text" placeholder="Search" className="h-10 pl-2 pr-2 text-black bg-white border-2 rounded-md outline-none w-72" onChange={handleChange} value={input}/>
      <button className="p-2 px-4 ml-2 text-white border-2 border-white rounded-md" onClick={handleSubmit}>Search</button>
    </div>
  )
}

export default SearchBar