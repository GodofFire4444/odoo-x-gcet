import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, DollarSign, Clock, User, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { path: '/employee', label: 'Dashboard', icon: LayoutDashboard, end: true },
        { path: '/employee/employees', label: 'Employees', icon: Users },
        { path: '/employee/time-off', label: 'Time Off', icon: Calendar },
        { path: '/employee/payrolls', label: 'Payrolls', icon: DollarSign },
        { path: '/employee/attendance', label: 'Attendance', icon: Clock },
        { path: '/employee/profile', label: 'Profile', icon: User },
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
                    Dayflow
                </div>
            </div>
            <nav className="nav-list">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
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

export default Sidebar;
