import React from 'react';
import { Download, FileText, DollarSign } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import MetricCard from '../../components/common/MetricCard';
import { mockPayroll } from '../../data/mockAdminData';

const PayrollManagement = () => {
    const columns = [
        { header: 'Employee', accessor: 'employee', render: (row) => <span style={{ fontWeight: 500 }}>{row.employee}</span> },
        { header: 'Month', accessor: 'month' },
        { header: 'Salary', accessor: 'salary' },
        { header: 'Deductions', accessor: 'deductions', render: (row) => <span style={{ color: 'var(--danger)' }}>{row.deductions}</span> },
        { header: 'Net Pay', accessor: 'netPay', render: (row) => <span style={{ fontWeight: 600, color: 'var(--success)' }}>{row.netPay}</span> },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        { header: 'Actions', accessor: 'actions', render: () => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="icon-btn-sm" title="View Payslip">
                    <FileText size={16} />
                </button>
                <button className="icon-btn-sm" title="Download">
                    <Download size={16} />
                </button>
            </div>
        )},
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <MetricCard 
                    title="Total Payroll" 
                    value="$124,500" 
                    icon={DollarSign} 
                    color="var(--success)"
                />
                <MetricCard 
                    title="Pending Payments" 
                    value="$12,400" 
                    icon={DollarSign} 
                    color="var(--warning)"
                />
            </div>

            <DataTable columns={columns} data={mockPayroll} />
        </div>
    );
};

export default PayrollManagement;
