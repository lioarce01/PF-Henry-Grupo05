import React from 'react'
import CardGoals from "./CardGoals"
import BtnCreate from './BtnCreate'

const Goals = ({goals, setIsOpenDonate, shelterId, shelterName}) => {

  return (
		<div className="flex flex-col items-center p-3 w-fit">
			<BtnCreate shelterId={shelterId} />
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
					/>
				)
			})}
		</div>
	)
}

export default Goals