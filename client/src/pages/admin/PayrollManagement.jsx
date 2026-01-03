import React, { useState, useEffect } from 'react';
import { Download, FileText, DollarSign } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import MetricCard from '../../components/common/MetricCard';
import { getAllPayrolls } from '../../api/admin';

const PayrollManagement = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPayrolls();
    }, []);

    const fetchPayrolls = async () => {
        try {
            const data = await getAllPayrolls();
            const formatted = data.map(p => ({
                id: p._id,
                employee: p.employeeId ? `${p.employeeId.firstName} ${p.employeeId.lastName}` : 'Unknown',
                month: p.month || new Date(p.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }),
                salary: `$${p.grossSalary || 0}`,
                deductions: `-$${p.totalDeductions || 0}`,
                netPay: `$${p.netSalary || 0}`,
                status: p.status || 'Paid'
            }));
            setPayrolls(formatted);
        } catch (error) {
            console.error("Error fetching payrolls", error);
        } finally {
            setLoading(false);
        }
    };

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
                    value={`$${payrolls.reduce((sum, p) => sum + parseFloat(p.netPay.replace('$','')), 0).toLocaleString()}`} 
                    icon={DollarSign} 
                    color="var(--success)"
                />
                <MetricCard 
                    title="Pending Payments" 
                    value={payrolls.filter(p => p.status === 'Pending').length} 
                    label="Records"
                    icon={DollarSign} 
                    color="var(--warning)"
                />
            </div>

            <DataTable columns={columns} data={payrolls} />
        </div>
    );
};

export default PayrollManagement;
