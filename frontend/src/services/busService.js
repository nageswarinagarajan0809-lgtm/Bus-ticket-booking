import apiClient from './apiClient';

const busService = {
  getAllBuses: async () => {
    const response = await apiClient.get('/buses');
    return response.data;
  },

  getBusById: async (id) => {
    const response = await apiClient.get(`/buses/${id}`);
    return response.data;
  },

  createBus: async (busData) => {
    const response = await apiClient.post('/buses', busData);
    return response.data;
  },

  updateBus: async (id, busData) => {
    const response = await apiClient.put(`/buses/${id}`, busData);
    return response.data;
  },

  deleteBus: async (id) => {
    const response = await apiClient.delete(`/buses/${id}`);
    return response.data;
  },
};

export default busService;
