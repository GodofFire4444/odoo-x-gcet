import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Users, 
    Clock, 
    Calendar, 
    DollarSign, 
    BarChart2, 
    Settings 
} from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/employees', label: 'Employees', icon: Users },
        { path: '/admin/attendance', label: 'Attendance', icon: Clock },
        { path: '/admin/leaves', label: 'Leave Requests', icon: Calendar },
        { path: '/admin/payrolls', label: 'Payrolls', icon: DollarSign },
        { path: '/admin/reports', label: 'Reports', icon: BarChart2 },
        { path: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="brand-logo">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="logo-icon"
                    >
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    Dayflow <span style={{ fontSize: '0.75em', opacity: 0.7, marginLeft: '4px' }}>Admin</span>
                </div>
            </div>
            <nav className="nav-list">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
