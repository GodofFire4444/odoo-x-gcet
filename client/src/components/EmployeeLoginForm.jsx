import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import InputBox from './InputBox'
import Button from './Button'

const EmployeeLoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    } else {
      console.log('Login data:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBox 
        placeholder="Email" 
        value={formData.email}
        onChange={handleChange('email')}
      />
      <InputBox 
        placeholder="Password" 
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
      />
      <Button text="Login" type="submit" />
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </form>
  )
}

export default EmployeeLoginForm

