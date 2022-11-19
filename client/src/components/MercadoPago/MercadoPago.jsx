import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import Swal from "sweetalert2"
import { useLazyVerifyPaymentQuery } from '../../redux/api/mercadopago'

const MercadoPago = () => {

    const [verify] = useLazyVerifyPaymentQuery()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        let payment_id = query.get("payment_id")
        setTimeout(() => {
          verify({payment_id}).unwrap().then((res) => {
            res.originalStatus === 200 ? Swal.fire("Approved payment", undefined,'success') : Swal.fire({icon: 'error', title: "Failed payment"})
          }).catch((res) => {
            res.originalStatus === 200 ? Swal.fire("Approved payment", undefined,'success') : Swal.fire({icon: 'error', title: "Failed payment"})
          })
          navigate("/home")
        }, 2500)
    }, [])

  return (
    <div>
      <p className='text-center text-5xl'>Estamos procesando tu pago...</p>
      <p className='text-center text-5xl'>Por favor espere un momento...</p>
      <img src="https://logotipoz.com/wp-content/uploads/2021/10/version-horizontal-large-logo-mercado-pago.webp" alt="" className='h-40 w-72 mx-auto mt-5 mb-28'/>
      <Spinner />
    </div>
  )
}

export default MercadoPago
