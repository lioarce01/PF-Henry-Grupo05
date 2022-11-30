import React, { useState } from 'react'
import { useSelector } from "react-redux"
import {
	useEnableGoalMutation,
	useDisableGoalMutation,
	useDeleteGoalMutation,
} from "../../redux/api/goals"
import ModalDonate from "../OngProfile/Donate/ModalDonate"
import "./CardGoals.css"
import { percentage } from "../../utils"

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
	authorId,
}) => {
	const [isOpenDonate, setIsOpenDonate] = useState(false)
	const closeModalDonate = () => setIsOpenDonate(false)
	const [disableGoal] = useDisableGoalMutation()
	const [enableGoal] = useEnableGoalMutation()
	const [deleteGoal] = useDeleteGoalMutation()
	const { userDetail, isAuth } = useSelector(
		(state) => state.localStorage.userState
	)

	let pesoArgentino = Intl.NumberFormat("es-AR")

	const handleEnable = async () => {
		await enableGoal({ id })
		shelterRefetch()
	}

	const handleDisable = async () => {
		await disableGoal({ id })
		shelterRefetch()
	}

	const handleDelete = async () => {
		await deleteGoal({ id })
		shelterRefetch()
	}

	return (
		<div
			className="flex flex-col w-[280px] gap-2 p-[25px] bg-white shadow-[6px_16px_54px_-27px_rgba(133,133,133,0.7)]
						transition-all duration-300 hover:mt-[10px] hover:bg-[#fcfcfc] rounded-xl dark:bg-[#1B1A1F]
						dark:shadow-[6px_16px_54px_-27px_rgba(133,133,133,0.4)] dark:hover:bg-[#1f1e24]"
		>
			<h1 className="text-lg font-semibold text-[#838788] dark:text-[#b3b8b9]">
				{title}
			</h1>
			<p className="text-[#ACB1B2]">{content}</p>

			<div className="flex flex-col items-center mt-[20px]">
				<label
					htmlFor="goal"
					className="flex flex-row items-center gap-1 dark:text-[#b3b8b9] mb-[2px]"
				>
					{budget >= goal ? (
						<div>
							<p>Goal of ${pesoArgentino.format(goal)} Raised</p>
						</div>
					) : budget < goal ? (
						<span>
							{percentage(budget, goal).toFixed(0)}% completed of $
							{pesoArgentino.format(goal)}
						</span>
					) : null}
				</label>

				<div className="relative inline-block bg-white h-[20px] rounded-lg overflow-hidden">
					<progress id="goal" max={goal} value={budget}></progress>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center w-full gap-2 mt-[10px]">
				{enable === true ? (
					<button
						onClick={() => setIsOpenDonate(true)}
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-[#6371f1] hover:bg-[#535fd1] dark:bg-[#7580e4] dark:hover:bg-[#6a75d3]"
					>
						Help us!
					</button>
				) : (
					<button
						onClick={() => setIsOpenDonate(true)}
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-[#6371f1] hover:bg-[#535fd1] dark:bg-[#7580e4] dark:hover:bg-[#6a75d3] line-through"
						disabled
					>
						Help us!
					</button>
				)}
				{authorId === userDetail?.id || userDetail?.role === "Admin" ? (
					enable ? (
						<button
							className="px-2 py-1 text-white transition duration-300 rounded-md outline-none bg-[#FF7272] hover:bg-[#e76464]"
							onClick={handleDisable}
						>
							Disable
						</button>
					) : (
						<button
							className="px-2 py-1 text-white transition duration-300 rounded-md outline-none bg-[#6371f1] hover:bg-[#535fd1]"
							onClick={handleEnable}
						>
							Enable
						</button>
					)
				) : null}
				{authorId === userDetail?.id || userDetail?.role === "Admin" ? (
					<button
						className="px-2 py-1 text-white transition duration-300 rounded-md bg-[#FF7272] hover:bg-[#e76464]"
						onClick={handleDelete}
					>
						Delete
					</button>
				) : null}
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