import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'

const Home = () => {
  return (
    <div className='w-full h-full bg-gray-200'>
      <Navbar/>
      <div className='flex flex-row justify-between'>
        <div><SubscriptorsBar/></div>
        <div>
          <p>filtro de posts</p>
          <Posts/>
        </div>
        <div>
          <p>filtro de ongs</p>
          <Ongs/>
        </div>
      </div>
    </div>
  )
}

export default Home