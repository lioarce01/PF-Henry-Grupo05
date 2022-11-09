import React from 'react'

const PostFilters = () => {
  return (
    <div>
      <select>
        <option value="rec,Asc-Des">Recientes</option>
        <option value="likes,Asc-Des">Likes</option>
      </select>
    </div>
  )
}

export default PostFilters