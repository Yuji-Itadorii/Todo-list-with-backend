import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Spin } from 'antd'

const ProtectedRoute = ({ children }) => {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)

    async function fetchUser() {
        const res = await axios.get('http://localhost:3000/api/user', {
            withCredentials: true
        })

        if (res.data) {
            setEmail(res.data.email)
            setLoading(false)
        }
        else {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <>
            {loading ? <Spin /> : email ? children : <Navigate to='/login' />}
        </>
    )
}

export default ProtectedRoute