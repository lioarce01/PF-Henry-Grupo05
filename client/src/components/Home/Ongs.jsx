import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ONGCard from './ONGCard'
import ONGFilters from './ONGFilters'
import SearchBar from '../Navbar/SearchBar'
import { getSheltersAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions'

const Ongs = () => {
  const dispatch = useDispatch()
  const shelters = useSelector(state => state.manageShelters.shelters)

  useEffect(() => {
    dispatch(getSheltersAction())
  }, [dispatch])
  
  return (
    <div className='fixed right-0 pr-4'>
      <h2 className='pt-2 text-2xl font-bold text-center'>Explore Shelters</h2>
        <div className='flex items-center h-[50rem] bg-slate-200 w-[400px] mt-5 overflow-auto flex-col py-10'>
            <SearchBar/>
          <div className='flex items-end justify-end w-full py-1 pr-5'>
            <ONGFilters/>
          </div>
          <div>
            {
              shelters && shelters.map(shelter => {
                return (
                  <ONGCard
                    key={shelter.id}
                    id={shelter.id}
                    image={shelter.profilePic}
                    name={shelter.name}
                    description={shelter.description}
                    budget={shelter.budget}
                    followers={shelter.userFollowers?.length}
                  />
                )
              })
            }
          </div>
      </div>
    </div>
  )
}

export default Ongs