import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOngsAction } from '../../redux/reducers/dataBack/manageOngs/manageOngsActions'
import ONGCard from './ONGCard'

const Ongs = () => {
  // const dispatch = useDispatch
  // const ongs = useSelector(state => state.ongs)

  // useEffect(() => {
  //   dispatch(getOngsAction())
  // }, [dispatch])

  // if(!ongs.length) return <h1>Loading...</h1>
  
  return (
    <div>
      <h2 className='text-3xl font-bold text-center'>ONGs</h2>
        <div className='flex items-center h-[50rem] bg-gray-700 w-[400px] mt-4 overflow-y-scroll flex-col'>
          <div>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
            <ONGCard/>
          </div>
      </div>
    </div>
  )
}

export default Ongs