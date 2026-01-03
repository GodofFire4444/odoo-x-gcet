import api from './axios';

/**
 * Get employee's own profile
 * @returns {Promise<Object>} - Employee profile data
 */
export const getProfile = async () => {
    const { data } = await api.get('/employee/profile');
    return data;
};

/**
 * Update employee profile (limited fields)
 * @param {Object} profileData - { phone, address }
 * @returns {Promise<Object>} - Updated employee data
 */
export const updateProfile = async (profileData) => {
    const { data } = await api.put('/employee/profile', profileData);
    return data;
};

/**
 * Upload profile picture
 * @param {string} profilePicture - Base64 encoded image or URL
 * @returns {Promise<Object>} - { message, profilePicture }
 */
export const uploadProfilePicture = async (profilePicture) => {
    const { data } = await api.post('/employee/profile/picture', { profilePicture });
    return data;
};
