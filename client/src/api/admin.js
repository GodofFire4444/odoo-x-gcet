import api from './axios';

/**
 * Get all employees (Admin only)
 * @returns {Promise<Array>} - Array of employees
 */
export const getAllEmployees = async () => {
    const { data } = await api.get('/admin/employees');
    return data;
};

/**
 * Get employee by ID (Admin only)
 * @param {string} id - Employee ID
 * @returns {Promise<Object>} - Employee data
 */
export const getEmployeeById = async (id) => {
    const { data } = await api.get(`/admin/employees/${id}`);
    return data;
};

/**
 * Create employee (Admin only)
 * @param {Object} employeeData - Employee data
 * @returns {Promise<Object>} - { message, employee, tempPassword }
 */
export const createEmployee = async (employeeData) => {
    const { data } = await api.post('/admin/employees', employeeData);
    return data;
};

/**
 * Update employee (Admin only)
 * @param {string} id - Employee ID
 * @param {Object} employeeData - Updated employee data
 * @returns {Promise<Object>} - { message, employee }
 */
export const updateEmployee = async (id, employeeData) => {
    const { data } = await api.put(`/admin/employees/${id}`, employeeData);
    return data;
};

/**
 * Delete employee (Admin only)
 * @param {string} id - Employee ID
 * @returns {Promise<Object>} - { message }
 */
export const deleteEmployee = async (id) => {
    const { data } = await api.delete(`/admin/employees/${id}`);
    return data;
};

/**
 * Get all leave requests (Admin only)
 * @param {Object} filters - { status, employeeId }
 * @returns {Promise<Array>} - Array of leave requests
 */
export const getAllLeaves = async (filters = {}) => {
    const { data } = await api.get('/leave/all', { params: filters });
    return data;
};

/**
 * Update leave status (Admin only)
 * @param {string} id - Leave request ID
 * @param {string} status - New status
 * @param {string} adminComment - Admin comment
 * @returns {Promise<Object>} - { message, leave }
 */
export const updateLeaveStatus = async (id, status, adminComment = '') => {
    const { data } = await api.put(`/leave/${id}/status`, { status, adminComment });
    return data;
};

/**
 * Get all payrolls (Admin only)
 * @param {Object} filters - { employeeId, month }
 * @returns {Promise<Array>} - Array of payroll records
 */
export const getAllPayrolls = async (filters = {}) => {
    const { data } = await api.get('/payroll/all', { params: filters });
    return data;
};
