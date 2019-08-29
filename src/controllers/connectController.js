// a função é exportada
exports.connect = async(req, res) => {
    console.log('opa!')
    res.send('You\'re connected!')
}

exports.getHomePage = (req, res) => {
    res.render('index')
}
