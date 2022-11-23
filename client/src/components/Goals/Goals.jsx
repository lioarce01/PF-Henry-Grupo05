import React from 'react'
import CardGoals from "./CardGoals"

const Goals = ({goals, setIsOpenDonate, shelterId, shelterName}) => {

  return (
    <div>
        {
            goals?.map((g) => {
                return (
                    <CardGoals budget={g.budget} content={g.content} goal={g.goal} title={g.title} key={g.id} id={g.id} setIsOpenDonate={setIsOpenDonate} shelterId={shelterId} shlterName={shelterName}/>
                )
            })
        }
    </div>
  )
}

export default Goals