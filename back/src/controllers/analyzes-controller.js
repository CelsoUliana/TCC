// a função é exportada
exports.select = async(req, res) => {
    
    console.log('opa!')
    res.send('You\'re connected on analyzes -> select!!')
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
