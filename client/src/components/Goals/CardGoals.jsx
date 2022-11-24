import React, { useState } from 'react'
import ModalDonate from '../OngProfile/Donate/ModalDonate'
import "./CardGoals.css"

const CardGoals = ({
	title,
	content,
	goal,
	budget,
	shelterId,
	id,
	shelterName,
}) => {
	const [isOpenDonate, setIsOpenDonate] = useState(false)
	const closeModalDonate = () => {
		setIsOpenDonate(false)
	}

	return (
		<div>
			<div className="flex flex-col w-full gap-2 p-3 my-2 bg-white shadow-lg rounded-xl shadow-rose-400">
				<h1 className="text-lg font-bold">{title}</h1>
				<p className="text-gray-700">{content}</p>
				<div className="flex flex-col items-center">
					<label htmlFor="goal" className="flex flex-row items-center gap-1">
						{budget / 100}% <span>completed</span>
					</label>
					<div className="relative inline-block bg-white h-[20px] rounded-lg overflow-hidden">
						<progress id="goal" max={goal} value={budget}></progress>
					</div>
				</div>
				<div className="flex items-center justify-center w-full">
					<button
						onClick={() => setIsOpenDonate(true)}
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-rose-400 hover:bg-rose-500"
					>
						Help us!
					</button>
				</div>
				<ModalDonate
					isOpen={isOpenDonate}
					closeModal={closeModalDonate}
					name={shelterName}
					goalId={id}
					shelterId={shelterId}
				/>
			</div>
		</div>
	)
}

export default CardGoals