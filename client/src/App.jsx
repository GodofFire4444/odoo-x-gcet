import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Auth Pages
import LandingPage from './pages/LandingPage'
import RegistrationAdmin from './pages/registrationAdmin'
import LoginPageEmployee from './pages/loginPageEmployee'
import ForgotPassword from './pages/ForgotPassword'
import AdminLogin from './pages/adminLoginPage'

// Employee Dashboard Pages
import DashboardLayout from './components/layout/DashboardLayout'
import EmployeeDashboard from './pages/EmployeeDashboard'
import AttendancePage from './pages/AttendancePage'
import TimeOffPage from './pages/TimeOffPage'
import PayrollPage from './pages/PayrollPage'
import ProfilePage from './pages/ProfilePage'
import PlaceholderPage from './components/common/PlaceholderPage'
import HomePage from './pages/HomePage'

// Admin Dashboard Pages
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import EmployeeManagement from './pages/admin/EmployeeManagement'
import AttendanceManagement from './pages/admin/AttendanceManagement'
import LeaveRequests from './pages/admin/LeaveRequests'
import PayrollManagement from './pages/admin/PayrollManagement'
import ReportsAnalytics from './pages/admin/ReportsAnalytics'
import Settings from './pages/admin/Settings'

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "employees", element: <EmployeeManagement /> },
      { path: "attendance", element: <AttendanceManagement /> },
      { path: "leaves", element: <LeaveRequests /> },
      { path: "payrolls", element: <PayrollManagement /> },
      { path: "reports", element: <ReportsAnalytics /> },
      { path: "settings", element: <Settings /> },
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
