import React from 'react'
import { useDispatch } from 'react-redux'
import { sortSheltersAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions'

const ONGFilters = () => {

  const dispatch = useDispatch()

  const handleSort = (e) => {
    e.preventDefault()
    let order = e.target.value.split(",")[0]
    let type = e.target.value.split(",")[1]
    dispatch(sortSheltersAction(order,type))
  }

  return (
    <div>
      <select onChange={(e) => handleSort(e)}>
        <option value="" disabled selected>Sort</option>
        <option value="budget,desc">Budget +</option>
        <option value="budget,asc">Budget -</option>
        <option value="followers,desc">Followers +</option>
        <option value="followers,asc">Followers -</option>
      </select>
    </div>
  )
}

export default ONGFilters