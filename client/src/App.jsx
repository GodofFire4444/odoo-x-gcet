import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DashboardLayout from './components/layout/DashboardLayout'
import EmployeeDashboard from './pages/EmployeeDashboard'
import { AttendancePage, TimeOffPage, PayrollPage, ProfilePage } from './pages/PlaceholderPages'
import PlaceholderPage from './components/common/PlaceholderPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App