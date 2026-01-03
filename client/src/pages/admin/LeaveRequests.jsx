import React from 'react';
import { Check, X, MessageSquare } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { mockLeaveRequests } from '../../data/mockAdminData';

const LeaveRequests = () => {
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
                        >
                            <Check size={16} />
                        </button>
                        <button 
                            className="icon-btn-sm" 
                            style={{ color: 'var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                            title="Reject"
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
                {['All', 'Pending', 'Approved', 'Rejected'].map(filter => (
                    <button 
                        key={filter}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            border: filter === 'All' ? 'none' : '1px solid var(--border)',
                            backgroundColor: filter === 'All' ? 'var(--primary)' : 'transparent',
                            color: filter === 'All' ? 'white' : 'var(--text-muted)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'pointer'
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <DataTable columns={columns} data={mockLeaveRequests} />
        </div>
    );
};

export default LeaveRequests;
