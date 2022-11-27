import React, { useState } from 'react'
import {
	useEnableGoalMutation,
	useDisableGoalMutation,
	useDeleteGoalMutation,
} from "../../redux/api/goals"
import ModalDonate from "../OngProfile/Donate/ModalDonate"
import "./CardGoals.css"

const CardGoals = ({
	title,
	content,
	goal,
	budget,
	shelterId,
	id,
	shelterName,
	enable,
	shelterRefetch,
}) => {
	const [isOpenDonate, setIsOpenDonate] = useState(false)
	const [enableGoal] = useEnableGoalMutation()
	const [disableGoal] = useDisableGoalMutation()
	const [deleteGoal] = useDeleteGoalMutation()
	const closeModalDonate = () => {
		setIsOpenDonate(false)
	}

	const handleEnable = () => {
		enableGoal({ id })
	}

	const handleDisable = () => {
		disableGoal({ id })
	}

	const handleDelete = async () => {
		await deleteGoal({ id })
		shelterRefetch()
	}

	return (
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
			<div className="flex flex-row items-center justify-center w-full gap-2">
				<button
					onClick={() => setIsOpenDonate(true)}
					className="px-2 py-1 text-white transition duration-300 rounded-md bg-rose-400 hover:bg-rose-500"
				>
					Help us!
				</button>
				<button
					className="px-2 py-1 text-white transition duration-300 rounded-md bg-rose-400 hover:bg-rose-500"
					onClick={handleDelete}
				>
					Delete Goal
				</button>
				{/* {enable ? (
					<button
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-rose-400 hover:bg-rose-500"
						onClick={handleDisable}
					>
						Disable Goal
					</button>
				) : (
					<button
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-rose-400 hover:bg-rose-500"
						onClick={handleEnable}
					>
						Enable Goal
					</button>
				)} */}
			</div>
			<ModalDonate
				isOpen={isOpenDonate}
				closeModal={closeModalDonate}
				name={shelterName}
				goalId={id}
				shelterId={shelterId}
			/>
		</div>
	)
}

export default CardGoals