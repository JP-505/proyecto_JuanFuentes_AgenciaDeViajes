import axios from 'axios';

const API_URL = `${(import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/+$/, '')}/api/paquetes`;

export const fetchPaquetes = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

export const fetchPaquete = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createPaquete = async (data) => {
    const response = await axios.post(`${API_URL}/`, data);
    return response.data;
};

export const updatePaquete = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
};

export const deletePaquete = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const getApiErrorMessage = (error, fallback) => {
    if (!axios.isAxiosError(error)) {
        return fallback;
    }

    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') {
        return detail;
    }
    if (Array.isArray(detail)) {
        return detail
            .map((item) => `${item.loc?.slice(1).join('.') || 'Dato'}: ${item.msg}`)
            .join(' ');
    }
    return fallback;
};