const express = require('express');
const router = express.Router();

const area = require('../controllers/area-controller')
const animal = require('../controllers/animal-controller')
const analyzes = require('../controllers/analyzes-controller')


/* O interessante aqui é que partindo deste ponto '/api' é zerado no router */
router.route('/area')
    .get(area.select)
    .post(area.insert)
    .put(area.update)


router.route('/animal')
    .get(animal.select)
    .post(animal.insert)


router.route('/analyzes')
    .get(analyzes.select)
    .post(analyzes.insert)

router.get('/execute_parser', animal.executeParser)
router.get('/execute_normalizer', animal.executeNormalizer)

module.exports = router