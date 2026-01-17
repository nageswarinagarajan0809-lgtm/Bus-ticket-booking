const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const Route = require('../models/Route');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { busId, routeId, seats, journeyDate, passengerDetails } = req.body;
    const userId = req.user.id;

    // Validation
    if (!busId || !routeId || !seats || !journeyDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if bus exists
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    // Check if route exists
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    // Check available seats
    if (seats.length > bus.availableSeats) {
      return res.status(400).json({
        success: false,
        message: 'Not enough seats available',
      });
    }

    // Calculate total fare
    const totalFare = seats.length * route.baseFare;

    // Create booking
    const booking = new Booking({
      user: userId,
      bus: busId,
      route: routeId,
      seats,
      journeyDate,
      totalFare,
      passengerDetails,
      status: 'confirmed',
    });

    await booking.save();

    // Update available seats
    bus.availableSeats -= seats.length;
    await bus.save();

    // Populate references
    await booking.populate(['user', 'bus', 'route']);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({ user: userId })
      .populate(['user', 'bus', 'route'])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all bookings (Admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(['user', 'bus', 'route'])
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(['user', 'bus', 'route']);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Booking is already cancelled',
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Return seats to bus
    const bus = await Bus.findById(booking.bus);
    bus.availableSeats += booking.seats.length;
    await bus.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
