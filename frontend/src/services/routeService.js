import apiClient from './apiClient';

const routeService = {
  searchRoutes: async (searchParams) => {
    const response = await apiClient.get('/routes/search', {
      params: searchParams,
    });
    return response.data;
  },

  getRouteById: async (id) => {
    const response = await apiClient.get(`/routes/${id}`);
    return response.data;
  },

  createRoute: async (routeData) => {
    const response = await apiClient.post('/routes', routeData);
    return response.data;
  },

  updateRoute: async (id, routeData) => {
    const response = await apiClient.put(`/routes/${id}`, routeData);
    return response.data;
  },

  deleteRoute: async (id) => {
    const response = await apiClient.delete(`/routes/${id}`);
    return response.data;
  },
};

export default routeService;
