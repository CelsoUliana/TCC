'use strict';

const express = require('express')

const path = require('path')

const main = express()

console.log(__dirname)

main.set('view engine', 'ejs')
main.set('views', path.join(__dirname, 'views'))

/*
    settings to static diretories. isn't necessary in .ejs file use href as:
    href=""../../path OR /folder1/css/'name-file-css'.css"
    just:
    href="'name-file-css'.css"
*/
main.use(express.static('public/css'))
main.use(express.static('public/js'))

/* Routes */
main.get('/', (req, res) => {
    res.render('pages/index')
})

main.get('/mapinitial', (req, res) => {
    res.render('pages/map-initial')
})

main.get('/page2', (req, res) => {
    res.render('pages/page2')
})

main.get('/map1', (req, res) => {
    res.render('pages/mapleaflet')
})

/* listem port */
main.listen(8081, () => {
    console.log ('server rodando')
})

