import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const MercadoPago = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        let payment_id = query.get("payment_id")
        setTimeout(() => {
            axios.get(`/mp/feedback?payment_id=${payment_id}`).then((res) => {
                res.status === 200 ? alert(res.data) : alert("Failed payment")
            }).catch(() => alert("Failed payment"))
            navigate("/home")
        }, 4500)
    }, [])

  return (
    <div>MercadoPago</div>
  )
}

export default MercadoPago
