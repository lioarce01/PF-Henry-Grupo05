import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ONGCard from './ONGCard'
import ONGFilters from './ONGFilters'
import SearchBar from '../Navbar/SearchBar'

const Ongs = () => {
  // const dispatch = useDispatch
  // const ongs = useSelector(state => state.ongs)

  // useEffect(() => {
  //   dispatch(getOngsAction())
  // }, [dispatch])

  // if(!ongs.length) return <h1>Loading...</h1>
  
  return (
    <div className='fixed right-0 pr-4'>
      <h2 className='pt-2 text-2xl font-bold text-center'>Explore Shelters</h2>
        <div className='flex items-center h-[50rem] bg-slate-200 w-[400px] mt-5 overflow-auto flex-col py-10'>
            <SearchBar/>
          <div className='flex items-center justify-end'>
           <ONGFilters/>
          </div>
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