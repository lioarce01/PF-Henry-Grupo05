import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"
import { useLazyVerifyPaymentPlanQuery } from '../../redux/api/mercadopago'

const MercadoPago = () => {

    const [verify] = useLazyVerifyPaymentPlanQuery()

    const navigate = useNavigate()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        let payment_id = query.get("payment_id")
        setTimeout(() => {
          verify({payment_id}).unwrap().then((res) => {
            res.status === 200 ? Swal.fire("Approved payment", undefined,'success') : Swal.fire({icon: 'error', title: "Failed payment"})
            navigate(`/${res.data}/profile`)
          }).catch((res) => {
            res.status === 200 ? Swal.fire("Approved payment", undefined,'success') : Swal.fire({icon: 'error', title: "Failed payment"})
            navigate("/home")
          })
        }, 3500)
    }, [])

  return (
    <div className='flex flex-col w-screen h-screen place-content-center'>
    <div className='flex flex-col h-fit w-1/3 mx-auto p-5 bg-white shadow-xl shadow-[rgb(255,213,201)] rounded-2xl'>
      <div className='mb-16'>
      <p className='text-center text-4xl text-[#3D190C] font-bold'>Thanks for Helping Us to make a Better World!</p>
      </div>
      <div className='flex flex-row items-center justify-around h-fit mb-16'>
      <div className="flex flex-row ">
        <h1 className=" font-bold text-4xl text-[#3D190C]">Paws</h1>
        <h1 className=" font-bold text-4xl text-[#F87171]">Founding</h1>
      </div>
      <img src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp" alt="mercado_pago_logo" 
      className='h-32 w-60 '/>
      </div>
      <p className='text-center text-2xl text-[#3D190C] mb-20'>Thanks to Heroes like you, we can continue rescuing animals until we find them a home.</p>
      <p className='text-center text-1xl text-[#F87171]'>Wait a moment please, will redirected soon...</p>
    </div>
    </div>
  )
}

export default MercadoPago
