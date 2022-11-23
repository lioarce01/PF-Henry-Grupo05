import React from 'react'
import { useState } from 'react'
import Modal from './modalCreate'

function BtnCreate({shelterId}) {
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)
  return (
    <>
    <button className='border border-gray-500 px-2 py-1' onClick={() => setIsOpen(true)}>Create goal</button>
    <Modal isOpen={isOpen} closeModal={closeModal} shelterId={shelterId} />
    </>
  )
}

export default BtnCreate