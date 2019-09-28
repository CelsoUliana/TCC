const express = require('express')
const router = express.Router()
const path = require('path')

const init = (app) => {
    const controller = require('../controllers/home-controller')

    // serve the files out of ./public as our main files
    app.use(express.static(path.join(__dirname, '../../../front_temp/pub/')))

    // set folder of project views
    app.set('views', path.resolve(__dirname, '../../../front_temp/vieeee'))


    // mais pra frente essas linhas somem
    router.get('/', controller.getHomePage)
    router.get('/map', controller.map)

}

module.exports = { router, init }