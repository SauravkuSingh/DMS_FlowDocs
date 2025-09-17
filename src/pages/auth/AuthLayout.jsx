import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      navigate('/dashboard', { replace: true })
    } else {
      navigate('/auth/login', { replace: true })
    }
  }, [navigate])

  return (
    <div className="flex h-screen items-center justify-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout
