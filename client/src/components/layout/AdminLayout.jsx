import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import './layout.css';

const AdminLayout = () => {
    const location = useLocation();

    // Determine title based on current path
    const getPageTitle = (pathname) => {
        if (pathname.includes('/admin/dashboard')) return 'Admin Dashboard';
        if (pathname.includes('/admin/employees')) return 'Employee Management';
        if (pathname.includes('/admin/attendance')) return 'Attendance Overview';
        if (pathname.includes('/admin/leaves')) return 'Leave Requests';
        if (pathname.includes('/admin/payrolls')) return 'Payroll Management';
        if (pathname.includes('/admin/reports')) return 'Reports & Analytics';
        if (pathname.includes('/admin/settings')) return 'System Settings';
        return 'Admin Dashboard';
    };

    return (
        <div className="dashboard-container">
            <AdminSidebar />
            <main className="main-content">
                <AdminHeader title={getPageTitle(location.pathname)} />
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
