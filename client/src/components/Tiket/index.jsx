import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "./Modal";

function Ticket({ticket}) {
 
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const location = useLocation()

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
        <span className={`${ticket.status === "for review" ? "bg-yellow-400" : "bg-green-400" } h-2 w-2 m-2 rounded-full`}></span>
        <div className="flex-grow font-medium px-2">{location.pathname !== "/tickets" ? ticket.shelter.name : ticket.title }</div>
        <div className="text-sm font-normal text-gray-500 tracking-wide">
          {ticket.status}
        </div>
      </div>
      <Modal ticket={ticket} isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}

export default Ticket;
