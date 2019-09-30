var map

// errors --> https://openlayers.org/en/latest/doc/errors/

function getContent () {
    $.ajax({
        type: "GET",
        url: 'http://localhost:6001/api/v1/animal',
        success: (content) => {

            content.forEach(item => {
                let li = document.createElement('LI')
                let btn = document.createElement('button')

                btn.setAttribute('onclick', 'loadData(this.value)')
                btn.setAttribute('value', item)
                btn.appendChild(document.createTextNode(item))
                li.appendChild(btn)

                document.querySelector('#map > div.menu > div > ul').appendChild(li)
            })
        }
    })
}

var pointsLayer = new ol.layer.Vector({
    title: 'random points',
    source: new ol.source.Vector({
        url: '/api/v1/area?name=area',
        format: new ol.format.GeoJSON()
    })
})

function removeLayer(name) {
    var layersToRemove = [];
    map.getLayers().forEach(layer => {
        if (layer.get('name') == undefined ) console.log('undefined');
        if (layer.get('name') != undefined && layer.get('name') === name) {
            layersToRemove.push(layer);
        }
    });

    var len = layersToRemove.length;
    for(var i = 0; i < len; i++) {
        map.removeLayer(layersToRemove[i]);
    }
}

function removeFeaturesSource (source) {
    let featuresSource = source.getFeatures();

    featuresSource.forEach(feature => {
        source.removeFeature(feature)
    })
}

var animalSource = new ol.source.Vector({
    format: new ol.format.GeoJSON()
})

function loadData(value) {
    if (value.error) console.log(value.error)
    else{

        removeLayer('movimento')
        var animalSource = new ol.source.Vector({
            url: '/api/v1/animal?name=' + value,
            format: new ol.format.GeoJSON(),
            feature: [new ol.Feature()]
        })
        
        /* Adiciona a fonte de dados que foi pega da API e cria uma layer com ela. */
        var JsonLayer = new ol.layer.Vector({
            source: animalSource,
            //source: geoPointsLayer
        })

        JsonLayer.set('name', 'movimento')

        map.addLayer(JsonLayer) // Adiciona tentativa de exportação
        
        console.log(value)
    }
}

/* let items = document.createElement('LI')
items.setAttribute('href', 'http://localhost:6001/api/v1/area?name=area')
items.appendChild(document.createTextNode('area'))

document.querySelector('#map > div.menu > div > ul').appendChild(items) */

getContent()

/* Adiciona mapa base do OSM */
var baseLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
})

/* Adiciona uma view */
var view = new ol.View({
    //projection: 'EPSG:3857', // projeção padrão
    center: ol.proj.transform([-54.72722222, -20.45], 'EPSG:4326', 'EPSG:3857'),
    //center: ol.proj.fromLonLat([-54.72722222, -20.45], 'EPSG:3857'),  // centro do mapa quando renderiza
    zoom: 14, // nivel de zoom quando renderiza
})

/* Adiciona uma layer de pontos(Vector) alimentada de uma API json*/

/* queria saber como o pointsLayer vinha para cá logo tentei: */
console.log('aqui');
console.log(pointsLayer.getSource().getFeatures().length);

/* BUT, o problema é que ao fazer isto o vetor não foi carregado ainda por ser 
asynchronous logo vi: */ 
pointsLayer.getSource().on('change', function(evt){
    var source = evt.target;
    if (source.getState() === 'ready') {
      let features = source.getFeatures();
      console.log('feat source: ');
      console.log(features)
      
      console.log('coordinates - ', features[0].getGeometry().getCoordinates())
      console.log(features[0].getGeometry().getType())
      
    }
  });

/*var geoPointsLayer = new ol.source.VectorSource({
    features: (new ol.format.GeoJSON()).readFeatures('/api/geojson')
})*/

/* Adiciona uma layer de pontos(Vector) alimentada de uma API geojson*/



/* Inicializa o mapa map */
function init() {
    map = new ol.Map({
        target: 'map',
        //the type of rendered we want to use.
        renderer: 'canvas',
        view: view
    })

    map.addLayer(baseLayer) // Adiciona o mapa base como layer base
    map.addLayer(pointsLayer) // Adiciona os pontos base.
    
}

init() // Chama a inicialização

/* //////////// Adiciona seleção do usuario */

