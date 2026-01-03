import api from './axios';

/**
 * Get employee's own payroll records
 * @returns {Promise<Array>} - Array of payroll records
 */
export const getMyPayroll = async () => {
    const { data } = await api.get('/payroll/my');
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

/**
 * Create payroll (Admin only)
 * @param {Object} payrollData - Payroll data
 * @returns {Promise<Object>} - { message, payroll }
 */
export const createPayroll = async (payrollData) => {
    const { data } = await api.post('/payroll', payrollData);
    return data;
};

/**
 * Update payroll (Admin only)
 * @param {string} id - Payroll ID
 * @param {Object} payrollData - Updated payroll data
 * @returns {Promise<Object>} - { message, payroll }
 */
export const updatePayroll = async (id, payrollData) => {
    const { data } = await api.put(`/payroll/${id}`, payrollData);
    return data;
};

/**
 * Delete payroll (Admin only)
 * @param {string} id - Payroll ID
 * @returns {Promise<Object>} - { message }
 */
export const deletePayroll = async (id) => {
    const { data } = await api.delete(`/payroll/${id}`);
    return data;
};
