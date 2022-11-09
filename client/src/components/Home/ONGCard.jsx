import React from 'react'
import { Link } from 'react-router-dom'

const ONGCard = () => {
  return (
    <div className='flex flex-col items-center justify-center m-4'>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md">
          <a href="/">
              <img className="rounded-t-lg" src="https://media.infocielo.com/p/e79ac6f52d8fff25028a3e5a7facbc67/adjuntos/299/imagenes/001/407/0001407198/887x0/smart/campito-refugio-perros-animales-3jpg.jpg" alt="ONG" />
          </a>
          <div className="p-3">
              <a href="/">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">ONG Title</h5>
              </a>
              <p className="mb-2 font-normal text-gray-700">Description: Lorem ipsum dolor sit amet.</p>
              <p>Budget: $1000</p>
              <p className='pb-2'>Followers: 100</p>
              <Link to="/:ongId:/profile" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                  <div className='flex flex-row'>
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