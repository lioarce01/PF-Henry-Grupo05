import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'
import PostFilters from './PostFilters'
import ONGFilters from './ONGFilters'

const Home = () => {
  return (
    <div className='w-full h-screen bg-gray-400'>
      <Navbar/>
      <div className='flex flex-row justify-between'>
        <div><SubscriptorsBar/></div>
        <div>
          <p>filtro de posts</p>
          <PostFilters/>
          <Posts/>
        </div>
        <div>
          <p>filtro de ongs</p>
          <ONGFilters/>
          <Ongs/>
        </div>
      </div>
    </div>
  )
}

export default Home