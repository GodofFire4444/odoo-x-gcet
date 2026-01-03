import api from './axios';

export const createPayroll = async (payrollData) => {
    const { data } = await api.post('/payroll/create', payrollData);
    return data;
};

export const getMyPayroll = async () => {
    const { data } = await api.get('/payroll/me');
    return data;
};
