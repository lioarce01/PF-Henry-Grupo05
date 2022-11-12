import React from 'react'

const SubsCard = ({ goal, name, image, id }) => { 

  const formatMoney = goal=> {
    return goal?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-center pl-4 my-2 transition duration-300 rounded-md hover:bg-[#fffcf7]'>
        <img src="https://i.pravatar.cc/150?img=9" alt="Avatar" className='object-cover w-12 h-12 my-2 rounded-full'/>
          <div className='flex flex-col items-start justify-center w-full text-slate-800'>
            <p className='ml-3 font-bold text-md'>{name}</p>
            <p className='ml-4 text-sm font-semibold text-gray-500'>{formatMoney(goal)}</p>
        </div>
      </div>
    </div>
  )
}

export default SubsCard