import React from "react"
import { Link } from "react-router-dom"

const SubsCard = ({ goal, name, image, id }) => {
	//formatting the goal to show the $ sign and the thousands separator

	const money = goal?.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	})

	const nameToShow = name?.length > 15 ? name.slice(0, 15) + "..." : name

	if (!image) {
		image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"
	}

	return (
		<div>
			<Link to={`/${id}/profile`}>
				<div className="flex flex-row items-center justify-center pl-4 my-2 transition duration-300 rounded-md hover:bg-[#fffcf7]">
					<img
						src={image}
						alt="Avatar"
						className="object-cover w-12 h-12 my-2 border-2 border-black rounded-full"
					/>
					<div className="flex flex-col items-start justify-center w-full text-slate-800">
						<p className="ml-3 font-bold text-md">{nameToShow}</p>
						<p className="ml-4 text-sm font-semibold text-gray-500">{money}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default SubsCard
