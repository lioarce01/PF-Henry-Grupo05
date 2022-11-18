import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUser } from '../../redux/slices/manageUsers'
import Page404 from '../Page404'

function ProtectedRoute({children}) {
    const {userDetail, isAuth} = useSelector(selectUser)
    if(!isAuth || userDetail.role !== "Admin") {
        return <Page404 />
    }

  return children
}

export default ProtectedRoute