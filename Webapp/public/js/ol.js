var map


/* Adiciona mapa base do OSM */
var baseLayer = new ol.layer.Tile({
    source: new ol.source.OSM()
})

/* Adiciona uma view */
var view = new ol.View({
    //projection: 'EPSG:3857', // projeção padrão
    center: ol.proj.fromLonLat([-54.718803, -20.447947], 'EPSG:3857'),  // centro do mapa quando renderiza
    zoom: 2, // nivel de zoom quando renderiza
})


/* Adiciona uma layer de pontos(Vector) alimentada de uma API json*/
var pointsLayer = new ol.layer.Vector({
    title: 'random points',
    source: new ol.source.Vector({
        url: '/api/geojson',
        format: new ol.format.GeoJSON()
    })
})

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
      
      console.log(features[0].getGeometry().getCoordinates())
      console.log(features[0].getGeometry().getType())
      
    }
  });

/*var geoPointsLayer = new ol.source.VectorSource({
    features: (new ol.format.GeoJSON()).readFeatures('/api/geojson')
})*/

/* Adiciona uma layer de pontos(Vector) alimentada de uma API geojson*/
var JsonSource = new ol.source.Vector({
    url: '/api/json',
    format: new ol.format.GeoJSON(),
    feature: [new ol.Feature()]
})

/* Adiciona a fonte de dados que foi pega da API e cria uma layer com ela. */
var JsonLayer = new ol.layer.Vector({
    source: JsonSource,
    //source: geoPointsLayer
})

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
    map.addLayer(JsonLayer) // Adiciona tentativa de exportação
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
    useSpatialIndex: false
})

/* Adiciona o layer do desenho */
var drawingLayer = new ol.layer.Vector({
    projection: view.getProjection(),
    source: drawingSource
})
map.addLayer(drawingLayer)

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

/* Funcão para desativar qualquer seletiva e deletar poligonos existente, assim podendo somente um polygono ser desenhado(talvez util para persistir) / 
draw.on('drawstart', (event) => {
	drawingSource.clear()
	//selectedFeatures.clear()
	select.setActive(false)
	
	sketch = event.feature
	
	listener = sketch.getGeometry().on('change', (event) => {
		selectedFeatures.clear()
		var polygon = event.target
		var features = pointsLayer.getSource().getFeatures()

		for (var i = 0 ; i < features.length; i++){
			if(polygon.intersectsExtent(features[i].getGeometry().getExtent())){
				selectedFeatures.push(features[i])
			}
		}
	})
}, this)
*/

/* Reativa a seleção depois de 300ms para evitar clicks seguidos(de acordo com a documentação do OL). */
draw.on('drawend', (event) => {

    /* 
    coisas do Celso
    ----------------------------------------------------------------------------------------------

    sketch = null
    delaySelectActivate()
    selectedFeatures.clear()

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
     --------------------------------------------------------------------------------------------
    */

    var polygon = new ol.geom.Polygon(coordinatesProjectionMercatorFromMap)

    let features = new ol.Feature({
        geometry: polygon
    })

    
    /*problem with projection:
    
    toLonLat        emite da latitude longitude para a nova projection
    fromLonLat      do contrario
    
    projection mais usadas  4326 -> 
                            3857 -> Mercator

                            ol.proj.format('{x}, {y}', n) n -> casas decimais 
                            
                            */

    
    drawingLayer.getSource().addFeature(features)
   
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


    var allFeatures = drawingLayer.getSource().getFeatures()
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

    console.log(dataToStringify)

    $.ajax({

        type: "POST",
        url: 'http://localhost:8080/api/appendJson',

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



