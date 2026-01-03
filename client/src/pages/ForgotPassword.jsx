import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputBox from '../components/InputBox'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle forgot password logic here
    console.log('Reset password for:', email)
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <InputBox 
            placeholder="Email" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
        <div>
          <Link to="/login/employee">Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

