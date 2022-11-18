import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../../redux/slices/manageUsers'

function ProtectedRoute({children}) {
    const {userDetail, isAuth} = useSelector(selectUser)
    if(!isAuth || userDetail.role !== "Admin") {
        return <Navigate to="/home"/>
    }

  return children
}

export default ProtectedRoute