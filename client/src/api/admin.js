import api from './axios';

export const getAllEmployees = async () => {
    const { data } = await api.get('/admin/employees');
    return data;
};

export const getAllAttendance = async () => {
    const { data } = await api.get('/attendance/all');
    return data;
};

export const getAllLeaves = async () => {
    const { data } = await api.get('/leave/all');
    return data;
};

export const updateLeaveStatus = async (id, status, adminComment) => {
    const { data } = await api.put(`/leave/${id}/status`, { status, adminComment });
    return data;
};

export const getAllPayrolls = async () => {
    const { data } = await api.get('/payroll/all');
    return data;
};
