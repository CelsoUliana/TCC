
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:8099/geoserver/wms',
                params: {'LAYERS': 'teste:brufe250gc_sir', 'TILED': true},
                serverType: 'geoserver',
                //opacity: 0.5,
                //transparent: true,
                // Countries have transparency, so do not fade tiles:
                transition: 0
            })
        })
    ],
    view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4
    })
});