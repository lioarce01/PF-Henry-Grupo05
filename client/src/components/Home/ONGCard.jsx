import React from 'react'
import { Link } from 'react-router-dom'

const ONGCard = ({image, name, budget, followers, description, id}) => {


  if(!image) {
    image = 'https://media.4-paws.org/6/8/9/3/689354d6694789b45569cd647a6009e240b4afe7/VIER%20PFOTEN_2016-09-18_081-1927x1333-1920x1328.jpg'
  }
  return (
    <div className='flex flex-col items-center justify-center m-4'>
      <div className="max-w-[360px] transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md">
          <div>
              <img className="rounded-t-lg" src={image} alt="ONG" />
          </div>
            <div className="flex flex-col items-center justify-center p-3">
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{name}</h5>
                </div>
                <div className='flex flex-col justify-start w-full'>
                  <p className="mb-2 font-normal text-gray-700">{description}</p>
                  <p className='font-bold'>Budget: <span className='font-semibold'>${budget}</span></p>
                  <p className='pb-2 font-bold'>Followers: <span className='font-semibold'>{followers}</span></p>
                </div>
              <Link to={`/${id}/profile`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  <div className='flex flex-row '>
                    <p>Explore ONG</p>
                    <span className='ml-1'> → </span>
                  </div>
              </Link>
          </div>
      </div>
    </div>
  )
}

export default ONGCard