 import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSucess } from '../utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [products, setPoducts] = useState([]) // ✅ fixed

  const navigate = useNavigate()

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser')) // ✅ fixed
  }, []) // ✅ fixed

  const handleclickLogout = (e) => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSucess('User Loggedout')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products"
      const header = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url, header)
      const result = await response.json()
      console.log(result)
      setPoducts(result)
    } catch (err) {
      handleError(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, []) // ✅ fixed

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleclickLogout}>Logout</button>
      <div>
        {
          products && products.map((item, index) => {
            return ( // ✅ fixed
              <ul key={index}>
                <span>{item.name}:{item.price}</span>
              </ul>
            )
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
