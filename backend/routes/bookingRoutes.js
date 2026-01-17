const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Protected routes
router.post('/', authMiddleware, bookingController.createBooking);
router.get('/user/:userId', authMiddleware, bookingController.getUserBookings);
router.get('/:id', authMiddleware, bookingController.getBookingById);
router.delete('/:id', authMiddleware, bookingController.cancelBooking);

// Admin routes
router.get('/', adminMiddleware, bookingController.getAllBookings);

module.exports = router;
