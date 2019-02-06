// Store API query variables
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
var date = "$where=created_date between'2016-01-10T12:00:00' and '2017-01-01T14:00:00'";
var complaint = "&complaint_type=Rodent";
var limit = "&$limit=10000";

// Assemble API query URL
var url = baseURL + date + complaint + limit;

Collapse 

var mymap = L.map('map', {
    center: [37.7749, -122.41914], 
    zoom: 13
});

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.emerald',
    accessToken: API_KEY
}).addTo(mymap);

var link = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=5000";

d3.json(link, function(response){
    
    console.log(response);
    
    for (var i=0; i<response.length; i++) {
        var location = response[i].location;
        
        if (location) {
            L.marker([ location.coordinates[1], location.coordinates[0]  ])
                .addTo(mymap);
        }
    }
    
    var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location = response[i].location;

    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
    
    var heat = L.heatLayer(heatArray, {
        radius: 20,
        blur: 35
    }).addTo(mymap);
});
