import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, ChevronDown, User, Settings,
    LogOut, Shield
} from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const AdminHeader = ({ title }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    // Close menu on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') setIsMenuOpen(false);
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    const handleLogout = () => {
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="top-header">
            <h1 className="header-title">{title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <ThemeToggle />

                <button className="icon-btn-sm" style={{ position: 'relative' }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        width: '9px',
                        height: '9px',
                        backgroundColor: 'var(--danger)',
                        borderRadius: '50%',
                        border: '2px solid var(--surface)',
                        boxShadow: '0 0 0 2px rgba(var(--surface-rgb), 0.5)'
                    }}></span>
                </button>

                <div className="user-profile-wrapper" ref={menuRef}>
                    <div
                        className={`user-profile ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-haspopup="true"
                    >
                        <div className="avatar-placeholder" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>AD</div>
                        <div className="user-info">
                            <span className="user-name">Admin User</span>
                            <span className="user-role">Administrator</span>
                        </div>
                        <ChevronDown
                            size={16}
                            style={{
                                transition: 'transform 0.2s ease',
                                transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)'
                            }}
                        />
                    </div>

                    {isMenuOpen && (
                        <div className="profile-dropdown" role="menu">
                            <div className="dropdown-header">
                                <div className="dropdown-avatar" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>AD</div>
                                <div className="dropdown-user-info">
                                    <span className="dropdown-user-name">Admin User</span>
                                    <span className="dropdown-user-email">admin@dayflow.com</span>
                                </div>
                            </div>

                            <div className="dropdown-menu">
                                <button
                                    className="dropdown-item"
                                    role="menuitem"
                                    onClick={() => navigate('/admin/settings')}
                                >
                                    <User size={18} /> Profile
                                </button>
                                <button
                                    className="dropdown-item"
                                    role="menuitem"
                                    onClick={() => navigate('/admin/settings')}
                                >
                                    <Settings size={18} /> Settings
                                </button>
                                <button
                                    className="dropdown-item"
                                    role="menuitem"
                                >
                                    <Shield size={18} /> Security
                                </button>

                                <div className="dropdown-divider"></div>

                                <button
                                    className="dropdown-item destructive"
                                    role="menuitem"
                                    onClick={handleLogout}
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
