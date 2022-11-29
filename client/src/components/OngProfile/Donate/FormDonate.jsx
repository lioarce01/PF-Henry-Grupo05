import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { useCheckoutMutation } from '../../../redux/api/mercadopago';
import Spinner from '../../Spinner/Spinner';
import { useAuth0 } from "@auth0/auth0-react"

const FormDonate = ({ closeModal, name, shelterId, goalId }) => {

    const [checkout, {data, isSuccess}] = useCheckoutMutation()
    const {user} = useAuth0()

    const [input, setInput] = useState({donation: 0, shelter: name, shelterId, goalId, email: user?.email || "asd@gmail.com"})
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
        checkout({...input})
    }

    useEffect(() => {
      if (isSuccess) window.location.assign(data.message)
    }, [data])

  return (
		<div className="">
			<div className="sm:max-w-lg  max-w-full p-10 bg-[#F0EEEE] rounded-xl z-10 dark:bg-[#1B1A1F] dark:text-[#F0EEEE]">
				<div className="flex items-center justify-end">
					<button
						onClick={closeModal}
						className="p-2 hover:bg-gray-200 rounded-full transition duration-300 outline-none dark:hover:bg-[#27242C]"
					>
						<AiOutlineClose className="w-5 h-5 flex" />
					</button>
				</div>
				<div className="text-center">
					<h2 className="text-3xl font-bold text-black dark:text-[#F0EEEE]">
						Thanks a Lot!
					</h2>
				</div>
				<div
					className="grid grid-cols-1 mt-8 space-y-3"
					onChange={handleChange}
				>
					<label className="text-md font-bold text-black tracking-wide dark:text-[#F0EEEE]">
						Select an amount:
					</label>
				</div>
				<div className="flex flex-row  items-center justify-between pb-3 pt-2">
					<button
						value={100}
						onClick={(e) => handleChange(e)}
						className={
							input.donation === 100
								? "border-2 bg-[#E06161] rounded-md box-border p-1 text-gray-100"
								: "hover:bg-[#E06161] transition ease-in duration-200 hover:text-gray-100 rounded-md border-amber-[#ca7c62] box-border p-1"
						}
					>
						$100 (ARS)
					</button>
					<button
						value={500}
						onClick={(e) => handleChange(e)}
						className={
							input.donation === 500
								? "border-2 bg-[#E06161] rounded-md box-border p-1 text-gray-100"
								: "hover:bg-[#E06161] transition ease-in duration-200 hover:text-gray-100 rounded-md border-amber-[#ca7c62] box-border p-1"
						}
					>
						$500 (ARS)
					</button>
					<button
						value={1000}
						onClick={(e) => handleChange(e)}
						className={
							input.donation === 1000
								? "border-2 bg-[#E06161] rounded-md box-border p-1 text-gray-100"
								: "hover:bg-[#E06161] transition ease-in duration-200 hover:text-gray-100 rounded-md border-amber-[#ca7c62] box-border p-1"
						}
					>
						$1000 (ARS)
					</button>
				</div>
				<div className="flex flex-row w-auto justify-between">
					<div className="">
						<label
							htmlFor=""
							className="font-bold text-black dark:text-[#F0EEEE]"
						>
							Another amount:
						</label>
					</div>
					<div className="">
						<input
							type="number"
							className="bg-[#F0EEEE] rounded-lg w-[82.2%] text-black w-full indent-2 outline-none border border-black"
							placeholder="$ARS 50"
							min={50}
							onChange={handleChangeInput}
							value={valueAmount}
						/>
					</div>
				</div>

				<div>
					{error ? (
						<div className="text-red-700">Please select an amount</div>
					) : null}
				</div>

				<div>
					{errorAmount ? (
						<div className="text-red-700">Minimum donation $ARS 50</div>
					) : null}
				</div>

				<form className="mt-8 space-y-3" onSubmit={(e) => handleSubmit(e)}>
					<div>
						<button
							type="submit"
							className="my-5 w-[60%] mx-auto flex justify-center bg-[#E06161] text-gray-100 p-3  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#b84a4a] shadow-lg cursor-pointer transition duration-300"
						>
							DONATE
						</button>
					</div>
					{loading && (
						<div className="mb-[140px]">
							<Spinner />
						</div>
					)}
				</form>
			</div>
		</div>
	)
}

export default FormDonate