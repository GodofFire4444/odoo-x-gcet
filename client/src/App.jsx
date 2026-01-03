import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Auth Pages
import LandingPage from './pages/LandingPage'
import RegistrationAdmin from './pages/registrationAdmin'
import LoginPageEmployee from './pages/loginPageEmployee'
import ForgotPassword from './pages/ForgotPassword'
import AdminLogin from './pages/adminLoginPage'

// Dashboard Pages
import DashboardLayout from './components/layout/DashboardLayout'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AttendancePage from './pages/AttendancePage'
import TimeOffPage from './pages/TimeOffPage'
import PayrollPage from './pages/PayrollPage'
import ProfilePage from './pages/ProfilePage'
import PlaceholderPage from './components/common/PlaceholderPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register/admin",
    element: <RegistrationAdmin />,
  },
  {
    path: "/login/employee",
    element: <LoginPageEmployee />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/login/admin",
    element: <AdminLogin />,
  },
  {
    path: "/employee",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <EmployeeDashboard /> },
      { path: "dashboard", element: <EmployeeDashboard /> },
      { path: "employees", element: <PlaceholderPage title="Employees Directory" /> },
      { path: "time-off", element: <TimeOffPage /> },
      { path: "payrolls", element: <PayrollPage /> },
      { path: "attendance", element: <AttendancePage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    path: "/home",
    element: <HomePage />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
