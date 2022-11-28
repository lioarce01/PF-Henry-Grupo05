import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import TicketsPage from '.'
import { selectUser } from '../../redux/slices/manageUsers'

function ProtectRoute() {
    const {isAuth, userDetail} = useSelector(selectUser)
    if(!isAuth || !userDetail?.Shelter[0]) return <Navigate to={"/home"}/>
    return <TicketsPage />
}

export default ProtectRoute