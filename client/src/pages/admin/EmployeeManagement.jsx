import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Edit2, Trash2, Search, Mail, Phone, Building, User, AlertCircle, CheckCircle, X } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../api/admin';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [tempPassword, setTempPassword] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        privateInfo: {
            dateOfBirth: '',
            address: '',
            nationality: '',
            gender: '',
            dateOfJoining: ''
        }
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('privateInfo.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                privateInfo: { ...prev.privateInfo, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            privateInfo: {
                dateOfBirth: '',
                address: '',
                nationality: '',
                gender: '',
                dateOfJoining: ''
            }
        });
        setIsEditMode(false);
        setSelectedEmployee(null);
        setTempPassword(null);
    };

    const handleAddEmployee = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setFormData({
            firstName: employee.firstName || '',
            lastName: employee.lastName || '',
            email: employee.email || '',
            phone: employee.phone || '',
            privateInfo: {
                dateOfBirth: employee.privateInfo?.dateOfBirth ? new Date(employee.privateInfo.dateOfBirth).toISOString().split('T')[0] : '',
                address: employee.privateInfo?.address || '',
                nationality: employee.privateInfo?.nationality || '',
                gender: employee.privateInfo?.gender || '',
                dateOfJoining: employee.privateInfo?.dateOfJoining ? new Date(employee.privateInfo.dateOfJoining).toISOString().split('T')[0] : ''
            }
        });
        setSelectedEmployee(employee);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setSubmitting(true);

        try {
            if (isEditMode) {
                await updateEmployee(selectedEmployee._id, formData);
                setSuccess('Employee updated successfully!');
            } else {
                const result = await createEmployee(formData);
                setTempPassword(result.tempPassword);
                setSuccess(`Employee created! Temporary password: ${result.tempPassword}`);
            }
            await fetchEmployees();
            if (isEditMode) {
                setIsModalOpen(false);
                resetForm();
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Operation failed');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteEmployee = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;

        try {
            await deleteEmployee(id);
            setSuccess('Employee deleted successfully');
            await fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.error || 'Delete failed');
        }
    };

    const filteredEmployees = employees.filter(emp =>
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            header: 'Employee ID',
            accessor: 'employeeId',
            render: (row) => <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{row.employeeId}</span>
        },
        {
            header: 'Name',
            accessor: 'firstName',
            render: (row) => <span style={{ fontWeight: 500 }}>{row.firstName} {row.lastName}</span>
        },
        { header: 'Email', accessor: 'email' },
        { header: 'Phone', accessor: 'phone', render: (row) => row.phone || 'N/A' },
        {
            header: 'Actions',
            accessor: '_id',
            render: (row) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="icon-btn-sm"
                        style={{ color: 'var(--primary)', backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                        onClick={() => handleEditEmployee(row)}
                        title="Edit"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button
                        className="icon-btn-sm"
                        style={{ color: 'var(--danger)', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        onClick={() => handleDeleteEmployee(row._id)}
                        title="Delete"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {success && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid var(--success)',
                    borderRadius: 'var(--radius-md)',
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--danger)'
                }}>
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '2.5rem', width: '100%' }}
                    />
                </div>
                <button className="btn-primary" onClick={handleAddEmployee} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UserPlus size={20} />
                    Add Employee
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>Loading employees...</div>
            ) : filteredEmployees.length > 0 ? (
                <DataTable columns={columns} data={filteredEmployees} />
            ) : (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    {searchTerm ? 'No employees found matching your search' : 'No employees yet. Add your first employee!'}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); resetForm(); }}
                title={isEditMode ? 'Edit Employee' : 'Add New Employee'}
                footer={
                    <>
                        <button className="tab-btn" onClick={() => { setIsModalOpen(false); resetForm(); }} disabled={submitting}>
                            Cancel
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleSubmit}
                            disabled={submitting}
                            style={{ opacity: submitting ? 0.6 : 1 }}
                        >
                            {submitting ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Create Employee')}
                        </button>
                    </>
                }
            >
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {tempPassword && (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid var(--primary)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1rem'
                        }}>
                            <strong>Temporary Password:</strong> {tempPassword}
                            <br />
                            <small style={{ color: 'var(--text-muted)' }}>Please share this with the employee</small>
                        </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                placeholder="John"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={isEditMode}
                                placeholder="john@company.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+1 234 567 8900"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            name="privateInfo.address"
                            value={formData.privateInfo.address}
                            onChange={handleInputChange}
                            rows="2"
                            placeholder="123 Main St, City, Country"
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="privateInfo.dateOfBirth"
                                value={formData.privateInfo.dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                name="privateInfo.dateOfJoining"
                                value={formData.privateInfo.dateOfJoining}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="privateInfo.gender"
                                value={formData.privateInfo.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nationality</label>
                            <input
                                type="text"
                                name="privateInfo.nationality"
                                value={formData.privateInfo.nationality}
                                onChange={handleInputChange}
                                placeholder="e.g., Indian, American"
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EmployeeManagement;
