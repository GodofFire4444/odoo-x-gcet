import api from './axios';

export const checkIn = async () => {
    const { data } = await api.post('/attendance/checkin');
    return data;
};

export const checkOut = async () => {
    const { data } = await api.post('/attendance/checkout');
    return data;
};

export const getAllAttendance = async () => {
    const { data } = await api.get('/attendance/all');
    return data;
};
