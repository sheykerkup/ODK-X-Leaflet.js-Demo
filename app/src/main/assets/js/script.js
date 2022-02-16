let baseLayer;
let map;
let loc;
let marker;

window.addEventListener("DOMContentLoaded", e => {
	loc = [4.041501, 9.749851];
	addListeners();
	loadCurrentPosition();
});

let initMap = () => {

	// Creating map options
	let mapOptions = {
		center: loc,
		zoom: defautZoomLevel
	}

	// Creating a map object
	map = new L.map('map', mapOptions);

	//add marker
	marker = useNonImageMarker(loc);
	marker.addTo(map)

	// offline baselayer, will use offline source if available
	loadTileLayer(defaultTileLayer);

}

let loadCurrentPosition = () => {
	window.navigator.geolocation.getCurrentPosition(position => {
		console.log(position);

		loc[0] = position.coords.latitude;
		loc[1] = position.coords.longitude;
		initMap();
		//pre-fetch tiles at z
		// LeafletOffline.downloadTile(tileInfo.url).then(blob => LeafletOffline.saveTile(tileInfo, blob))
	},
		error => {
			console.log(error);
			alert("Maps will display a custom location since locations data could not be accessed");
			initMap();
		});
}

