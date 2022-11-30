import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import { useLazyVerifyPaymentQuery } from '../../redux/api/mercadopago'

const MercadoPago = () => {

    const [verify] = useLazyVerifyPaymentQuery()

    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        let payment_id = query.get("payment_id")
        console.log("payment_id: ", payment_id)
        setTimeout(() => {
					verify({ payment_id })
						.unwrap()
						.then((res) => {
							res.status === 200
								? Swal.fire("Approved payment", undefined, "success")
								: Swal.fire({ icon: "error", title: "Failed payment" })
							navigate(`/${res.data}/profile`)
						})
						.catch(() => {
							Swal.fire({ icon: "error", title: "Failed payment" })
							navigate("/home")
						})
				}, 3500)
    }, [])

  return (
    <div className='flex flex-col w-screen h-screen bg-[#EFF0F3] dark:bg-[#27242C] place-content-center'>
    <div className='flex flex-col h-fit w-[300px] lg:w-2/3 xl:w-3/6 2xl:w-[45%] xl:p-8 2xl:px-16 mx-auto p-5 bg-white dark:bg-[#1B1A1F] lg:shadow-xl shadow-lg shadow-[#FF7272] dark:shadow-[#E06161] rounded-2xl'>
      <div className='mb-8 lg:mb-16'>
      <p className='text-center  text-2xl lg:text-4xl 2xl:text-6xl text-black dark:text-[#F0EEEE] font-bold'>Thanks for Helping Us to make a Better World!</p>
      </div>
      <div className='flex flex-col items-center mb-8 lg:flex-row lg:justify-around h-fit lg:mb-16'>
      <div className="flex flex-row mb-8 lg:mb-0">
        <h1 className="text-4xl font-bold text-black dark:text-white">Paws</h1>
        <h1 className=" font-bold text-4xl text-[#FF7272] dark:text-[#E06161]">Founding</h1>
      </div>
      <img src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp" alt="mercado_pago_logo" 
      className='lg:h-32 lg:w-60 w-[200px] h-[90px]'/>
      </div>
      <p className='text-center text-lg lg:text-2xl 2xl:text-3xl text-[#838788] dark:text-[#AFB3B4] mb-8 lg:mb-20'>Thanks to Heroes like you, we can continue rescuing animals until we find them a home.</p>
      <p className='text-center text-sm lg:text-1xl 2xl:text-2xl text-[#FF7272] dark:text-[#E06161]'>Wait a moment please, will redirected soon...</p>
    </div>
    </div>
  )
}

export default MercadoPago
