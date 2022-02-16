let useNonImageMarker = (mapCenter) => {
  console.log(mapCenter);
  let myIcon = new L.divIcon({
    className: 'custom-icon',
    html: '<i class="fas fa-map-marker-alt"></i>'
  });
  return new L.marker(mapCenter, { icon: myIcon });
}


//changes the color of an marker icon which created
//using L.divIcon
let changeNonImageMarkerColor = (color) => {
  let markerDivElement = document.querySelector(".custom-icon");
  markerDivElement.setAttribute("style", `color:${color}`);
}

//load tileLayer
let loadTileLayer = (tileProvider) => {
  baseLayer = L.tileLayer(mapProviders[tileProvider].url, mapProviders[tileProvider].options)
    .addTo(map);
}

let reloadMap = () => {
  map.remove();
  initMap();
}


let addListeners = () => {

  //open preference menu when menu icon is clicked
  document.getElementById('menu-icon').addEventListener('click', () => {
    document.getElementById('menu').classList.remove('hide');
    document.getElementById('menu').classList.add('show');
    document.getElementById('close').classList.add('show');
  });

  //close preference menu when close icon is clicked
  document.getElementById('close').addEventListener('click', () => {
    document.getElementById('menu').classList.remove('show');
    document.getElementById('menu').classList.add('hide');
    document.getElementById('close').classList.add('hide');
    document.getElementById('close').classList.remove('show');

  });

  //detect change in marker color
  document.querySelector('#marker-color').addEventListener('change', e => {
    const color = e.target.value;
    console.log(color);

    changeNonImageMarkerColor(color);
  });

  //detect change in marker color
  document.querySelector('#show-marker').addEventListener('change', e => {
    const showMarker = e.target.checked;
    console.log(showMarker);

    if (!showMarker) {
      map.removeLayer(marker);
      return;
    }

    marker = useNonImageMarker(loc);
    marker.addTo(map)

  });

  //detect change in maps provider
  document.querySelector('#providers').addEventListener('change', e => {
    const provider = e.target.value;

    console.log(provider);
    defaultTileLayer = provider;
    reloadMap();
    // loadTileLayer(provider);
  });
}
