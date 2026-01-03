import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './layout.css';

const DashboardLayout = () => {
    const location = useLocation();

    // Determine title based on current path
    const getPageTitle = (pathname) => {
        if (pathname === '/employee' || pathname === '/employee/') return 'Dashboard';
        if (pathname.includes('time-off')) return 'Time Off';
        if (pathname.includes('payrolls')) return 'Payrolls';
        if (pathname.includes('attendance')) return 'Attendance';
        if (pathname.includes('profile')) return 'Profile';
        if (pathname.includes('employees')) return 'Employees';
        return 'Dashboard';
    };

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <Header title={getPageTitle(location.pathname)} />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
