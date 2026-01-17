import apiClient from './apiClient';

const bookingService = {
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  getUserBookings: async (userId) => {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data;
  },

  getBookingById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await apiClient.get('/bookings');
    return response.data;
  },

  cancelBooking: async (id) => {
    const response = await apiClient.delete(`/bookings/${id}`);
    return response.data;
  },
};

export default bookingService;
