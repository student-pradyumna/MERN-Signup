 import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { handleError, handleSucess } from '../utils'

const Login = () => {
  const [logininfo, setLogininfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handlechange = (e) => {
    const { name, value } = e.target
    const copylogininfo = { ...logininfo }
    copylogininfo[name] = value
    setLogininfo(copylogininfo) // ✅ Fixed typo
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = logininfo
    if (!email || !password) {
      return toast.error(' email, and password are required')
    }
    try {
      const url = 'http://localhost:8080/auth/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(logininfo)
      })
      const result = await response.json()
      const { success, message, jwtToken, name, error } = result
      if (success) {
        handleSucess(message)
        localStorage.setItem('token', jwtToken)
        localStorage.setItem(' loggedInUser', name)
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }
      console.log(result)
    } catch (err) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <div className='container'>
      <h1>Signup</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            placeholder='Enter Your Email'
            value={logininfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder='Enter Your Password'
            value={logininfo.password}
          />
        </div>
        <button type="submit">Login</button>
        <span>
          Does't have an account? <Link to="/signup">signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login // ✅ fixed export name
