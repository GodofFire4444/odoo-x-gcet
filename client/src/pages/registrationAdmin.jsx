import React from 'react'
import DetailsAdminLoginPage from '../components/detailsAdminLoginPage'
import {Link} from 'react-router-dom'


const RegistrationAdmin = () => {
  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Admin Registration</h1>
        <DetailsAdminLoginPage />
        <p>
        Alreadyhave an account?{" "}
        <Link to="/login/admin">Login</Link>
      </p>
      </div>
    </div>
  )
}

export default RegistrationAdmin
