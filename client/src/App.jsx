import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegistrationAdmin from './pages/registrationAdmin'
import LoginPageEmployee from './pages/loginPageEmployee'
import ForgotPassword from './pages/ForgotPassword'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/adminLoginPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register/admin" element={<RegistrationAdmin />} />
        <Route path="/login/employee" element={<LoginPageEmployee />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  )
}

export default App