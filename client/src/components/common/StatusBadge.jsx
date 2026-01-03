import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyles = (status) => {
        const s = status.toLowerCase();

        // Attendance Types
        if (s === 'present') return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', label: 'Present' };
        if (s === 'absent') return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', label: 'Absent' };
        if (s === 'half-day') return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', label: 'Half Day' };
        if (s === 'leave') return { bg: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', label: 'Leave' };

        // Leave/Request Status
        if (s === 'approved') return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', label: 'Approved' };
        if (s === 'pending') return { bg: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', label: 'Pending' };
        if (s === 'rejected') return { bg: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', label: 'Rejected' };

        // Payroll Status
        if (s === 'paid') return { bg: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', label: 'Paid' };

        return { bg: 'var(--surface-hover)', color: 'var(--text-muted)', label: status };
    };

    const { bg, color, label } = getStatusStyles(status);

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: bg,
            color: color,
            textTransform: 'capitalize'
        }}>
            {label}
        </span>
    );
};

export default StatusBadge;
