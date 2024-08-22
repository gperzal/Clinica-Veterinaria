import axios from 'axios';

const API_URL = '/api/appointments';

export const fetchAppointments = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createAppointment = async (appointmentData) => {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
};

export const cancelAppointment = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const rescheduleAppointment = async (id, newDate) => {
    const response = await axios.put(`${API_URL}/${id}`, { date: newDate });
    return response.data;
};
