import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddNewTicketMutation } from "../../redux/api/shelters";
import { useRespondTicketMutation } from "../../redux/api/tickets";
import { selectUser } from "../../redux/slices/manageUsers";
import Comment from "../PostDetail/Comments/Comment";

function ItemTicket({ticket}) {
  const [input, setInput] = useState("");
  const [respondTicket] = useRespondTicketMutation()
  const {userDetail} = useSelector(selectUser)

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input) return
    respondTicket({content: input, authorId: userDetail.id, ticketId: ticket.id})
  };

  return (
    <form onSubmit={handleSubmit} className="w-[400px] mx-auto bg-white p-10 rounded ">
      
      <div className="mb-6 ">
        <h2 className="bold text-lg font-bold">Shelter</h2>
        NAME: {ticket?.shelter.name}
        <br />
        ID: {ticket?.shelter.id}
      </div>
      <div className="mb-6">
        <h2 className="bold text-lg font-bold">Title</h2>
        {ticket?.title}
      </div>
      <div className="mb-6">
        <h2 className="bold text-lg font-bold">Content</h2>
        <p className=" break-words">{ticket?.content}</p>
      </div>

      {ticket?.status === "for review" ? (userDetail?.role === "Admin" && <><div>
            <input type="text" id="first_name" onChange={handleChange} className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 p " value={input} placeholder="comment" required />
        </div>
      <button
        type="submit"
        className="  text-white bg-[#FF7272]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 "
      >
        Close ticket
      </button></>) : <Comment content={ticket?.comments[0]?.content} author={ticket.comments[0]?.author} id={ticket.comments[0]?.id} postAuthorId={"nadie"} />}
    </form>
  );
}

export default ItemTicket;