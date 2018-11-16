/* 
-20.497434, -54.608478 - ESCOBAR
-20.444646, -54.723093 - Embrapa Gado de Corte 
*/

var map = L.map('map-run').setView([-20.497434, -54.608478], 13)

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoid2VzbGV5Y2FtcCIsImEiOiJjam1lY3hmejkwbTgwNDFxdnpzNW4ycWI5In0.StuV1vx69hyQoJkSxQnhaQ'
}).addTo(map);