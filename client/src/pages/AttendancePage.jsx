import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, LogIn, LogOut, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info, AlertCircle } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import { checkIn, checkOut, getMyAttendance, getTodayAttendance } from '../api/attendance';
import './attendance.css';

const AttendancePage = () => {
    const [activeTab, setActiveTab] = useState('monthly');
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([]);
    const [todayAttendance, setTodayAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState(null);

    // Clock update
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch today's attendance status on mount
    useEffect(() => {
        fetchTodayStatus();
        fetchAttendanceHistory();
    }, []);

    const fetchTodayStatus = async () => {
        try {
            const data = await getTodayAttendance();
            setTodayAttendance(data.attendance);
            setIsCheckedIn(data.hasCheckedIn && !data.hasCheckedOut);

            if (data.attendance) {
                if (data.attendance.checkIn) {
                    setCheckInTime(new Date(data.attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
                if (data.attendance.checkOut) {
                    setCheckOutTime(new Date(data.attendance.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                }
            }
        } catch (err) {
            console.error('Error fetching today status:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAttendanceHistory = async () => {
        try {
            const data = await getMyAttendance();
            setAttendanceData(data);
        } catch (err) {
            console.error('Error fetching attendance history:', err);
        }
    };

    const handleCheckAction = async () => {
        setActionLoading(true);
        setError(null);

        try {
            if (!isCheckedIn) {
                const result = await checkIn();
                setIsCheckedIn(true);
                setCheckInTime(new Date(result.attendance.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                setCheckOutTime(null);
                setTodayAttendance(result.attendance);
                await fetchAttendanceHistory();
            } else {
                const result = await checkOut();
                setIsCheckedIn(false);
                setCheckOutTime(new Date(result.attendance.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                setTodayAttendance(result.attendance);
                await fetchAttendanceHistory();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            console.error('Check action error:', err);
        } finally {
            setActionLoading(false);
        }
    };

    // Format attendance data for table
    const historyData = attendanceData.map(record => {
        const date = new Date(record.date).toLocaleDateString();
        const checkInFormatted = record.checkIn
            ? new Date(record.checkIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '-';
        const checkOutFormatted = record.checkOut
            ? new Date(record.checkOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '-';
        const hours = record.totalHours ? `${record.totalHours.toFixed(1)}h` : '0h';

        // Determine status based on hours
        let status = 'absent';
        if (record.checkIn && record.checkOut) {
            if (record.totalHours >= 8) status = 'present';
            else if (record.totalHours >= 4) status = 'half-day';
        } else if (record.checkIn) {
            status = 'present'; // Checked in but not out yet
        }

        return {
            date,
            status,
            checkIn: checkInFormatted,
            checkOut: checkOutFormatted,
            hours
        };
    });

    const columns = [
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Check In', accessor: 'checkIn' },
        { header: 'Check Out', accessor: 'checkOut' },
        { header: 'Total Hours', accessor: 'hours' },
    ];

    return (
        <div className="attendance-container">
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Attendance</h1>
                    <p style={{ color: 'var(--text-muted)' }}>{currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>

                <div className="tabs-container">
                    {['daily', 'weekly', 'monthly'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Check-in Section */}
            <div className="check-in-card">
                {error && (
                    <div style={{
                        padding: '0.75rem',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--danger)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--danger)'
                    }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <div className="status-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>
                        <Clock size={16} />
                        CURRENT TIME
                    </div>
                    <div className="current-time">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                        <StatusBadge status={isCheckedIn ? 'Checked In' : (checkOutTime ? 'Checked Out' : 'Not Checked In')} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '3rem', borderRight: '1px solid var(--border)', paddingRight: '3rem' }}>
                    <div className="time-stat">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>CHECK IN</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{checkInTime || '--:--'}</div>
                    </div>
                    <div className="time-stat">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>CHECK OUT</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>{checkOutTime || '--:--'}</div>
                    </div>
                    <div className="time-stat">
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>TOTAL HOURS</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
                            {isCheckedIn ? 'Running...' : (todayAttendance?.totalHours ? `${todayAttendance.totalHours.toFixed(1)}h` : '0h')}
                        </div>
                    </div>
                </div>

                <button
                    className={`action-btn ${isCheckedIn ? 'check-out' : 'check-in'}`}
                    onClick={handleCheckAction}
                    disabled={actionLoading || loading}
                    style={{ opacity: (actionLoading || loading) ? 0.6 : 1, cursor: (actionLoading || loading) ? 'not-allowed' : 'pointer' }}
                >
                    {actionLoading ? (
                        <>Processing...</>
                    ) : isCheckedIn ? (
                        <><LogOut size={20} /> Check Out</>
                    ) : (
                        <><LogIn size={20} /> Check In</>
                    )}
                </button>
            </div>

            {/* Dynamic Views */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'monthly' ? (
                        <CalendarView />
                    ) : (
                        <DataTable columns={columns} data={historyData} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// Calendar Sub-component
const CalendarView = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Stable data to satisfy purity rules
    const statuses = ['present', 'absent', 'present', 'leave', 'present', 'half-day'];

    // Simulated calendar days for Jan 2026
    const calendarDays = Array.from({ length: 31 }, (_, i) => ({
        day: i + 1,
        status: statuses[i % statuses.length],
        isToday: (i + 1) === new Date().getDate(),
        isOtherMonth: false
    }));

    return (
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>January 2026</h2>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button className="icon-btn-sm"><ChevronLeft size={18} /></button>
                        <button className="icon-btn-sm"><ChevronRight size={18} /></button>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <LegendItem color="var(--success)" label="Present" />
                    <LegendItem color="var(--danger)" label="Absent" />
                    <LegendItem color="var(--warning)" label="Half Day" />
                    <LegendItem color="var(--primary)" label="Leave" />
                </div>
            </div>

            <div className="calendar-grid">
                {days.map(d => <div key={d} className="calendar-header">{d}</div>)}
                {calendarDays.map((d, i) => (
                    <div key={i} className={`calendar-day ${d.isToday ? 'today' : ''} ${d.isOtherMonth ? 'other-month' : ''}`}>
                        <div className="day-number">{d.day}</div>
                        <div style={{ marginTop: 'auto', display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <div className="day-status-dot" style={{ backgroundColor: getStatusColor(d.status) }}></div>
                            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LegendItem = ({ color, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }}></div>
        {label}
    </div>
);

const getStatusColor = (status) => {
    switch (status) {
        case 'present': return 'var(--success)';
        case 'absent': return 'var(--danger)';
        case 'half-day': return 'var(--warning)';
        case 'leave': return 'var(--primary)';
        default: return 'var(--border)';
    }
};

export default AttendancePage;
