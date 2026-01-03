import React from 'react'
import EmployeeLoginForm from '../components/EmployeeLoginForm'

const loginPageEmployee = () => {
  const handleLogin = (formData) => {
    console.log('Login data:', formData)
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Employee Login</h1>
        <EmployeeLoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}

export default loginPageEmployee