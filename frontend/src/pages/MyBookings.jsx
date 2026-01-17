import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';
import toast from 'react-hot-toast';
import { FaTicketAlt, FaMapMarkerAlt, FaCalendar, FaTrash } from 'react-icons/fa';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      if (!user) return;
      const response = await bookingService.getUserBookings(user.id);
      setBookings(response.bookings || []);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingService.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Booking ID</p>
                    <p className="font-mono font-bold">{booking._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p
                      className={`font-bold ${
                        booking.status === 'confirmed'
                          ? 'text-green-600'
                          : booking.status === 'cancelled'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {booking.status.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Route</p>
                      <p className="font-semibold">
                        {booking.route?.from} → {booking.route?.to}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaCalendar className="text-blue-600 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Journey Date</p>
                      <p className="font-semibold">
                        {new Date(booking.journeyDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaTicketAlt className="text-blue-600 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Seats</p>
                      <p className="font-semibold">{booking.seats.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Bus</p>
                    <p className="font-semibold">{booking.bus?.busName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Fare</p>
                    <p className="text-2xl font-bold text-green-600">₹{booking.totalFare}</p>
                  </div>
                </div>

                {booking.status !== 'cancelled' && (
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="mt-4 btn-danger flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-xl text-gray-600">No bookings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
