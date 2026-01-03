import api from './axios';

/**
 * User login
 * @param {Object} credentials - { email, password, role }
 * @returns {Promise<Object>} - { token, user }
 */
export const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    // Store user info in localStorage
    if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

/**
 * User registration
 * @param {Object} userData - { email, password, role, firstName, lastName }
 * @returns {Promise<Object>} - { token, user, message }
 */
export const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    // Store user info in localStorage
    if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

/**
 * Admin signup (legacy support)
 * @param {Object} adminData - { name, companyName, email, phone, password }
 * @returns {Promise<Object>}
 */
export const adminSignup = async (adminData) => {
    const { data } = await api.post('/auth/register', {
        ...adminData,
        role: 'ADMIN'
    });
    if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
};

/**
 * Logout user (client-side only)
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} - User object or null
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
