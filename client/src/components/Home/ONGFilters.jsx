import React from 'react'

const ONGFilters = () => {
  return (
    <div>
      <select >
        <option value="subs,Asc">Subs +</option>
        <option value="subs,Desc">Subs -</option>
        <option value="followers,Asc">Followers +</option>
        <option value="followers,Desc">Followers -</option>
      </select>
    </div>
  )
}

export default ONGFilters