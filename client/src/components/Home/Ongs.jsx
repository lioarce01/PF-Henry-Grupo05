import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ONGCard from './ONGCard'
import ONGFilters from './ONGFilters'
import SearchBar from '../Navbar/SearchBar'
import { getSheltersAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions'
import Spinner from '../Spinner/Spinner'

const Ongs = () => {
  const dispatch = useDispatch()
  const shelters = useSelector(state => state.manageShelters.shelters)

  useEffect(() => {
    dispatch(getSheltersAction())
  }, [dispatch])
  
  return (
    <div className='h-screen mt-5 rounded-md lg:right-0 lg:fixed'>
      <h2 className='pt-2 text-2xl font-bold text-center'>Explore Shelters</h2>
        <div className='flex items-center h-[47.5rem] bg-[#FAF2E7] border-2 border-[#fffcf7] w-[90%] mt-5 overflow-auto flex-col py-10 rounded-md'>
            <SearchBar/>
          <div className='flex items-end justify-end w-full py-1 pr-10'>
            <ONGFilters/>
          </div>
          <div className='w-full'>
            {Array.isArray(shelters) ? (
              shelters.length ? shelters.map(shelter => {
                return (
                  <ONGCard
                    key={shelter.id}
                    id={shelter.id}
                    image={shelter.profilePic}
                    name={shelter.name}
                    description={shelter.description}
                    goal={shelter.goal}
                    followers={shelter.userFollowers?.length}
                  />
                )
              }) : <div className='flex justify-center mt-12 text-4xl text-center'><p>Not found</p></div>
            )
            : <div className="relative bottom-[60px]"><Spinner/></div> }
          </div>
      </div>
    </div>
  )
}

export default Ongs