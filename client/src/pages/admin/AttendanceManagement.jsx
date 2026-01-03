import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { getAllAttendance } from '../../api/admin';

const AttendanceManagement = () => {
    const [viewMode, setViewMode] = useState('list'); // list | calendar
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        try {
            const data = await getAllAttendance();
            const formatted = data.map(record => ({
                id: record._id,
                employee: record.employeeId ? `${record.employeeId.firstName} ${record.employeeId.lastName}` : 'Unknown',
                date: new Date(record.date).toLocaleDateString(),
                checkIn: record.checkIn ? new Date(record.checkIn).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-',
                checkOut: record.checkOut ? new Date(record.checkOut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '-',
                status: record.checkIn ? 'Present' : 'Absent'
            }));
            setAttendance(formatted);
        } catch (error) {
            console.error("Error fetching attendance", error);
        } finally {
            setLoading(false);
        }
    };

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
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{new Date().toLocaleDateString()}</span>
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
                <DataTable columns={columns} data={attendance} />
            ) : (
                <div style={{ 
                    padding: '1.5rem', 
                    backgroundColor: 'var(--surface)', 
                    borderRadius: 'var(--radius-lg)', 
                    border: '1px solid var(--border)' 
                }}>
                    <h3 style={{ marginBottom: '1.5rem', fontWeight: 600 }}>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1rem' }}>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                {day}
                            </div>
                        ))}
                        {(() => {
                            const today = new Date();
                            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                            const days = [];
                            
                            // Empty slots for previous month
                            for (let i = 0; i < firstDay.getDay(); i++) {
                                days.push(<div key={`empty-${i}`}></div>);
                            }

                            // Days of current month
                            for (let i = 1; i <= lastDay.getDate(); i++) {
                                const currentDate = new Date(today.getFullYear(), today.getMonth(), i);
                                const dateStr = currentDate.toLocaleDateString();
                                const presentCount = attendance.filter(a => a.date === dateStr && a.status === 'Present').length;
                                
                                days.push(
                                    <div key={i} style={{ 
                                        minHeight: '80px', 
                                        border: '1px solid var(--border)', 
                                        borderRadius: 'var(--radius-md)', 
                                        padding: '0.5rem',
                                        backgroundColor: 'var(--surface-hover)',
                                        position: 'relative'
                                    }}>
                                        <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{i}</div>
                                        {presentCount > 0 && (
                                            <div style={{ 
                                                fontSize: '0.75rem', 
                                                backgroundColor: 'rgba(16, 185, 129, 0.2)', 
                                                color: 'var(--success)', 
                                                padding: '2px 4px', 
                                                borderRadius: '4px',
                                                display: 'inline-block'
                                            }}>
                                                {presentCount} Present
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return days;
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceManagement;
