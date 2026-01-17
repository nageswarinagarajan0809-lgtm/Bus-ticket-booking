const express = require('express');
const routeController = require('../controllers/routeController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

const router = express.Router();

// Public routes
router.get('/search', routeController.searchRoutes);
router.get('/:id', routeController.getRouteById);

// Admin routes
router.post('/', adminMiddleware, routeController.createRoute);
router.put('/:id', adminMiddleware, routeController.updateRoute);
router.delete('/:id', adminMiddleware, routeController.deleteRoute);

module.exports = router;