/* Adiciona ol.collection para segurar todas as seleções */
var select = new ol.interaction.Select()
map.addInteraction(select)
var selectedFeatures = select.getFeatures()

/* //////////// Adiciona o desenho */

/* O desenho atual */
var sketch

/* Adiciona a fonte do desenho */
var drawingSource = new ol.source.Vector({
    useSpatialIndex:false
})

/* Adiciona o layer do desenho */
var drawingLayer = new ol.layer.Vector({
    projection: view.getProjection(),
    source: drawingSource
})
map.addLayer(drawingLayer)

var drawingLayer2 = new ol.layer.Vector({
    projection: view.getProjection(),
    source: new ol.source.Vector({
        useSpatialIndex:false
    })
})
map.addLayer(drawingLayer2)


function manter(feat){
    drawingLayer2.getSource().addFeature(feat)
}

/* Declara as interações e listener de forma global para usar eles depois*/

var draw
var modify
var listener

// As interações do desenho
draw = new ol.interaction.Draw({
    projection: view.getProjection(),
    source: drawingSource,
    type: 'Polygon', // Tipo de desenho poligono
    //only draw when Ctrl is pressed.
    //condition : ol.events.condition.platformModifierKeyOnly // Só desenha quando o ctrl estiver pressionado
})
map.addInteraction(draw)

//Funcão para desativar qualquer seletiva e deletar poligonos existente, assim podendo somente um polygono ser desenhado(talvez util para persistir) / 
draw.on('drawstart', (event) => {
	//drawingSource.clear()
	selectedFeatures.clear()
	//select.setActive(false)
	
	sketch = event.feature
	
	listener = sketch.getGeometry().on('change', (event) => {
		selectedFeatures.clear()
		/* var polygon = event.target
		var features = pointsLayer.getSource().getFeatures()

		for (var i = 0 ; i < features.length; i++){
			if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
				selectedFeatures.push(features[i])
			}
		} */
	})
}, this)


/* Reativa a seleção depois de 300ms para evitar clicks seguidos(de acordo com a documentação do OL). */
draw.on('drawend', (event) => {
    sketch = null
   
    /* 
    coisas do Celso
    ----------------------------------------------------------------------------------------------

    sketch = null
    delaySelectActivate()
    selectedFeatures.clear()
    sketch = null
    drawingSource.clear()

    ----------------------------------------------------------------------------------------------

    /* Pra entendimento:
    
    1. "event" é uma variavel que receberá um Feature ol - Tem um Geometry proprio (não sei ainda
        se declarado). Deste modo possui as caracteristicas de um Feature inciso
    2. A idéia é então uma variavel receber este event e add as coord
    3. Para que funcione existe uma ordem de processos de criação de objetos:
        1. new Layer (receber conteudo - como o drawend está no 'drawingLayer' ele já foi criado)
        2. new Source (ver certinho esse 'PEÃO' o que faz, mas é o segundo nivel)
        3. new Feature (guarda type, cor, geometry ..)
        4. new Geometry (Polygon, Point, LineString )
    4. chamar:
        1. var allFeatures = drawingLayer.getSource().getFeatures()
        2. var writer = new ol.format.GeoJSON()
        3. var geoJsonData = writer.writeFeaturesObject(allFeatures)
    
    Deste modo criando com 'new' você preeenche o objeto e allFeatures recebe
    as Features necessárias para criação do JSON 

    Do modo que estava antes era aproveitado de um Outro source :json/geojson.json
    O Feature e Geometry existentes daquele objeto

    Vale ressaltar que 'event' grava todos os dados do click. Logo, lança-se esses 
    dados dentro da Feature do source do Layer de desenho

    */

    /* console.log(event.feature.getGeometry().getCoordinates())
    console.log(event.feature.getGeometry()) */

    /* recebe do evento 'event' os click na tela: não sei o porquê de vir 4 ao inves de 3.
    Temos que investigar isto depois */
    let coordinatesFromMap = event.feature.getGeometry().getCoordinates();

    let coordinatesProjectionMercatorFromMap = new Array();
    
    coordinatesFromMap.forEach(element => {
        
        let coordinatesToParse = new Array();

        element.forEach(elementArrayInternal => {
            coordinatesToParse.push(ol.proj.toLonLat(elementArrayInternal, 'EPSG:3857'))
        });

        coordinatesProjectionMercatorFromMap.push(coordinatesToParse);
    });

    /* ---------------------------------------------------------------------------------------     
                -- TESTING NEW ARRAY ACIMA

    let coordi = [-5596413.4629274625, -1839380.6486544814];
    coordi = ol.proj.toLonLat(coordi, 'EPSG:3857')
    
    console.log('--------------------------------------------------------------->');
    console.log(coordi);
    console.log('--------------------------------------------------------------->');

    console.log('--------------------- bp -------------------');

    console.log(coordinatesProjectionMercatorFromMap);
    console.log('--------------------- bp -------------------');
    */

    var polygon = new ol.geom.Polygon(coordinatesProjectionMercatorFromMap)

    let features = new ol.Feature({
        geometry: polygon
    })

    //draw
    /*problem with projection:
    
    toLonLat        emite da latitude longitude para a nova projection
    fromLonLat      do contrario
    
    projection mais usadas  4326 -> 
                            3857 -> Mercator

                            ol.proj.format('{x}, {y}', n) n -> casas decimais 
                            
                            */

    let featuresSource = drawingSource.getFeatures();

    if (featuresSource.length > 1){
        let lastFeature = featuresSource[featuresSource.length - 1];
        drawingSource.removeFeature(lastFeature);
        manter(lastFeature)
    }
      
    drawingSource.addFeature(features)
    
    //drawingLayer.getSource().addFeature(draw)
/*     
    Desta forma dá para criar tambem 

    let layerToJson = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: polygon
                })
            ]
        })
    })
 */

 //drawingSource === drawingLayer.getSource()

    console.log('feat> ', features);

    var allFeatures = drawingSource.getFeatures()
    
    console.log('al: ', allFeatures);
    // fazer tratamento das coordenadas aqui
    // trat

    var writer = new ol.format.GeoJSON()
    var geoJsonData = writer.writeFeaturesObject(allFeatures)
        
    console.log('----------------------------->> breakpoint');
    console.log(geoJsonData)
    
    sendJSON(geoJsonData)

    /*const data = JSON.stringify({
        todo: Array
    })

    const options = {
        hostname: '/',
        port: 8080,
        path: '/api/generateJson',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.on('error', (error) => {
        console.error(error)
    })
      
    req.write(data)
    req.end()
	*/ // Nao funciona
})

