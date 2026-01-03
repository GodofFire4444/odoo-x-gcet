import React, { useState } from 'react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: ''
  })

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBox
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange('companyName')}
      />

      <InputBox
        placeholder="Email"
        type="email"
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

      <p>
        Do not have an account?{" "}
        <Link to="/register/admin">Create new account</Link>
      </p>
    </form>
  )
}

export default AdminLogin
