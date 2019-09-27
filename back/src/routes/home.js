const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController')

router.get('/', controller.getHomePage)
router.get('/map', controller.map)

module.exports = router