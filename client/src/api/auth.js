import api from './axios';

export const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
};

export const adminSignup = async (adminData) => {
    const { data } = await api.post('/admin/signup', adminData);
    return data;
};
