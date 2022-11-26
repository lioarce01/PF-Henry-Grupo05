import React, { useState } from "react";
import CreateTicketForm from "./CreateTicketForm";
import Modal from "./Modal";
import { GiTicket } from 'react-icons/gi'


function CreateTicket() {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div>
      
      <button onClick={() => setIsOpen(true)} className='flex flex-row bg-[#FF7272] ml-auto md:mr-[30px] lg:mr-[30px] xl:mr-[60px]
                xsm:mr-[20px] sm:mt-[30px] sm:h-fit pl-[5px] xsm:pr-[2px] xsm:pl-[2px] xsm:h-[44px] xsm:mt-[33px] md:pr-[20px] rounded-full items-center hover:bg-[#e76464] transition-colors duration-300'>
                    <span className="p-[7px] rounded-full">
                      
                        <GiTicket className='text-2xl text-white' />
                    </span>
                    <span className='font-semibold text-white ml-[5px] xsm:hidden md:contents'>Create Ticket</span>
                </button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default CreateTicket;
