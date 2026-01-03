import React, { useState } from 'react'
import InputBox from './InputBox'
import Button from './Button'
import {Link} from 'react-router-dom'

const DetailsAdminLoginPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const [logo, setLogo] = useState(null);


  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Form data:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBox 
        placeholder="Company Name" 
        value={formData.companyName}
        onChange={handleChange('companyName')}
      />

    <input
    type="file"
    accept="image/*"
    onChange={(e) => setLogo(e.target.files[0])}
    />

      <InputBox 
        placeholder="Name" 
        value={formData.name}
        onChange={handleChange('name')}
      />
      <InputBox 
        placeholder="Email" 
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
      />
      <InputBox 
        placeholder="Phone" 
        type="tel"
        value={formData.phone}
        onChange={handleChange('phone')}
      />
      <InputBox 
        placeholder="Password" 
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
      />
      <InputBox 
        placeholder="Confirm Password" 
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange('confirmPassword')}
      />
      <Button text="Submit" type="submit" />

      
    </form>
  )
}

export default DetailsAdminLoginPage