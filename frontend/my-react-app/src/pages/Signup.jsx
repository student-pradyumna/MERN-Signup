 import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { handleError, handleSucess } from '../utils'

const Signup = () => {
  const [signinfo, setSigninfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate=useNavigate()
  const handlechange = (e) => {
    const { name, value } = e.target
    const copySigninfo = { ...signinfo }
    copySigninfo[name] = value
    setSigninfo(copySigninfo)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const { name, email, password } = signinfo
    if (!name || !email || !password) {
      return toast.error('name, email, and password are required')
    }
    try {
      const url = 'http://localhost:8080/auth/signup'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinfo)
      })
      const result = await response.json()
      const {success,message,error}=result;
      if(success){
        handleSucess(message)
        setTimeout(() => {
            navigate('/login')
        }, 1000);
      }else if(error){
        const details=error?.details[0].message;
        handleError(details)
      } else if(!success){
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
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handlechange}
            type="text"
            name="name"
            placeholder='Enter Your Name'
            value={signinfo.name}
            autoFocus
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handlechange}
            type="email"
            name="email"
            placeholder='Enter Your Email'
            value={signinfo.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handlechange}
            type="password"
            name="password"
            placeholder='Enter Your Password'
            value={signinfo.password}
          />
        </div>
        <button type="submit">Signup</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
