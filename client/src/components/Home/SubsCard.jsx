import React from 'react'

const SubsCard = ({ author }) => {

  return (
    <div className='w-full'>
      <div className='flex flex-row items-center p-2 mb-4 rounded-md hover:bg-gray-700'>
        <img src="https://i.imgur.com/6rZQY7C.png" alt="Avatar" className='w-12 h-12 border-2 rounded-full cursor-pointer hover:border-white'/>
          <div className='flex flex-col items-start justify-center text-white'>
            <p className='ml-2 text-xl font-bold'>Juan</p>
            <p className='ml-2 text-sm'>@juan</p>
        </div>
      </div>
    </div>
  )
}

export default SubsCard