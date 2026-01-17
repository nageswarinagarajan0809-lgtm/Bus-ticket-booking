import React, { createContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    routeId: null,
    busId: null,
    selectedSeats: [],
    journeyDate: null,
    passengerDetails: [],
  });

  const [bookings, setBookings] = useState([]);

  const updateBookingData = (data) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const removeBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const clearBookingData = () => {
    setBookingData({
      routeId: null,
      busId: null,
      selectedSeats: [],
      journeyDate: null,
      passengerDetails: [],
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        clearBookingData,
        bookings,
        addBooking,
        removeBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = React.useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
