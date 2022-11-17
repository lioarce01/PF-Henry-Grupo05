import React from "react"
import { Link } from "react-router-dom"
import ShowMoreText from "react-show-more-text"

const ONGCard = ({ image, name, goal, budget, followers, description, id }) => {
	if (!image) {
		image =
			"https://media.4-paws.org/6/8/9/3/689354d6694789b45569cd647a6009e240b4afe7/VIER%20PFOTEN_2016-09-18_081-1927x1333-1920x1328.jpg"
	}

	const executeOnClick = (isExpanded) => {
		console.log(isExpanded)
	}

	return (
		<div className="flex flex-col items-center justify-center m-4">
			<div className="max-w-[360px] transition duration-300 bg-[#fffcf7] border-2 border-[#eeebe6] rounded-lg">
				<div>
					<img className="rounded-t-lg" src={image} alt="ONG" />
				</div>
				<div className="flex flex-col items-center justify-center p-3">
					<div>
						<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
							{name}
						</h5>
					</div>
					<div className="flex flex-col justify-start w-full">
						<div className="mb-3 font-semibold text-gray-800 text-md">
							<ShowMoreText
								lines={3}
								more="Show more"
								less="Show less"
								className="content-css"
								anchorClass="show-more-less-clickable"
								onClick={executeOnClick}
								expanded={false}
								// width={500}
								truncatedEndingComponent={"... "}>
								{description}
							</ShowMoreText>
						</div>
						<p className="text-sm font-semibold">
							Budget: <span className="font-semibold">${budget}</span>
						</p>
						<p className="pb-2 text-sm font-semibold">
							Followers: <span className="font-semibold">{followers}</span>
						</p>
					</div>
					<Link
						key={id}
						to={`/${id}/profile`}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-gray-900 border-2 hover:bg-[#fcf1e2] transition duration-300 border-[#fcf1e2] rounded-md">
						<div className="flex flex-row ">
							<p>Explore ONG</p>
							<span className="ml-1"> → </span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ONGCard
