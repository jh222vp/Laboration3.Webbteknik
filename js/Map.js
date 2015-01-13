/**
 * Created by Jonas on 2014-12-11.
 */
//Global variabel map för att vi ska komma åt den från trafik.
var Map = {
map:undefined,

init:function()
{
    Map.getMap();
},

    getMap:function()
{
    var mapOptions =
    {
        zoom: 4,
        center: new google.maps.LatLng(62, 15)
    };

    this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

}
window.addEventListener("load", Map.init);
