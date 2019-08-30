'use strict';

const express = require('express')
const fs = require('fs')
const path = require('path')
const geojson = readJSON('./public/json/newJson.json')
const geojson2 = require('./public/json/toTest2.json')
const main = express()

const bodyParser = require('body-parser');
const DIR_JSON = __dirname + '/public/json/newJson.json'

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
    //console.log(data)
    res.sendFile(data)
})

main.get('/api/geojson', (req, res) => {
    const pt = path.join(__dirname, '/public/json/newJson.json')
    /* const data = path.join(__dirname, '/public/json/newJson.json')

    
    console.log('here');
    console.log(data)
    console.log('----- pass'); */
    let data = geojson
    //res.json(data)
    res.sendFile(pt)
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

    // Ainda possui o problema das coordenadas não estarem vindo de acordo com o que deveria vir

    console.log('\n # ----- begin body -----_#\n')
    console.log(req.body.features.forEach(element => {
        console.log(element.geometry.coordinates)
    }))   
    console.log('\n # ----- end body -----_#\n')

    console.log(req.body)


    /*      --DESCOMENTE SE QUISER VER OS DADOS SENDO SALVOS  
    escreve o arquivo JSON --> mellhora mais pra frente para fazer append e gerar por usuario */
    /* ESTA ---> */   
    writeFile(DIR_JSON, req.body)

    /*
        WESLEY: O retorno do cliente está vindo certo e se upado sem as " ele upa pro mapa
        corretamente. Se tentando o arquivo do modo como é recebido servidor e salvo não está 
        upando ainda.

        Fica na parte de coordenadas da seguinte forma que se segue:

        "coordinates":[[
            [ '-54.50660705566407', '-20.3678024183598' ],
            [ '-54.190750122070305', '-20.730428476781327' ],
            [ '-54.259414672851555', '-20.29955357220807' ],
            [ '-54.50660705566407', '-20.3678024183598' ] ]

        As aspas em "-54.73594665527343" devem estar atrapahando na hora de enviar pro mapa

        Deveria ser algo como:

        "coordinates":[[
            [-54.50660705566407,-20.3678024183598],
            [-54.190750122070305,-20.730428476781327],
            [-54.259414672851555,-20.29955357220807],
            [-54.50660705566407,-20.3678024183598]]]
        
        Se o dado recebido no cliente - oj.js - ser feito um parser pode funcionar. Ou salvar
        corretamente no servidor.
    */
    
    //----------------------------------------------------------------------

    /* fs.writeFileSync('./public/json/geojson.json', JSON.stringify(geojson), function(err) {
        if (err) throw err;
        console.log('complete');   
    }) */


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

function replacer( key, value ) {

    /* let returned = ( value == value * 1 )
            ? Number(value)
            : value;

    return returned; */
    let returned = null
        if ( value == value * 1 && value != ''){
            returned = Number(value)
        }else returned = value

        return returned
}

async function readJSON(path) {
    let data = await read(path)
    /* console.log('data ', data.features[0].geometry.coordinates)
    console.log('data2 ', data) */
    return data
}

async function read(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {            
            resolve(toParse(data))
        })        
    })  
}

async function toParse (data) {
    return JSON.parse(data, (key, value) => {
              
        let returned = null
        if ( value == value * 1 && value != ''){
            returned = Number(value)
        }else returned = value

        return returned

    })
}

function writeFile (path, json) {    
    let datt = JSON.stringify(json, replacer, 1)
    console.log('data2 ', datt)
    fs.writeFileSync(path, datt)
}


let vect =      [[ -54.492187500000014, 11.523087506868507 ],
                [ -38.671875000000014, -9.795677582829725 ],
                [ -38.671875000000014, 15.623036831528267 ],
                [ -54.492187500000014, 11.523087506868507 ]]