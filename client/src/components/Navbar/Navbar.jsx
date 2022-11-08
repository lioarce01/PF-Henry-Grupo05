import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between w-full p-4 text-white bg-gray-800 shadow-lg h-14'>
      <div>
        LOGO
      </div>
      <div>
        <SearchBar/>
      </div>
      <div className='flex items-center justify-center'>
        <button className='pt-1 pb-1 pl-2 pr-2 mr-4 transition border-2 rounded-md hover:bg-white hover:text-black duration 300'>DarkMode</button>
        <Link to="/home" className='pt-1 pb-1 pl-2 pr-2 mr-4 border-2 rounded-md hover:bg-white hover:text-black duration 300'>Home</Link>
        <Link to="/login" className='pt-1 pb-1 pl-2 pr-2 border-2 rounded-md hover:bg-white hover:text-black duration 300'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar