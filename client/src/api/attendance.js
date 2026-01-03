import api from './axios';

/**
 * Check in for the day
 * @returns {Promise<Object>} - { message, attendance }
 */
export const checkIn = async () => {
    const { data } = await api.post('/attendance/checkin');
    return data;
};

/**
 * Check out for the day
 * @returns {Promise<Object>} - { message, attendance }
 */
export const checkOut = async () => {
    const { data } = await api.post('/attendance/checkout');
    return data;
};

/**
 * Get employee's own attendance records
 * @param {string} startDate - Optional start date (YYYY-MM-DD)
 * @param {string} endDate - Optional end date (YYYY-MM-DD)
 * @returns {Promise<Array>} - Array of attendance records
 */
export const getMyAttendance = async (startDate, endDate) => {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    const { data } = await api.get('/attendance/my', { params });
    return data;
};

/**
 * Get today's attendance status
 * @returns {Promise<Object>} - { hasCheckedIn, hasCheckedOut, attendance }
 */
export const getTodayAttendance = async () => {
    const { data } = await api.get('/attendance/today');
    return data;
};

/**
 * Get all attendance records (Admin only)
 * @param {Object} filters - { startDate, endDate, employeeId }
 * @returns {Promise<Array>} - Array of attendance records
 */
export const getAllAttendance = async (filters = {}) => {
    const { data } = await api.get('/attendance/all', { params: filters });
    return data;
};
