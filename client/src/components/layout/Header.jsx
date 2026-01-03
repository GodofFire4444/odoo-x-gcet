import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import ThemeToggle from '../common/ThemeToggle';

const Header = ({ title }) => {
    return (
        <header className="top-header">
            <h1 className="header-title">{title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <ThemeToggle />
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <Bell size={20} />
                </button>
                <div className="user-profile">
                    <div className="avatar-placeholder">JD</div>
                    <div className="user-info">
                        <span className="user-name">John Doe</span>
                        <span className="user-role">Software Engineer</span>
                    </div>
                    <ChevronDown size={16} color="var(--text-muted)" />
                </div>
            </div>
        </header>
    );
};

export default Header;
