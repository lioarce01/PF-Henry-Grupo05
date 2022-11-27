import React from 'react'
import { useState } from 'react'
import Modal from './modalCreate'

function BtnCreate({ shelterId, shelterRefetch }) {
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)
	return (
		<>
			<button
				className="px-2 py-1 text-white transition duration-300 border-2 rounded-md border-rose-400 bg-rose-400 hover:bg-rose-500 hover:border-rose-500"
				onClick={() => setIsOpen(true)}
			>
				Create goal
			</button>
			<Modal
				isOpen={isOpen}
				closeModal={closeModal}
				shelterId={shelterId}
				shelterRefetch={shelterRefetch}
			/>
		</>
	)
}

export default BtnCreate