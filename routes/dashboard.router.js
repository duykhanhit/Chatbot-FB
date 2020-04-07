const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');

let router = express.Router();

router.get('/', dashboardController.getDashboard);

router.post('/', dashboardController.postDashboard);

module.exports = router;