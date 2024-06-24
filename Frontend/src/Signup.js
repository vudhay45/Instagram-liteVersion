import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Axios } from './utils/Axios'

const Signup = () => {
  const navigate = useNavigate()

  // Initialize state for username, password, confirm password, and terms acceptance
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false, // New state for terms acceptance
  })

  const handleRegister = async (event) => {
    event.preventDefault()
    if (formData.password === formData.confirmPassword) {
      try {
        const res = await Axios.post('/signup', {
          username: formData.username,
          password: formData.password,
        })
        if (res) {
          alert(res.data.message)
          console.log(res)
          navigate('/')
        }
      } catch (err) {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      }
    } else {
      alert('Passwords do not match')
      console.log('Passwords do not match')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-lg">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleRegister}>
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
            className="w-full p-2 mb-4 border rounded"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            className="w-full p-2 mb-6 border rounded"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          {/* Checkbox for accepting terms and conditions */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="termsAndConditions"
              className="mr-2"
              checked={formData.termsAccepted}
              onChange={(e) =>
                setFormData({ ...formData, termsAccepted: e.target.checked })
              }
            />
            <label htmlFor="termsAndConditions" className="text-sm">
              I agree to the{' '}
              <Link to="/terms" className="text-blue-500">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={
              !formData.username ||
              !formData.password ||
              !formData.confirmPassword ||
              !formData.termsAccepted
            }
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
