import { useState } from "react";
import toast from 'react-hot-toast'
import { useSelector } from "react-redux"
import { useCreateGoalMutation } from "../../../redux/api/goals"

const FormCreate = ({ closeModal, shelterId, shelterRefetch }) => {
	const [input, setInput] = useState({ title: "", content: "", goal: 0 })
	const [createGoal] = useCreateGoalMutation()
	const { darkmode } = useSelector((state) => state.localStorage.manageTheme)

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!input.title || !input.content || !input.goal) {
			return toast.error("all fields is needed")
		}
		console.log(input)
		await createGoal({ ...input, id: shelterId })
		shelterRefetch()
		closeModal()
	}

	const handleChange = (e) => {
		setInput(() => ({ ...input, [e.target.name]: e.target.value }))
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={
				darkmode ? "py-4 px-10 dark:bg-[#27242C]" : "px-10 mx-auto py-4"
			}
		>
			<div className="mb-6">
				<label
					htmlFor="title"
					className="block mb-2 text-md font-medium text-gray-900 dark:text-[#F0EEEE]"
				>
					Title
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={input.title}
					onChange={handleChange}
					className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
					placeholder="Title"
					required
				/>
			</div>
			<div className="mb-6">
				<label
					htmlFor="content"
					className="block mb-2 text-md font-medium text-gray-900 dark:text-[#F0EEEE]"
				>
					Content
				</label>
				<input
					type="text"
					id="content"
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
					name="content"
					value={input.content}
					onChange={handleChange}
					required
				/>
			</div>
			<div className="mb-6">
				<label
					htmlFor="goal"
					className="block mb-2 font-medium text-gray-900 dark:text-[#F0EEEE] text-md"
				>
					Goal
				</label>
				<div className="relative mt-1 rounded-md shadow-sm">
					<input
						type="number"
						id="goal"
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						name="goal"
						value={input.value}
						onChange={handleChange}
						required
					/>
					<div className="absolute inset-y-0 right-0 flex items-center">
						<label htmlFor="currency" className="sr-only">
							Currency
						</label>
						<select
							id="currency"
							name="currency"
							className="h-full py-0 pl-2 text-gray-500 bg-transparent border-transparent rounded-md pr-7 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						>
							<option>ARS</option>
						</select>
					</div>
				</div>
			</div>

			<div className="w-full flex justify-center">
				<button
					type="submit"
					className="text-white bg-[#6a77f5] transition duration-300 hover:bg-[#5c6bf1] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
				>
					Create goal
				</button>
			</div>
		</form>
	)
}

export default FormCreate;
