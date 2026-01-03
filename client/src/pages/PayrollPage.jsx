import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Download, Eye, FileText, TrendingUp } from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import './payroll.css';

const PayrollPage = () => {
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const payrollHistory = [
        { id: 1, month: 'December 2025', gross: '$5,200', deductions: '$450', net: '$4,750', status: 'paid', date: 'Jan 01, 2026' },
        { id: 2, month: 'November 2025', gross: '$5,200', deductions: '$450', net: '$4,750', status: 'paid', date: 'Dec 01, 2025' },
        { id: 3, month: 'October 2025', gross: '$5,000', deductions: '$400', net: '$4,600', status: 'paid', date: 'Nov 01, 2025' },
        { id: 4, month: 'September 2025', gross: '$5,000', deductions: '$400', net: '$4,600', status: 'paid', date: 'Oct 01, 2025' },
    ];

    const openPayslip = (payroll) => {
        setSelectedPayroll(payroll);
        setIsModalOpen(true);
    };

    const columns = [
        { header: 'Month', accessor: 'month' },
        { header: 'Gross Pay', accessor: 'gross' },
        { header: 'Deductions', accessor: 'deductions' },
        { header: 'Net Pay', accessor: 'net', render: (row) => <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{row.net}</span> },
        { header: 'Date', accessor: 'date' },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Action', accessor: 'id', render: (row) => (
                <button className="view-btn" onClick={() => openPayslip(row)}>
                    <Eye size={16} /> View
                </button>
            )
        },
    ];

    return (
        <div className="payroll-container">
            {/* Header */}
            <div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Payroll</h1>
                <p style={{ color: 'var(--text-muted)' }}>View your salary history and download payslips</p>
            </div>

            {/* Salary Cards */}
            <div className="salary-summary-cards">
                <motion.div className="salary-card primary" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="salary-label">MONTHLY NET SALARY</div>
                    <div className="salary-value">$4,750.00</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.875rem' }}>
                        <TrendingUp size={16} /> +4% from previous quarter
                    </div>
                </motion.div>

                <div className="salary-card">
                    <div className="salary-label">LAST CREDITED DATE</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <Calendar className="text-primary" size={24} style={{ color: 'var(--primary)' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>January 1, 2026</div>
                    </div>
                </div >

                <div className="salary-card">
                    <div className="salary-label">NEXT PAYROLL CYCLE</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                        <CreditCard size={24} style={{ color: 'var(--warning)' }} />
                        <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>January 31, 2026</div>
                    </div>
                </div>
            </div>

            {/* History Table */}
            <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.5rem' }}>Payroll History</h2>
                <DataTable columns={columns} data={payrollHistory} />
            </div>

            {/* Payslip Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Payslip - ${selectedPayroll?.month}`}
                footer={(
                    <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Download PDF
                    </button>
                )}
            >
                <div className="payslip-details">
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dayflow HRMS</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Monthly Payment Statement</p>
                    </div>

                    <div className="payslip-section">
                        <h4>Earnings</h4>
                        <div className="payslip-row">
                            <span>Basic Salary</span>
                            <span>$4,500.00</span>
                        </div>
                        <div className="payslip-row">
                            <span>House Rent Allowance</span>
                            <span>$500.00</span>
                        </div>
                        <div className="payslip-row">
                            <span>Conveyance Allowance</span>
                            <span>$200.00</span>
                        </div>
                    </div>

                    <div className="payslip-section">
                        <h4>Deductions</h4>
                        <div className="payslip-row">
                            <span>Provident Fund</span>
                            <span>-$300.00</span>
                        </div>
                        <div className="payslip-row">
                            <span>Professional Tax</span>
                            <span>-$150.00</span>
                        </div>
                    </div>

                    <div className="payslip-row total">
                        <span>Net Payable Amount</span>
                        <span>{selectedPayroll?.net}</span>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PayrollPage;
