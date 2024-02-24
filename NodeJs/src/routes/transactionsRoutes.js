const express = require('express');
const router = express.Router();
const checkInOutController = require('../controllers/checkInOutController');

// Check-in route
router.post('/check-in', checkInOutController.checkIn);

// Check-out route
router.put('/check-out', checkInOutController.checkOut);

// Get check-ins for user route
router.get('/check-ins/:username', checkInOutController.getAllCheckInsForUser);

// Route for updating a check-in record
router.put('/check-in', checkInOutController.updateCheckIn);

module.exports = router;
