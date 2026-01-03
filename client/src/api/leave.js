import api from './axios';

/**
 * Apply for leave
 * @param {Object} leaveData - { leaveType, startDate, endDate, reason }
 * @returns {Promise<Object>} - { message, leave }
 */
export const applyLeave = async (leaveData) => {
    const { data } = await api.post('/leave/apply', leaveData);
    return data;
};

/**
 * Get employee's own leave requests
 * @param {string} status - Optional filter by status
 * @returns {Promise<Array>} - Array of leave requests
 */
export const getMyLeaves = async (status) => {
    const params = status ? { status } : {};
    const { data } = await api.get('/leave/my', { params });
    return data;
};

/**
 * Get leave balance
 * @returns {Promise<Object>} - { paidLeave, sickLeave, unpaidLeave }
 */
export const getLeaveBalance = async () => {
    const { data } = await api.get('/leave/balance');
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
 * @param {string} status - New status (Pending, Approved, Rejected)
 * @param {string} adminComment - Optional admin comment
 * @returns {Promise<Object>} - { message, leave }
 */
export const updateLeaveStatus = async (id, status, adminComment = '') => {
    const { data } = await api.put(`/leave/${id}/status`, { status, adminComment });
    return data;
};
