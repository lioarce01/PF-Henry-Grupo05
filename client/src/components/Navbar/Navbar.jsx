import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BsSun} from 'react-icons/bs'
import {HiMoon} from 'react-icons/hi'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { AiOutlineDown } from 'react-icons/ai'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  
  return (
    <div className='fixed z-50 flex items-center justify-between w-full p-4 px-10 text-white bg-transparent shadow-lg backdrop-blur-sm h-14'>
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
          <Menu as="div" className="relative z-50 inline-block text-left outline-none">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm outline-none bg-slate-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <img src="https://i.pravatar.cc/150?img=4" alt="" className='rounded-full w-9 h-9' />
            <AiOutlineDown className="w-5 h-5 mt-2 ml-2 -mr-1" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/users/636c0a5c1e78d75d8edfae96`}
                    className={classNames(
                      active ? 'bg-slate-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Account settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/createong`}
                    className={classNames(
                      active ? 'bg-slate-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Create Shelter
                  </Link>
                )}
              </Menu.Item>
              <form method="POST" action="#">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/'
                      type="submit"
                      className={classNames(
                        active ? 'bg-slate-200 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left text-sm'
                      )}
                    >
                      Sign out
                    </Link>
                  )}
                </Menu.Item>
              </form>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      </div>
    </div>
  )
}

export default Navbar