const express = require('express');
const busController = require('../controllers/busController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/', busController.getAllBuses);
router.get('/:id', busController.getBusById);

// Admin routes
router.post('/', adminMiddleware, busController.createBus);
router.put('/:id', adminMiddleware, busController.updateBus);
router.delete('/:id', adminMiddleware, busController.deleteBus);

module.exports = router;
