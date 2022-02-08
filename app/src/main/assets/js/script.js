let baseLayer;
let map;
let loc;

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
  let marker = useNonImageMarker(loc);
  marker.addTo(map)

  // offline baselayer, will use offline source if available
  loadTileLayer(defaultTileLayer);

  // add buttons to save tiles in area viewed
  const control = L.control.savetiles(baseLayer, {
    zoomlevels: defaultSaveZoomLevels, 
    confirm(layer, successCallback) {
      // eslint-disable-next-line no-alert
      if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
        successCallback();
      }
    },
    confirmRemoval(layer, successCallback) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Remove all the tiles?')) {
        successCallback();
      }
    },
    saveText:
      '<i class="fa fa-download" aria-hidden="true" title="Save tiles"></i>',
    rmText: '<i class="fa fa-trash" aria-hidden="true"  title="Remove tiles"></i>',
  });
  control.addTo(map);

  // layer switcher control
  const layerswitcher = L.control
    .layers({
      'osm (offline)': baseLayer,
    }, null, { collapsed: false })
    .addTo(map);
  // add storage overlay
  storageLayer(baseLayer, layerswitcher);

  // events while saving a tile layer
  let progress, total;
  const showProgress = debounce(() => {
    document.getElementById('progressbar').style.width = `${(progress/total) * 100}%`;
    document.getElementById('progressbar').innerHTML = progress;  
    if(progress === total) {
      setTimeout(() => document.getElementById('progress-wrapper').classList.remove('show'), 1000);    
    }
  }, 10);

  baseLayer.on('savestart', (e) => {
    debugger;
    progress = 0;
    total = e._tilesforSave.length;
    document.getElementById('progress-wrapper').classList.add('show');  
    document.getElementById('progressbar').style.width = '0%';
  });
  baseLayer.on('savetileend', () => {
    progress += 1;     
    showProgress();
  });

}

let loadCurrentPosition = () => {
  window.navigator.geolocation.getCurrentPosition( position => {
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

