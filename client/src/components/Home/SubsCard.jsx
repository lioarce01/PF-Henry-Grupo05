import { Link } from "react-router-dom"

const SubsCard = ({ goal, name, image, id }) => {
	//formatting the goal to show the $ sign and the thousands separator

	const money = goal?.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
	})

	const nameToShow = name?.length > 15 ? name.slice(0, 15) + "..." : name

	if (! image) {
		image = "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
	}

	return (
		<div>
			<Link to={`/${id}/profile`}>
				<div className="h-[90px] w-[280px] border rounded-[30px] flex flex-row items-center justify-center my-2 transition duration-300 hover:bg-[#fff0ef]">
					<img
						src={image}
						alt="Avatar"
						className="rounded-[30px] object-cover w-[90px] h-full my-2"
					/>
					<div className="flex flex-col items-start justify-center w-full text-slate-800">
						<p className="ml-3 font-[800] text-md">{nameToShow}</p>
						<p className="ml-4 text-sm font-bold text-[#9c9c9c]">{`${money} collected`}</p>
					</div>
				</div>
			</Link>
		</div>
	)
}

export default SubsCard
