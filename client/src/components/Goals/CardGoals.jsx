import React, { useState } from 'react'
import ModalDonate from '../OngProfile/Donate/ModalDonate'

const CardGoals = ({title, content, goal, budget, shelterId, id, shelterName}) => {

  const [isOpenDonate, setIsOpenDonate] = useState(false)
  const closeModalDonate = () => {
    setIsOpenDonate(false)
  }

  return (
    <div>
        <p>{title}</p>
        <p>{content}</p>
        <p>{goal}</p>
        <p>{budget}</p>
        <button onClick={() => setIsOpenDonate(true)}>Donar</button>
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