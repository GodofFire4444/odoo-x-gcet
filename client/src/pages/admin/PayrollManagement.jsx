import React, { useState, useEffect } from 'react';
import { Download, FileText, DollarSign, Plus, X, Calculator } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import MetricCard from '../../components/common/MetricCard';
import Modal from '../../components/common/Modal';
import { getAllPayrolls, createPayroll } from '../../api/payroll';
import { getAllEmployees } from '../../api/admin';

const PayrollManagement = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        employeeId: '',
        month: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
        components: {
            basicSalary: 0,
            hra: 0,
            standardAllowance: 0,
            performanceBonus: 0,
            fixedAllowance: 0
        },
        pf: {
            employee: 0
        },
        tax: {
            professionalTax: 200
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [payrollData, employeeData] = await Promise.all([
                getAllPayrolls(),
                getAllEmployees()
            ]);

            const formatted = payrollData.map(p => ({
                id: p._id,
                employee: p.employeeId ? `${p.employeeId.firstName} ${p.employeeId.lastName}` : 'Unknown',
                employeeId: p.employeeId?.employeeId || 'N/A',
                month: p.month,
                salary: `$${p.grossSalary || 0}`,
                deductions: `-$${p.totalDeductions || 0}`,
                netPay: `$${p.netSalary || 0}`,
                status: p.status || 'Paid'
            }));

            setPayrolls(formatted);
            setEmployees(employeeData);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePayroll = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await createPayroll(formData);
            await fetchData();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error creating payroll", error);
            alert("Failed to create payroll. Please check if the employee ID is valid.");
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            employeeId: '',
            month: `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
            components: {
                basicSalary: 0,
                hra: 0,
                standardAllowance: 0,
                performanceBonus: 0,
                fixedAllowance: 0
            },
            pf: {
                employee: 0
            },
            tax: {
                professionalTax: 200
            }
        });
    };

    const handleComponentChange = (field, value) => {
        setFormData({
            ...formData,
            components: {
                ...formData.components,
                [field]: Number(value)
            }
        });
    };

    const calculateGross = () => {
        const { basicSalary, hra, standardAllowance, performanceBonus, fixedAllowance } = formData.components;
        return basicSalary + hra + standardAllowance + performanceBonus + fixedAllowance;
    };

    const calculateDeductions = () => {
        return (formData.pf.employee || 0) + (formData.tax.professionalTax || 0);
    };

    const calculateNet = () => {
        return calculateGross() - calculateDeductions();
    };

    const columns = [
        {
            header: 'Employee', accessor: 'employee', render: (row) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{row.employee}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.employeeId}</div>
                </div>
            )
        },
        { header: 'Month', accessor: 'month' },
        { header: 'Gross Salary', accessor: 'salary' },
        { header: 'Deductions', accessor: 'deductions', render: (row) => <span style={{ color: 'var(--danger)' }}>{row.deductions}</span> },
        { header: 'Net Pay', accessor: 'netPay', render: (row) => <span style={{ fontWeight: 600, color: 'var(--success)' }}>{row.netPay}</span> },
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status} /> },
        {
            header: 'Actions', accessor: 'actions', render: () => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="icon-btn-sm" title="View Payslip">
                        <FileText size={16} />
                    </button>
                    <button className="icon-btn-sm" title="Download">
                        <Download size={16} />
                    </button>
                </div>
            )
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                    <MetricCard
                        title="Total Payroll"
                        value={`$${payrolls.reduce((sum, p) => sum + parseFloat(p.netPay.replace('$', '')), 0).toLocaleString()}`}
                        icon={DollarSign}
                        color="var(--success)"
                    />
                    <MetricCard
                        title="Recent Issues"
                        value={payrolls.length}
                        label="Records"
                        icon={FileText}
                        color="var(--primary)"
                    />
                </div>
                <button
                    className="btn-primary"
                    onClick={() => setIsModalOpen(true)}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Issue Salary
                </button>
            </div>

            <DataTable columns={columns} data={payrolls} loading={loading} />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Issue New Salary"
                width="600px"
            >
                <form onSubmit={handleCreatePayroll} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label className="field-label">Employee</label>
                            <select
                                value={formData.employeeId}
                                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                required
                                className="form-input"
                                style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.firstName} {emp.lastName} ({emp.employeeId})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="field-label">Month</label>
                            <input
                                type="text"
                                value={formData.month}
                                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                                required
                                className="form-input"
                                style={{ width: '100%', padding: '0.625rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--surface)' }}
                            />
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calculator size={18} /> Salary Components
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>Basic Salary</label>
                                <input type="number" value={formData.components.basicSalary} onChange={(e) => handleComponentChange('basicSalary', e.target.value)} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>HRA</label>
                                <input type="number" value={formData.components.hra} onChange={(e) => handleComponentChange('hra', e.target.value)} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>Standard Allowance</label>
                                <input type="number" value={formData.components.standardAllowance} onChange={(e) => handleComponentChange('standardAllowance', e.target.value)} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>Performance Bonus</label>
                                <input type="number" value={formData.components.performanceBonus} onChange={(e) => handleComponentChange('performanceBonus', e.target.value)} className="form-input" style={{ width: '100%', padding: '0.5rem' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem' }}>Deductions</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>PF (Employee Contribution)</label>
                                <input
                                    type="number"
                                    value={formData.pf.employee}
                                    onChange={(e) => setFormData({ ...formData, pf: { ...formData.pf, employee: Number(e.target.value) } })}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.5rem' }}
                                />
                            </div>
                            <div>
                                <label className="field-label" style={{ fontSize: '0.75rem' }}>Professional Tax</label>
                                <input
                                    type="number"
                                    value={formData.tax.professionalTax}
                                    onChange={(e) => setFormData({ ...formData, tax: { ...formData.tax, professionalTax: Number(e.target.value) } })}
                                    className="form-input"
                                    style={{ width: '100%', padding: '0.5rem' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--surface-hover)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '1rem'
                    }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Payable Salary</div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--success)' }}>${calculateNet()}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gross: ${calculateGross()}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deductions: ${calculateDeductions()}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="view-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={submitting}>
                            {submitting ? 'Processing...' : 'Process Payroll'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PayrollManagement;

