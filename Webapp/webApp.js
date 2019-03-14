'use strict';

const express = require('express')
const fs = require('fs')
const path = require('path')
const geojson = require('./public/json/geojson.json')
const main = express()

const bodyParser = require('body-parser');

console.log(__dirname)

main.set('view engine', 'ejs')
main.set('views', path.join(__dirname, 'views'))

main.use(bodyParser.json()); // for parsing application/json
main.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


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
    const data = path.join(__dirname, '/public/json/geojsontest.json')
    console.log(data)
    res.sendFile(data)
})

main.get('/api/geojson', (req, res) => {
    const data = path.join(__dirname, '/public/json/geojson.json')
    console.log(data)
    res.sendFile(data)
})

/* ------------------------ mexi aqui (apaga depois essa linha) --------------------------------- */

/* criei a page postJson - dá uma olhada

rota para a página page/postJson. ->  [localhost:8080/postJson] */
main.get('/postJson', (req, res) => {
    res.render('pages/postJson')
})

/* pelo que entendi body é quem garante o processo de envio do post. O express então captura o post
e chama o body-parser pra saber o conteudo de 'req' ( body- parser é tipo um container), o express não 
sabe qual o conteudo, apenas o body */

main.post('/post', (req, res) => {

    /* 'let json_require' recebe o json/chave da outra pagina, faça o que quiser com o valor
    - salve em um arquivo, caso seja um json : use require('fs')
    - pegue o json correspondente a chave, caso json_require' seja chave, e envie de volta (use require 
    pro js que tem a função de get() desse json)
    - ou inventa algo com o que veio do cliente side */

    let json_require = req.body     // recebe a informação do cliente side e salva em json_require
    /* let json_require = JSON.stringify(req.body) - vira texto */

    /* 
    enviar seu json com a chave json_require
    let sua_var_que_aloca_json = get(seu_json_servidor_local)
    - use 'res.json(sua_var_que_aloca_json)' para enviar JSON para a pessoa que fez a requisição via chave
    NOTE: res.'json' <- transfere json
    */

    //enviando de volta o json que recebi 
    res.json(json_require)      // abra F12 em localhost:8080/teste pra ver o objeto do json

    //abaixo imprime no lado do servidor
    console.log(JSON.stringify(req.body))
})

/* ------------------------ mexi até aqui (apaga depois essa linha) --------------------------------- */

//quase 
main.post('/api/appendJson', (req, res) => {

    /* A estrutura do geoJson segue o padrão de equivalência body ('api/appendJson') = dataToStringfy 
    (ol.js) logo: 

        body:
            features:
                array: [] (array)
                    geometry: 
                        coordinates: [] (array de 2 pos)
                        type:
                        _proto_:
                    properties:
                    type:
            type:
            _proto_: */

    console.log('\n # ----- begin body -----_#\n')
    console.log(req.body.features.forEach(element => {
        console.log(element.geometry.coordinates)
    }))   
    console.log('\n # ----- end body -----_#\n')

    // esse cara é la de cima
    console.log(geojson)

    /*fs.writeFileSync('./public/json/geojson.json', JSON.stringify(geojson), function(err) {
        if (err) throw err;
        console.log('complete');   
    })*/

    res.send(req.body)
    //res.send(geojson)
})

main.use('/api', express.static('api'), function (req, res) {
    // Optional 404 handler
    res.status(404);
    res.json({ error: { code: 404 } })
});



/* listen port */
main.listen(8080, () => {
    console.log('server rodando')
})

