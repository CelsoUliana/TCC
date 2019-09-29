const express = require('express');
const router = express.Router();

const area = require('../controllers/area-controller')
const coordinatesAnimal = require('../controllers/animal-controller')
const analyzes = require('../controllers/analyzes-controller')


/* O interessante aqui é que partindo deste ponto '/api' é zerado no router */
router.route('/area')
    .get(area.select)
    .post(area.insert)
    .put(area.update)


router.route('/animal')
    .get(coordinatesAnimal.select)
    .post(coordinatesAnimal.insert)


router.route('/analyzes')
    .get(analyzes.select)
    .post(analyzes.insert)


module.exports = router