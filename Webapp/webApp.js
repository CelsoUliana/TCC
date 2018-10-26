'use strict';

const express = require('express')

const main = express()

main.set('view engine', 'ejs')

main.get('/', (req, res) => {
    res.render('pages/index')
})

main.get('/page2', (req, res) => {
    res.render('pages/page2')
})

main.post()

main.listen(8080, () => {
    console.log ('server rodando')
})

