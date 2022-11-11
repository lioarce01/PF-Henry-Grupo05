import React from 'react'
import { useDispatch } from 'react-redux'
import { sortSheltersAction } from '../../redux/reducers/dataBack/manageShelters/manageSheltersActions'

const ONGFilters = () => {

  const dispatch = useDispatch()

  const handleSort = e => {
    e.preventDefault()

    const ord = {
      order: e.target.value.split(",")[0],
      orderType: e.target.value.split(",")[1]
    }

    dispatch(sortSheltersAction(ord))
  }

  return (
    <div>
      { /* select box: ORDENAMIENTO */ }
      <select onChange={(e) => handleSort(e)} defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Sort</option>
        <option value="budget,desc">Budget +</option>
        <option value="budget,asc">Budget -</option>
        <option value="followers,desc">Followers +</option>
        <option value="followers,asc">Followers -</option>
      </select>
    </div>
  )
}

export default ONGFilters