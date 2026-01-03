import React, { useState, useEffect } from 'react';
import { Check, X, MessageSquare } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { getAllLeaves, updateLeaveStatus } from '../../api/admin';

const LeaveRequests = () => {
    const [leaves, setLeaves] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const data = await getAllLeaves();
            const formatted = data.map(leave => {
                const start = new Date(leave.startDate);
                const end = new Date(leave.endDate);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

                return {
                    id: leave._id,
                    employee: leave.employeeId ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}` : 'Unknown',
                    type: leave.leaveType,
                    days: diffDays,
                    startDate: start.toLocaleDateString(),
                    endDate: end.toLocaleDateString(),
                    reason: leave.reason,
                    status: leave.status,
                    adminComment: leave.adminComment
                };
            });
            setLeaves(formatted);
        } catch (error) {
            console.error("Error fetching leaves", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateLeaveStatus(id, status, '');
            fetchLeaves();
        } catch (error) {
            console.error("Error updating leave status", error);
        }
    };

    const filteredLeaves = filter === 'All' ? leaves : leaves.filter(l => l.status === filter);

    const columns = [
        { header: 'Employee', accessor: 'employee', render: (row) => <span style={{ fontWeight: 500 }}>{row.employee}</span> },
        { header: 'Type', accessor: 'type' },
        { header: 'Duration', accessor: 'days', render: (row) => (
            <div>
                <div>{row.days} Days</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.startDate} - {row.endDate}</div>
            </div>
        )},
        { header: 'Reason', accessor: 'reason', render: (row) => (
            <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={row.reason}>
                {row.reason}
            </div>
        )},
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Actions', accessor: 'actions', render: (row) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                {row.status === 'Pending' && (
                    <>
                        <button 
                            className="icon-btn-sm" 
                            style={{ color: 'var(--success)', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                            title="Approve"
                            onClick={() => handleStatusUpdate(row.id, 'Approved')}
                        >
                            <Check size={16} />
                        </button>
                        <button 
                            className="icon-btn-sm" 
                            style={{ color: 'var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            title="Reject"
                            onClick={() => handleStatusUpdate(row.id, 'Rejected')}
                        >
                            <X size={16} />
                        </button>
                    </>
                )}
                <button className="icon-btn-sm" title="Add Comment">
                    <MessageSquare size={16} />
                </button>
            </div>
        )},
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: filter === f ? 'none' : '1px solid var(--border)',
                            backgroundColor: filter === f ? 'var(--primary)' : 'transparent',
                            color: filter === f ? 'white' : 'var(--text-muted)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <DataTable columns={columns} data={filteredLeaves} />
        </div>
    );
};

export default LeaveRequests;
