import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'
import Footer from '../Landing/Footer/Footer'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  return (
    <div className='w-full min-h-screen h-fit bg-[#fff5f4]'>
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