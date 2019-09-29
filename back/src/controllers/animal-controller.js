const dataHandler = require('../model/data-handler')
const constants = require('../constants')

exports.select = async(req, res) => {
    const parameter = req.query
    
    if (parameter.name) {  
        let file = parameter.name + '.json'   
        await dataHandler.get(file, constants.ANIMAL_MODEL, (content) => {
            res.json(content)
        })
        return 
    }

    res.json(dataHandler.listOfAllFeatures(constants.ANIMAL_MODEL))   
}

exports.update = async(req, res) => {
    console.log('opa!')
    res.send('You\'re connected!')
}

exports.insert = async(req, res) => {
    console.log('opa!')
    res.send('You\'re connected!')
}

exports.getHomePage = (req, res) => {
    res.render('index')
}
