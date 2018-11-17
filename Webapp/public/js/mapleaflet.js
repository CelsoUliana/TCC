$('#map-run').ready(() => {
    
    let escobar = [-20.497434, -54.608478]
    let embrapa = [-20.444646, -54.723093]

    let points = []

    let zoomControl = 15

    /* set tiles  */
    let maptileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoid2VzbGV5Y2FtcCIsImEiOiJjam1lY3hmejkwbTgwNDFxdnpzNW4ycWI5In0.StuV1vx69hyQoJkSxQnhaQ'
    })

    /* rum map */
    let map = L.map('map-run', {
        center: escobar,
        zoom: zoomControl,
        layers: [maptileLayer]
    });

    /* other way
    let map = L.map('map-run')
    map.setView(embrapa, 15)
     */

    /* tile.addTo() define who will print tile */
    maptileLayer.addTo(map)

    /* create a menu for options */
    var menuOpt = L.control({
        position: 'bottompright'
    })

    let labels = {
        'des-area': 'desenhar area',
        'move': 'movimentação',
        'marker': 'marker'
    }

    /* create the control */
    var menuOpt = L.control({ position: 'topright' });

    /* add container to menu */
    menuOpt.onAdd = () => {

        let div = L.DomUtil.create('div', 'menuOpt')
        div.innerHTML = '<form>' +
            '<div id="menuOpt">'

        for (let i in labels)
            div.innerHTML += '<input id="menuOpt-' + i + '" type="checkbox"/>' + labels[i] + '<br>'

        div.innerHTML += '</div>' +
            '</form>'

        return div
    }
    
    menuOpt.addTo(map)

    /* other way to do */
    var baseMaps = {
        "Streets": maptileLayer,
        'grayscale': maptileLayer
    };

    var overlayMaps = {
        "Cities": maptileLayer        
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    /* jquery -> tentar jogar no css depois */
    $('.menuOpt').css({

        'background-color': '#fff',
        'border-width': '1px',
        'border-style': 'solid',
        'padding': '10px'

    })

    /* there was need to put 'function (event)'. arrow function don't work 
        this function ensures that only one selector is selected */
    $('.menuOpt input').on('click', function (event) {

        event.stopPropagation();

        let checkBoxe = this.getAttribute('id')

        $('.menuOpt').find('input').each(function () {

            if (checkBoxe != this.getAttribute('id'))

                $('#' + this.getAttribute('id')).prop("checked", false)

        })

    }).on('click', function (event) {
       /* 
       problema com a propagação do click - ex. two followed clicks
       event.stopPropagation()
        stop(event)
        event.stopImmediatePropagation() */
    })


    /* create a fabric function of coordinates */
    let Pointer = () => {

        let latitude = 0
        let longitude = 0

        return {

            setLatitude: (lat) => { latitude = lat },
            setLongitude: (lng) => { longitude = lng },
            getLatitude: () => { return latitude },
            getLongitude: () => { return longitude }
        }
    }

    /* callback */
    let useLatLng = (lat, lng, method) => {
        return method(lat, lng)
    }

    /* event when mouse clicked */
    map.on('mousedown', (event) => {

        useLatLng(event.latlng.lat, event.latlng.lng, (lat, lng) => {

            let coord = Pointer()

            coord.setLatitude(lat)
            coord.setLongitude(lng)

            points.push([coord.getLatitude(), coord.getLongitude()])
        })

        console.log('clicked')
        printLast()
    })

    /* lines */
    /* exemplo leaflet */
   /*  let latlngs = [
        [-20.495526831359516, -54.613337516784675],
        [-20.496451400572564, -54.612822532653816],
        [-20.50043100438461, -54.607329368591316]
    ];

    let polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    // zoom the map to the polyline
 */

    /* interpolando click no map */
    let polyline = null

    let setPointsMap = () => {
        
        if (points.length > 1)
            
            polyline = L.polyline(points, {
                color: 'red',      
            }).addTo(map);

        return polyline
    }

    $('#map-run').on('click', function() {
        
        if (setPointsMap())
           setPointsMap()            
    })
        










    /* print all coordinates */
    function print() {

        console.log('print')

        for (let i in points) 
            console.log(points[i])
        
    }

    /* print the last coordinate */
    function printLast() {

        if (points.length > 0) 
            console.log(points[points.length - 1])

    }
})



