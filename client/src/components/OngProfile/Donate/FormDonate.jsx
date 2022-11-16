import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Spinner from '../../Spinner/Spinner';

const FormDonate = ({ closeModal, name, id }) => {

    const [input, setInput] = useState({donation: 0, shelter: name, id})
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorAmount, setErrorAmount] = useState(false)
    const [valueAmount, setValueAmount] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        setError(false)
        setErrorAmount(false)
        setValueAmount("")
        setInput({...input, donation: Number(e.target.value)})
    }

    const handleChangeInput = (e) => {
      e.preventDefault()
      setError(false)
      setErrorAmount(false)
      setValueAmount(e.target.value)
      setInput({...input, donation: Number(e.target.value)})
  }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!input.donation) return setError(true)
        if (input.donation < 50) return setErrorAmount(true)
        if (input.donation >= 50) setErrorAmount(false)
        setLoading(true)
        let {data} = await axios.post("/mp", input)
        window.location.assign(data)
    }

  return (
    <div className="">
      <div className="sm:max-w-lg  max-w-full p-10 bg-[#FAF2E7] rounded-xl z-10">
        <div className="flex items-center justify-end">
          <button onClick={closeModal}>
          <AiOutlineClose className="w-6 h-6 flex " />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#462312]">Donate</h2>
        </div>
        <div className="grid grid-cols-1 mt-8 space-y-3" onChange={handleChange}>
              <label className="text-md font-bold text-[#462312] tracking-wide">
              select an amount
              </label>
        </div>
        <div className='flex flex-row  items-center justify-between pb-3 pt-2'>
            <button value={100} onClick={(e) => handleChange(e)} className={input.donation === 100 ? "border rounded-md border-amber-900 box-border" : null}>$100 (ARS)</button>
            <button value={500} onClick={(e) => handleChange(e)} className={input.donation === 500 ? "border rounded-md border-amber-900 box-border" : null}>$500 (ARS)</button>
            <button value={1000} onClick={(e) => handleChange(e)} className={input.donation === 1000 ? "border rounded-md border-amber-900 box-border" : null}>$1000 (ARS)</button>
        </div>
        <div>
        <label htmlFor="">Amount: <input type="number" className='bg-gray-300 rounded-lg w-[82.2%]' placeholder='$ARS' min={50} onChange={handleChangeInput} value={valueAmount}/></label>
        </div>

        <div>
            {
                error ? <div className='text-red-700'>Please select an amount</div> : null
            }
        </div>

        <div>
            {
                errorAmount ? <div className='text-red-700'>Minimum donation $ARS 50</div> : null
            }
        </div>
        
        <form className="mt-8 space-y-3" onSubmit={(e) => handleSubmit(e)}>        
          <div>
            <button
              type="submit"
              className="my-5 w-[60%] mx-auto flex justify-center bg-[#ca7c62] text-gray-100 p-3  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300"
            >
              DONATE
            </button>
          </div>
          {
            loading && 
            <div className="mb-[140px]">
                <Spinner />
            </div>
      }
        </form>
      </div>
    </div>
    
  )
}

export default FormDonate