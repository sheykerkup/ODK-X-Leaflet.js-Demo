// Creating map options
let mapOptions = {
    center: [4.04717, 9.75949],
    zoom: 10
}

// Creating a map object
let map = new L.map('map', mapOptions);

// Creating a Layer object
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	useCache: true,
	crossOrigin: true,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Adding layer to the map
map.addLayer(layer);

// Listen to cache hits and misses and spam the console
// The cache hits and misses are only from this layer, not from the WMS layer.
layer.on('tilecachehit',function(ev){
	console.log('Cache hit: ', ev.url);
});
layer.on('tilecachemiss',function(ev){
	console.log('Cache miss: ', ev.url);
});
layer.on('tilecacheerror',function(ev){
	console.log('Cache error: ', ev.tile, ev.error);
});

//add marker
let marker = new L.Marker([4.04717, 9.75949]);
marker.addTo(map)
marker.bindPopup('A sample location.<br> Douala Pk8.')
        .openPopup();

