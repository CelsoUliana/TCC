const express = require('express');
const router = express.Router();

const controller = require('../controllers/homeController')

router.get('/', controller.getHomePage)
router.get('/home', controller.getHomePage)

module.exports = router