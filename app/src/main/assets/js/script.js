// Creating map options
let mapOptions = {
    center: [4.04717, 9.75949],
    zoom: 10
}

// Creating a map object
let map = new L.map('map', mapOptions);

// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

// Adding layer to the map
map.addLayer(layer);

//add marker
let marker = new L.Marker([4.04717, 9.75949]);
marker.addTo(map)