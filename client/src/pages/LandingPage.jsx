import React from 'react'
import { Link } from 'react-router-dom'
import BrandHeader from "../components/BrandHeader"
import Description from "../components/description"
import Button from "../components/Button"

const LandingPage = () => {
  return (
    <div className="page-container">
      <div className="form-container">

        <BrandHeader />

        <Description />

        <Link to="/login/employee">
          <Button text="Employee Login" />
        </Link>

        <Link to="/register/admin">
          <Button text="Admin Registration" />
        </Link>

      </div>
    </div>
  )
}

export default LandingPage