import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { mockAttendance } from '../../data/mockAdminData';

const AttendanceManagement = () => {
    const [viewMode, setViewMode] = useState('list'); // list | calendar

    const columns = [
        { header: 'Employee', accessor: 'employee', render: (row) => <span style={{ fontWeight: 500 }}>{row.employee}</span> },
        { header: 'Date', accessor: 'date' },
        { header: 'Check In', accessor: 'checkIn' },
        { header: 'Check Out', accessor: 'checkOut' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Actions', accessor: 'actions', render: () => (
            <button className="text-btn" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 600 }}>Edit</button>
        )},
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                        <CalendarIcon size={18} color="var(--text-muted)" />
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Jan 03, 2026</span>
                    </div>
                    
                    <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <div className="tabs-container">
                    <button 
                        className={`tab-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        List View
                    </button>
                    <button 
                        className={`tab-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                        onClick={() => setViewMode('calendar')}
                    >
                        Calendar
                    </button>
                </div>
            </div>

            {viewMode === 'list' ? (
                <DataTable columns={columns} data={mockAttendance} />
            ) : (
                <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                    Global Calendar View (Placeholder)
                </div>
            )}
        </div>
    );
};

export default AttendanceManagement;
