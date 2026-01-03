import React, { useState, useEffect } from 'react';
import { Search, Eye, Edit2, UserPlus, MoreHorizontal } from 'lucide-react';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';
import { getAllEmployees } from '../../api/admin';
import { createEmployee } from '../../api/employee';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEmployees = employees.filter(emp =>
        (emp.firstName + ' ' + emp.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (emp.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewEmployee = (employee) => {
        setSelectedEmployee(employee);
        setIsModalOpen(true);
    };

    const columns = [
        { header: 'Employee ID', accessor: 'employeeId' },
        { header: 'Name', accessor: 'firstName', render: (row) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 600 }}>
                    {row.firstName.charAt(0)}
                </div>
                <div>
                    <div style={{ fontWeight: 500 }}>{`${row.firstName} ${row.lastName}`}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.email}</div>
                </div>
            </div>
        )},
        { header: 'Role', accessor: 'role' },
        { header: 'Department', accessor: 'department' }, // Assuming department is added to model later or is optional
        { header: 'Status', accessor: 'status', render: (row) => <StatusBadge status={row.status || 'Active'} /> }, // Default to Active if status missing
        { header: 'Actions', accessor: 'actions', render: (row) => (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                    className="icon-btn-sm" 
                    onClick={() => handleViewEmployee(row)}
                    title="View Details"
                >
                    <Eye size={16} />
                </button>
                <button className="icon-btn-sm" title="Edit">
                    <Edit2 size={16} />
                </button>
            </div>
        )},
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div className="search-box" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    backgroundColor: 'var(--surface)', 
                    padding: '0.5rem 1rem', 
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    width: '300px'
                }}>
                    <Search size={18} color="var(--text-muted)" />
                    <input 
                        type="text" 
                        placeholder="Search employees..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            outline: 'none', 
                            width: '100%',
                            color: 'var(--text-main)'
                        }}
                    />
                </div>

                <button className="btn-primary" style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                }}>
                    <UserPlus size={18} />
                    Add Employee
                </button>
            </div>

            {/* Table */}
            <DataTable columns={columns} data={filteredEmployees} />

            {/* Detail Modal */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Employee Details"
                footer={
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'var(--surface)',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                }
            >
                {selectedEmployee && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--surface-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                                {selectedEmployee.name.charAt(0)}
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{selectedEmployee.name}</h2>
                                <p style={{ color: 'var(--text-muted)' }}>{selectedEmployee.role}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Employee ID</label>
                                <div style={{ fontWeight: 500 }}>{selectedEmployee.id}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Department</label>
                                <div style={{ fontWeight: 500 }}>{selectedEmployee.department}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Join Date</label>
                                <div style={{ fontWeight: 500 }}>{selectedEmployee.joinDate}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Email</label>
                                <div style={{ fontWeight: 500 }}>{selectedEmployee.email}</div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Status</label>
                                <div style={{ marginTop: '0.25rem' }}><StatusBadge status={selectedEmployee.status} /></div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default EmployeeManagement;
