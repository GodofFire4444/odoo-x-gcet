import React from 'react';

const PlaceholderPage = ({ title }) => {
    return (
        <div style={{
            padding: '2rem',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--surface)',
            textAlign: 'center',
            color: 'var(--text-muted)'
        }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>{title}</h2>
            <p>This feature is currently under development.</p>
        </div>
    );
};

export default PlaceholderPage;
