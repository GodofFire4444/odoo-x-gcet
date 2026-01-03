import api from './axios';

export const createEmployee = async (employeeData) => {
    const { data } = await api.post('/admin/create-employee', employeeData);
    return data;
};

export const getMyProfile = async () => {
    const { data } = await api.get('/employee/me');
    return data;
};

export const updateMyProfile = async (profileData) => {
    const { data } = await api.put('/employee/me', profileData);
    return data;
};
