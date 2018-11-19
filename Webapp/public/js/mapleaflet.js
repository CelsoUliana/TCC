
$('#map-run').ready(() => {

    /* [[ lat, lng ], [ lat, lng] ...] time é suposto ser com intervalo já trazido bd/file/parser */
    let moveAtTime = [ 
    [ -20.495205240760757,  -54.615054130554206 ],
    [ -20.49524543962251,   -54.61389541625977  ],
    [ -20.495727825141106,  -54.61329460144044  ],
    [ -20.49705437748945,   -54.612607955932624 ],
    [ -20.49705437748945,   -54.61153507232666  ],
    [ -20.49705437748945,   -54.610118865966804 ],
    [ -20.49813972996192,   -54.61080551147462  ],
    [ -20.498059333746067,  -54.61247920989991  ],
    [ -20.497456360782838,  -54.61277961730958  ],
    [ -20.497536757314993,  -54.61299419403077  ],
    [ -20.497737748460892,  -54.613122940063484 ],
    [ -20.497898541187823,  -54.613122940063484 ],
    [ -20.498300522267122,  -54.61299419403077  ],
    [ -20.50091337358198,   -54.611191749572754 ],
    [ -20.50280263831797,   -54.60724353790284  ],
    [ -20.50308401617923,   -54.60702896118165  ],
    [ -20.503365393523755,  -54.6072006225586   ],
    [ -20.503285000049473,  -54.60745811462403  ],
    [ -20.503847753483587,  -54.60754394531251  ],
    [ -20.504008539799393,  -54.607586860656745 ],
    [ -20.504008539799393,  -54.60801601409913  ],
    [ -20.504008539799393,  -54.60853099822999  ],
    [ -20.503686966999044,  -54.61020469665528  ],
    [ -20.50091337358198,   -54.61496829986573  ],
    [ -20.50095357094656,   -54.61844444274903  ],
    [ -20.496491599107486,  -54.6202039718628   ],
    [ -20.50023001677089,   -54.62316513061524  ],
    [ -20.50215948698049,   -54.619903564453125 ],
    [ -20.503928146662584,  -54.61621284484864  ],
    [ -20.503405590245073,  -54.61368083953858  ],
    [ -20.50095357094656,   -54.61316585540772  ],
    [ -20.499747645422445,  -54.61368083953858  ],
    [ -20.498340720317074,  -54.615054130554206 ],
    [ -20.49757695556527,   -54.615054130554206 ]]

    let escobar_ = [[-20.497434, -54.608478], [-20.495084644112268, -54.61320877075196]]
   
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
        center:             escobar,
        zoom:               zoomControl,
        layers:             [maptileLayer],
        doubleClickZoom:    false
    });

    /* Classe de polyline que pode ser instanciada - Polyline's class that could be instanced */
    let Polylines = () => {
        
        let id
        let points = []

        return {
            add: (array) => {
                
                points.push(array)
                
                id = L.polyline(array, {
                    color: 'red',      
                }).addTo(map)
            },
            remove: () => { map.removeLayer(id) },
            get: () => { return id },
            points: () => { return points }, 
            reset: () => { points = null }
        }
    }

    /* instances */
    let polylineMove = Polylines()
    let polylineDraw = Polylines()
    let polylineMarker = Polylines()

    /* menu-opt */
    let opt = { 
        DRAW:      { desc: 'desenhar area',     elements: {polyline: polylineDraw} }, 
        MOVE:      { desc: 'movimentação',      elements: {polyline: polylineMove} }, 
        MARKER:    { desc: 'marcador',          elements: {polyline: polylineMarker} }
    }

    /* set draw as default */
    let selectedOpt = opt.DRAW

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

    /* get the key obj by indice */
    function getKeyObj(obj, indice){        
        return (Object.entries(obj)[indice][0])        
    }

    /* create the control */
    var menuOpt = L.control({ position: 'topright' });

    /* add container to menu */
    menuOpt.onAdd = () => {

        let div = L.DomUtil.create('div', 'menuOpt')
        div.innerHTML = '<form>' +
            '<div id="menuOpt">'

        for (i in opt)            
            div.innerHTML += '<input id="menuOpt-' + i + '" type="checkbox"/>' + opt[i].desc + '<br>'

        div.innerHTML += '</div>' +
            '</form>'
        
        return div
    }
    
    /* add menu to map */
    menuOpt.addTo(map)

    /*      --      other way to do     --  */
    /* doc leaflet example */
    var baseMaps = {
        "Streets": maptileLayer,
        'grayscale': maptileLayer
    };

    var overlayMaps = {
        "Cities": maptileLayer        
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);
     /*     --     end - other way to do    --  */

    /* jquery -> tentar jogar no css depois */
    $('.menuOpt').css({

        'background-color': '#fff',
        'border-width':     '1px',
        'border-style':     'solid',
        'padding':          '10px'

    })

    /* set default selection menuOpt */
    $('#' + 'menuOpt-' + getKeyObj(opt, 0)).prop("checked", true)    

    /* there was need to put 'function (event)'. arrow function don't work 
        this function ensures that only one selector is selected */
    $('.menuOpt input').on('click', function (event) {

        event.stopPropagation();

        let checkBoxe = this.getAttribute('id')
        
        if ($('#' + checkBoxe + ':checked').val()){

            let check = getOptJQuery(checkBoxe)
            
            configOpt(check)            

        }
        $('.menuOpt').find('input').each(function () {
            let setOpt = []

            if (checkBoxe != this.getAttribute('id')){

                $('#' + this.getAttribute('id')).prop("checked", false)

                setOpt.push(getOptJQuery(this.getAttribute('id')))   
                console.log(this.getAttribute('id'))
            }

            clearMap(setOpt)
        })
    })

    /* set opt by selection JQuery code insert */
    function getOptJQuery(element) {
        return element.replace('menuOpt-', '')
    }

    /* set map as opt selected */
    function configOpt(check){
        console.log(check)

        for(find in opt)

            if (check == find)
                selectedOpt = opt[find]

        if (selectedOpt == opt.DRAW)
            setPointsMap()

        /* if (selectedOpt == opt.MOVE)
            getMove() */
        
        if (selectedOpt == opt.MARKER)
            getMarkers()
    }

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

    /* event when mouse clicked map ( on drawing...) */
    map.on('click', (event) => {

        if (selectedOpt == opt.DRAW){

            if (points < 2)
                points.pop

            useLatLng(event.latlng.lat, event.latlng.lng, (lat, lng) => {
    
                let coord = Pointer()
    
                coord.setLatitude(lat)
                coord.setLongitude(lng)
    
                points.push([coord.getLatitude(), coord.getLongitude()])

            })
    
            console.log('clicked')
            printLast()
        }
    })

    /* click second button mouse -> popup if wish auto-complete drawwning area */



    /* interpolando clicks no map - interpolating clicks on map */
    let setPointsMap = () => {
        
        if (points.length > 1)
            
            polylineDraw.add(points)

        return polylineDraw.get
    }

    /* show points drawn in screen */
    $('#map-run').on('click', function() {
        
        if (setPointsMap())
            setPointsMap()            
    })

    /* events on move -> show the movement of "boi" */
    let getMove = (points) => {
        polylineMove.add(points)
        console.log('selecionou move.. ')  
    }

    /* show markers on map */
    let getMarkers = () => {
        polylineMarker.add(escobar_)
        console.log('selecionou markers.. ')        
    }

    /* by ids of optSetClear remove views on map */
    function clearMap(optSetClear) {

        if (!opt)
            return 
        
        for (find in optSetClear){
            for (el in opt){
                if (optSetClear[find] == el){
                    if (opt[el].elements && opt[el].elements.polyline && opt[el].elements.polyline.get() != null)  {  
                        opt[el].elements.polyline.remove() 
                        console.log('clear .. ')
                    }                     
                }
            }
        }
    }

    $('#one-point-add').on('click', function () {
        
        if (selectedOpt == opt.MOVE){
            let value = $('.btn-add-el .value').text()
            $('.btn-add-el .value').text(++value)            
        }
    })

    $('#one-point-sub').on('click', function () {
        
        if (selectedOpt == opt.MOVE){
            let value = $('.btn-add-el .value').text()
            $('.btn-add-el .value').text(--value)            
        }
    })

    let coordShow = []

    $('#add').on('click', function () {

        if (selectedOpt == opt.MOVE){        
            let value = Number($('.btn-add-el .value').text())
            
            let tam = coordShow.length

            if ((tam + value) <= moveAtTime.length)
            for (i = tam; i < tam + value; i ++){
               
                coordShow.push(moveAtTime[i])
            }

            /* falta arrumar quando esta alto valor (ex. 4) e restam 2 elementos 
            estes não carregam */
            
            getMove(coordShow)
        }
    })

/*        ---  ||      testes      ||   ---     */

    $('.teste').on('click', function () {
        console.log('teste ..')
        cl()
    })


    function cl () {
        if (polylineMove.get())
            polylineMove.remove() 
        
        /* não está removendo DRAW - insn't removing DRAW */
        if (polylineDraw.get())
            polylineDraw.remove()
    }

/*        ---  ||      fim testes       ||  ---     */

    /* events on click of keyboards */

    /* key esc abre janela se deseja completar */ 

    /* ctl-z and ctl-y --> salvar pilha */
    



    /* print all coordinates */
    function print() {

        console.log('print')

        for (i in points) 
            console.log(points[i])        
    }

    /* print the last coordinate */
    function printLast() {

        if (points.length > 0) 
            console.log(points[points.length - 1])

    }
})



