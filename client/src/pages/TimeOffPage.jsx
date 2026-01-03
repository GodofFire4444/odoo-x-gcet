import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Umbrella, Thermometer, UserMinus, Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import { applyLeave, getMyLeaves, getLeaveBalance } from '../api/leave';
import './timeoff.css';

const TimeOffPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [leaveBalance, setLeaveBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        leaveType: 'Paid Leave',
        startDate: '',
        endDate: '',
        reason: ''
    });

    useEffect(() => {
        fetchLeaveData();
    }, []);

    const fetchLeaveData = async () => {
        try {
            const [leaves, balance] = await Promise.all([
                getMyLeaves(),
                getLeaveBalance()
            ]);
            setLeaveRequests(leaves);
            setLeaveBalance(balance);
        } catch (err) {
            console.error('Error fetching leave data:', err);
            setError('Failed to load leave data');
        } finally {
            setLoading(false);
        }
    };

    const leaveBalances = leaveBalance ? [
        {
            type: 'Paid Leave',
            count: leaveBalance.paidLeave.remaining,
            total: leaveBalance.paidLeave.total,
            icon: <Umbrella />,
            color: '#3b82f6',
            bg: 'rgba(59, 130, 246, 0.1)'
        },
        {
            type: 'Sick Leave',
            count: leaveBalance.sickLeave.remaining,
            total: leaveBalance.sickLeave.total,
            icon: <Thermometer />,
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)'
        },
        {
            type: 'Unpaid Leave',
            count: leaveBalance.unpaidLeave.remaining,
            total: leaveBalance.unpaidLeave.total,
            icon: <UserMinus />,
            color: '#10b981',
            bg: 'rgba(16, 185, 129, 0.1)'
        },
    ] : [];

    // Format leave requests for display
    const formattedLeaveRequests = leaveRequests.map(leave => {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return {
            id: leave._id,
            type: leave.leaveType,
            range: `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
            days,
            status: leave.status.toLowerCase(),
            reason: leave.reason || 'No reason provided'
        };
    });

    const columns = [
        { header: 'Leave Type', accessor: 'type' },
        { header: 'Date Range', accessor: 'range' },
        { header: 'Days', accessor: 'days' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Reason', accessor: 'reason' },
    ];

    const filteredData = filterStatus === 'all'
        ? formattedLeaveRequests
        : formattedLeaveRequests.filter(r => r.status === filterStatus);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitLeave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validation
        if (!formData.startDate || !formData.endDate) {
            setError('Please select start and end dates');
            return;
        }

        if (new Date(formData.endDate) < new Date(formData.startDate)) {
            setError('End date must be after start date');
            return;
        }

        setSubmitting(true);
        try {
            await applyLeave(formData);
            setSuccess('Leave request submitted successfully!');
            setIsModalOpen(false);
            setFormData({
                leaveType: 'Paid Leave',
                startDate: '',
                endDate: '',
                reason: ''
            });
            await fetchLeaveData(); // Refresh data
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit leave request');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="timeoff-container">
            {success && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--success)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--success)'
                }}>
                    <CheckCircle size={20} />
                    <span>{success}</span>
                </div>
            )}

            {error && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid var(--danger)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--danger)'
                }}>
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}
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
