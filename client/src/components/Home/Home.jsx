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
          <select >
          <option value="name,Asc">mas recientes</option>
          <option value="name,Desc">Favoritas</option>
          <option value="rating,Asc">Likes asc</option>
          <option value="rating,Desc">likes des</option>
        </select>
          <Posts/>
        </div>
        <div>
          <p>filtro de ongs</p>
          <select >
          <option value="name,Asc">A-Z</option>
          <option value="name,Desc">Z-A</option>
          <option value="rating,Asc">Rating +</option>
          <option value="rating,Desc">Rating -</option>
        </select>
          <Ongs/>
        </div>
      </div>
    </div>
  )
}

export default Home