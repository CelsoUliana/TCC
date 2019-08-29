const express = require('express');
const router = express.Router();

const controller = require('../controllers/connectController')

/* O interessante aqui é que partindo deste ponto '/connect' é zerado no router */
router.get('/', controller.connect)
router.get('/tohome', controller.getHomePage)

module.exports = router