var sendJSON = (dataToStringify) => {

    // console.log(dataToStringify)

    $.ajax({

        type: "POST",
        url: 'http://localhost:6001/api/v1/area',

        data: dataToStringify,

        success: (data2) => {

            /*  caso o outro lado (servidor) receba a mensagem, ele retorna um 'data' faça o 
            que quiser com esse 'data' */

            /* console.log('data2 --> ' + JSON.stringify(data2))
            console.log(data2) */

            console.log('ok')

            //$('p').text(JSON.stringify(data))
        },

        error(XMLHttpRequest, textStatus, errorThrown) {
            //code to handle errors
        }
    });
}


/* Modifica poligonos existentes */

var modify = new ol.interaction.Modify({
    //only allow modification of drawn polygons
    features: drawingSource.getFeaturesCollection()
})
map.addInteraction(modify)

/* Selecione a as bordas do poligono para modifica-los. */
modify.on('modifystart', (event) => {
    sketch = event.features
    select.setActive(false)
    listener = event.features.getArray()[0].getGeometry().on('change', (event) => {
        // clear features so they deselect when polygon moves away
        selectedFeatures.clear()
        var polygon = event.target
        var features = pointsLayer.getSource().getFeatures()

        for (var i = 0; i < features.length; i++) {
            if (polygon.intersectsExtent(features[i].getGeometry().getExtent())) {
                selectedFeatures.push(features[i])
            }
        }
    })

}, this)

/* Termina de modificar a seleção de poligonos existentes. */
modify.on('modifyend', (event) => {
    sketch = null
    delaySelectActivate()
    selectedFeatures.clear()
    var polygon = event.features.getArray()[0].getGeometry()
    var features = pointsLayer.getSource().getFeatures()

    for (var i = 0; i < features.length; i++) {
        if (polygon.intersectsExtent(features[i].getGeometry().getExtent())) {
            selectedFeatures.push(features[i])
        }
    }

}, this)


/* //////////// Funções auxiliares */


/* Delay de 300 ms para seleção de aréa, como consta na documentação do open layers */
function delaySelectActivate() {
    setTimeout(function () {
        select.setActive(true)
    }, 300)
}



