import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div className='w-full h-screen bg-[#fff5f4] overflow-y-hidden'>
      <Toaster />
      <Navbar />
      <div className='flex flex-row justify-between pt-14'>
        <div>
          <SubscriptorsBar />
        </div>
        <div>
          <Posts />
        </div>
        <div>
          <Ongs />
        </div>
      </div>
    </div>
  )
}

export default Home
