const dataHandler = require('../model/data-handler')
const constants = require('../constants')

exports.select = async (req, res) => {
    const parameter = req.query
    
    if (parameter.name) {  
        let file = parameter.name + '.json'   
        await dataHandler.get(file, constants.AREA_MODEL , (content) => {
            res.json(content)
        })
        return 
    }

    res.json(dataHandler.listOfAllFeatures(constants.AREA_MODEL))   
}


exports.update = async(req, res) => {
    console.log('opa!')
    res.send('You\'re connected!')
}


exports.insert = async(req, res) => {
    dataHandler.write(req.body, constants.AREA_MODEL)
    res.send(req.body)
}


exports.getHomePage = (req, res) => {
    res.render('index')
}