import React from 'react'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'

const Home = () => {
  return (
    <div className='w-full h-screen bg-gray-400'>
      <Navbar/>
      <div className='flex flex-row justify-between'>
        <div><SubscriptorsBar/></div>
        <div>
          <p>filtro de posts</p>
          <select>
          <option value="rec,Asc-Des">Recientes</option>
          <option value="fav,Asc-Des">Favoritas</option>
          <option value="likes,Asc-Des">Likes</option>
        </select>
          <Posts/>
        </div>
        <div>
          <p>filtro de ongs</p>
          <select >
          <option value="name,Asc">A-Z</option>
          <option value="name,Desc">Z-A</option>
          <option value="subs,Asc">Subs +</option>
          <option value="subs,Desc">Subs -</option>
          <option value="donation,Asc">Donation +</option>
          <option value="donation,Desc">Donation -</option>
        </select>
          <Ongs/>
        </div>
      </div>
    </div>
  )
}

export default Home