import React from "react";
import Ticket from "../Tiket";

function TicketList({ tickets }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-6 ">
      <div className="flex justify-center p-4 px-3 py-10">
        <div className="w-full ">
          <div className="bg-white dark:bg-[#1b1a1f] shadow-md rounded-lg px-3 py-2 mb-4">
            <div className="block text-gray-700 dark:text-[#FF7272] text-lg font-bold py-2 px-2">
              Tickets
            </div>
            <div className="py-3 text-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md   max-h-[400px]">
              {tickets && tickets.payload.length > 0 ?
                tickets.payload.map((ticket) => (
                  <Ticket key={ticket.id} ticket={ticket} />
                )) : <h2 className="text-center dark:text-white pb-[20px]">No tickets found</h2>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketList;
