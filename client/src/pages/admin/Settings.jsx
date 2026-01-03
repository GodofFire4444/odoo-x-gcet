import React from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Section title="Company Profile">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <Input label="Company Name" defaultValue="Dayflow Inc." />
                        <Input label="Website" defaultValue="https://dayflow.com" />
                        <Input label="Contact Email" defaultValue="admin@dayflow.com" />
                        <Input label="Phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                </Section>

                <Section title="System Preferences">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Email Notifications</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Receive email updates for leave requests</div>
                        </div>
                        <Toggle defaultChecked />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Auto-approve Attendance</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Automatically approve daily check-ins</div>
                        </div>
                        <Toggle />
                    </div>
                </Section>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn-primary" style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, children }) => (
    <div style={{ 
        backgroundColor: 'var(--surface)', 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--border)' 
    }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>{title}</h3>
        {children}
    </div>
);

const Input = ({ label, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</label>
        <input 
            style={{ 
                padding: '0.75rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border)', 
                backgroundColor: 'var(--surface-hover)',
                color: 'var(--text-main)',
                outline: 'none'
            }} 
            {...props} 
        />
    </div>
);

const Toggle = ({ defaultChecked }) => (
    <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
        <input type="checkbox" defaultChecked={defaultChecked} style={{ opacity: 0, width: 0, height: 0 }} />
        <span className="slider" style={{
            position: 'absolute',
            cursor: 'pointer',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: defaultChecked ? 'var(--primary)' : 'var(--surface-hover)',
            borderRadius: '24px',
            border: '1px solid var(--border)',
            transition: '0.4s'
        }}>
            <span style={{
                position: 'absolute',
                content: '""',
                height: '18px',
                width: '18px',
                left: defaultChecked ? '20px' : '2px',
                bottom: '2px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: '0.4s'
            }}></span>
        </span>
    </label>
);

export default Settings;
