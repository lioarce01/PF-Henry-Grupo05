import React from 'react'

const ONGCard = () => {
  return (
    <div className='flex flex-col items-center justify-center m-4'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <a href="/">
              <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt=""/>
          </a>
          <div className="p-5">
              <a href="/">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Lorem ipsum dolor sit amet.</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, laborum!</p>
              <a href="/" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  Explore ONG
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd">
                    </path>
                  </svg>
              </a>
          </div>
      </div>
    </div>
  )
}

export default ONGCard