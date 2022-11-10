import React from 'react'
import { useDispatch } from 'react-redux'
import { sortOngsAction } from '../../redux/reducers/dataBack/manageOngs/manageOngsActions'
import { sortPostAction } from '../../redux/reducers/dataBack/managePosts/managePostsActions'
import Navbar from '../Navbar/Navbar'
import Ongs from './Ongs'
import Posts from './Posts'
import SubscriptorsBar from './SubscriptorsBar'

const Home = () => {

  const dispatch = useDispatch()

  const handleSortOngs = (e) => {
    let order = e.target.value.split(",")[0]
    let type = e.target.value.split(",")[1]
    e.preventDefault()
    dispatch(sortOngsAction(order, type))
  }

  const handleSortPosts = (e) => {
    let order = e.target.value.split(",")[0]
    let type = e.target.value.split(",")[1]
    e.preventDefault()
    dispatch(sortPostAction(order, type))
  }

  return (
    <div className='w-full h-screen bg-gray-400'>
      <Navbar/>
      <div className='flex flex-row justify-between'>
        <div><SubscriptorsBar/></div>
        <div>
          <p>filtro de posts</p>
          <select onChange={(e) => handleSortPosts(e)}>
          <option value="rec,desc">Recientes</option>
          <option value="rec,asc">Antiguos</option>
          <option value="likes,desc">Más Likes</option>
        </select>
          <Posts/>
        </div>
        <div>
          <p>filtro de ongs</p>
          <select onChange={(e) => handleSortOngs(e)}>
          <option value="name,asc">A-Z</option>
          <option value="name,desc">Z-A</option>
          <option value="followers,asc">Subs +</option>
          <option value="followers,desc">Subs -</option>
          <option value="budget,asc">Donation +</option>
          <option value="budget,desc">Donation -</option>
        </select>
          <Ongs/>
        </div>
      </div>
    </div>
  )
}

export default Home