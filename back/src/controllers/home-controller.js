const dataHandler = require('../model/data-handler')

exports.getHomePage = (req, res) => {
    res.render('index')
}

exports.map = (req, res) => {
    let jsons = dataHandler.listOfAllFeatures()
    res.render('mapView', { jsons })
}