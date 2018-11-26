'use strict';

const express = require('express')
const fs = require('fs')
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

main.use(express.static(__dirname + '/public'))
main.use(express.static('public/css'))
main.use(express.static('public/js'))
main.use(express.static('public/json'))
/*
main.use(express.static('public/includes'))
main.use(express.static('public/images'))
*/
main.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist/')))

/* Routes */
main.get('/', (req, res) => {
    res.render('pages/index')
})

main.get('/mapinitial', (req, res) => {
    res.render('pages/mapa_op')
})

main.get('/page2', (req, res) => {
    res.render('pages/page2')
})

main.get('/map1', (req, res) => {
    res.render('pages/mapleaflet')
})

main.get('/api/json', (req, res) => {
    const data = path.join(__dirname, '/public/json/pontos.json')
    console.log(data)
    res.sendFile(data)
})

main.get('/api/geojson', (req, res) => {
    const data = path.join(__dirname, '/public/json/geojson.json')
    console.log(data)
    res.sendFile(data)
})

main.use('/api', express.static('api') , function(req, res){
    // Optional 404 handler
    res.status(404);
    res.json({error:{code:404}})
});



/* listen port */
main.listen(8080, () => {
    console.log ('server rodando')
})

