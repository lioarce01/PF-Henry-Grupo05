import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddNewTicketMutation } from "../../redux/api/tickets";

function CreateTicketForm() {
  const [input, setInput] = useState({ content: "", title: "" });
  const [createTicket] = useAddNewTicketMutation()
  const {userDetail} = useSelector(state => state.localStorage.userState)

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.content || !input.title) {
      return toast.error("missing data");
    }
    if(userDetail?.Shelter[0])  {
      const myPromise = createTicket({...input, shelterId: userDetail.Shelter[0].id}).unwrap()
      toast.promise(myPromise, {
        loading: "Creating ticket",
        success: "Ticket created",
        error: "There was an error creating ticket",
      })

      setInput({content: "", title: ""})
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-full mx-auto bg-white p-10">
      
      <div className="mb-6">
        <label
          for="title"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Title"
          onChange={handleChange}
          value={input.title}
          required
        />
      </div>
      <div className="mb-6">
        <label
          for="content"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Content
        </label>
        <input
          type="text"
          id="content"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          name="content"
          onChange={handleChange}
          value={input.content}
          required
        />
      </div>

      <button
        type="submit"
        className="  text-white bg-[#FF7272]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Create ticket
      </button>
    </form>
  );
}

export default CreateTicketForm;
