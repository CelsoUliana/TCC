// a função é exportada
exports.select = async(req, res) => {
    const parameter = req.query
    console.log('opa!')
    if (parameter.name) {            
        res.json(parameter)
        return 
    }
    res.send('You\'re connected on area -> select!! ')   
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
