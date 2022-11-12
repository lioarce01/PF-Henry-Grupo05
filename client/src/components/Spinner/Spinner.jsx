import React from 'react'
import { MoonLoader } from 'react-spinners'

const Spinner = () => {

  return (
    <div className='h-[600px] flex items-center justify-center'>
      <div className='flex items-center justify-center'>
        <div className='w-10 h-10'>
          <MoonLoader color="#462312" />
        </div>
      </div>
    </div>
  )
}

export default Spinner