import React from "react"
import CardGoals from "./CardGoals"
import BtnCreate from "./BtnCreate"

const Goals = ({
	goals,
	setIsOpenDonate,
	shelterId,
	shelterName,
	shelterRefetch,
}) => {
	console.log("goals: ", goals)

	return (
		<div className="flex flex-col items-center w-full p-3">
			<BtnCreate shelterId={shelterId} shelterRefetch={shelterRefetch} />
			{goals?.map((g) => {
				return (
					<CardGoals
						budget={g.budget}
						content={g.content}
						goal={g.goal}
						title={g.title}
						key={g.id}
						id={g.id}
						setIsOpenDonate={setIsOpenDonate}
						shelterId={shelterId}
						shlterName={shelterName}
						enable={g.enable}
						shelterRefetch={shelterRefetch}
					/>
				)
			})}
		</div>
	)
}

export default Goals
