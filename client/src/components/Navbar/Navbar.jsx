import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BsSun} from 'react-icons/bs'
import {HiMoon} from 'react-icons/hi'
import {AiOutlineMenu} from 'react-icons/ai'

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  
  return (
    <div className='fixed flex items-center justify-between w-full p-4 px-10 text-white bg-transparent shadow-lg backdrop-blur-sm h-14'>
      <div>
        LOGO
      </div>
      <div className='flex items-center justify-center'>
        {
          toggle 
          ? <button className='px-1.5 py-1.5 mr-4 transition border-2 rounded-md hover:bg-white hover:text-black duration 300' onClick={handleToggle}><BsSun className='text-xl'/></button>
          : <button className='px-1.5 py-1.5 mr-4 transition border-2 rounded-md hover:bg-white hover:text-black duration 300' onClick={handleToggle}><HiMoon className='text-xl'/></button>
        }
        <Link to="/home" className='pt-1 pb-1 pl-2 pr-2 mr-4 border-2 rounded-md hover:bg-white hover:text-black duration 300'>Home</Link>
        <Link to="/login" className='pt-1 pb-1 pl-2 pr-2 border-2 rounded-md hover:bg-white hover:text-black duration 300'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar