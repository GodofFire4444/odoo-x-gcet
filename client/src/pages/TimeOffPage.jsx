import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Umbrella, Thermometer, UserMinus, Search, Filter } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import './timeoff.css';

const TimeOffPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');

    const leaveBalances = [
        { type: 'Annual Leave', count: 18, total: 24, icon: <Umbrella />, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
        { type: 'Sick Leave', count: 5, total: 10, icon: <Thermometer />, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
        { type: 'User Leave', count: 2, total: 5, icon: <UserMinus />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    ];

    const leaveRequests = [
        { id: 1, type: 'Annual Leave', range: 'Jan 15 - Jan 20', days: 5, status: 'approved', reason: 'Family vacation' },
        { id: 2, type: 'Sick Leave', range: 'Dec 20 - Dec 21', days: 2, status: 'approved', reason: 'Fever' },
        { id: 3, type: 'Annual Leave', range: 'Feb 10 - Feb 12', days: 3, status: 'pending', reason: 'Personal work' },
    ];

    const columns = [
        { header: 'Leave Type', accessor: 'type' },
        { header: 'Date Range', accessor: 'range' },
        { header: 'Days', accessor: 'days' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Reason', accessor: 'reason' },
    ];

    const filteredData = filterStatus === 'all'
        ? leaveRequests
        : leaveRequests.filter(r => r.status === filterStatus);

    return (
        <div className="timeoff-container">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Time Off</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your leave requests and balances</p>
                </div>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem' }} onClick={() => setIsModalOpen(true)}>
                    <Plus size={20} /> Apply for Leave
                </button>
            </div>

            {/* Leave Balance Cards */}
            <div className="leave-balance-grid">
                {leaveBalances.map((leave, idx) => (
                    <motion.div
                        key={idx}
                        className="leave-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <div className="leave-type-icon" style={{ backgroundColor: leave.bg, color: leave.color }}>
                            {leave.icon}
                        </div>
                        <div>
                            <div className="leave-count">{leave.count}</div>
                            <div className="leave-name">{leave.type}</div>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                            Remaining from {leave.total} days
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* History Table Section */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>Leave History</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ position: 'relative', width: '250px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Search requests..."
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <select
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{ width: '160px' }}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
                <DataTable columns={columns} data={filteredData} />
            </div>

            {/* Apply Leave Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Apply for Leave"
                footer={(
                    <>
                        <button className="tab-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button className="btn-primary" onClick={() => setIsModalOpen(false)}>Submit Request</button>
                    </>
                )}
            >
                <form className="leave-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Leave Type</label>
                        <select>
                            <option>Paid Leave</option>
                            <option>Sick Leave</option>
                            <option>Unpaid Leave</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Start Date</label>
                            <input type="date" />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>End Date</label>
                            <input type="date" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Reason</label>
                        <textarea rows="4" placeholder="Briefly explain your reason..."></textarea>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TimeOffPage;
