import React from 'react'

const CardPost = () => {
  return (
    <div className='flex flex-col'>
      <div className="flex max-w-md mx-4 my-4 bg-white rounded-lg shadow-lg md:mx-auto md:max-w-2xl">
        <div className="flex items-start px-4 py-6">
          <img className="object-cover w-12 h-12 mr-4 rounded-full shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar"/>
        <div className="">
        <div className="flex flex-col items-start">
          <h2 className="-mt-1 text-lg font-semibold text-gray-900">Brad Adams </h2>
          <small className="text-sm text-gray-700">22h ago</small>
        </div>
        <p className="mt-3 text-sm text-gray-700">
          Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
        </p>
        <div className="flex items-center mt-4">
          <div className="flex mr-2 text-sm text-gray-700">
            <svg fill="none" viewBox="0 0 24 24"  className="w-4 h-4 mr-1" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
              <span>12</span>
            </div>
            <div className="flex mr-2 text-sm text-gray-700">
              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
              </svg>
              <span>8</span>
            </div>
            <div className="flex mr-2 text-sm text-gray-700">
              <svg fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-1" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
                <span>share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardPost