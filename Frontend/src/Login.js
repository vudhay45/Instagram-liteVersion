import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Axios } from './utils/Axios'

const Login = () => {
  const navigate = useNavigate()

  // Initialize state for username and password
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  console.log(formData)

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await Axios.post('/login', {
        username: formData.username,
        password: formData.password,
      })

      if (res) {
        window.localStorage.setItem('jwtKey', res.data.jwtToken)
        alert(res.data.message)
        console.log(res)
        navigate('/design')
      }
    } catch (err) {
      console.log(err.response.data.message)
      alert(err.response.data.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-2 mb-4 border rounded"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            className="w-full p-2 mb-6 border rounded"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={!formData.username || !formData.password}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
