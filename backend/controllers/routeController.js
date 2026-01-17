const Route = require('../models/Route');
const Bus = require('../models/Bus');

// Search routes
exports.searchRoutes = async (req, res) => {
  try {
    const { from, to, journeyDate } = req.query;

    // Validation
    if (!from || !to || !journeyDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide from, to, and journeyDate',
      });
    }

    // Search routes
    const routes = await Route.find({
      from: { $regex: from, $options: 'i' },
      to: { $regex: to, $options: 'i' },
      journeyDate: {
        $gte: new Date(journeyDate),
        $lt: new Date(new Date(journeyDate).getTime() + 24 * 60 * 60 * 1000),
      },
    })
      .populate('bus')
      .sort({ departureTime: 1 });

    res.status(200).json({
      success: true,
      count: routes.length,
      routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate('bus');
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }
    res.status(200).json({
      success: true,
      route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create route (Admin only)
exports.createRoute = async (req, res) => {
  try {
    const { from, to, distance, duration, departureTime, arrivalTime, baseFare, bus, journeyDate } = req.body;

    // Validation
    if (!from || !to || !distance || !duration || !departureTime || !arrivalTime || !baseFare || !bus || !journeyDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if bus exists
    const busExists = await Bus.findById(bus);
    if (!busExists) {
      return res.status(404).json({
        success: false,
        message: 'Bus not found',
      });
    }

    const route = new Route({
      from,
      to,
      distance,
      duration,
      departureTime,
      arrivalTime,
      baseFare,
      bus,
      journeyDate,
    });

    await route.save();
    await route.populate('bus');

    res.status(201).json({
      success: true,
      message: 'Route created successfully',
      route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update route (Admin only)
exports.updateRoute = async (req, res) => {
  try {
    let route = await Route.findById(req.params.id);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('bus');

    res.status(200).json({
      success: true,
      message: 'Route updated successfully',
      route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete route (Admin only)
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Route deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
