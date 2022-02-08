const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const  wmtsUrlTemplate =
  'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=EPSG:3857&layer={layer}&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng';

const defautZoomLevel = 12;
const mapAttributionOSM = 'Map data {attribution.OpenStreetMap}';
const defaultSaveZoomLevels = [10, 13];
const prefetchZoomLevels = [9, 11];
const mapboxToken = "YOUR-MAPBOX-API-TOKEN-HERE";
let defaultTileLayer = "osm";

const mapBoxMapUrlAndOptions = {
    url: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`,
    options: {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken
      }
};

const osmMapUrlAndOptions = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  options: {
      attribution: mapAttributionOSM,
      subdomains: 'abc',
      minZoom: defautZoomLevel,
    }
};

const googleMapsUrlAndOptions = {
  url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
  options: {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }


} ;

const customMapsUrlAndOptions = {
  url: '/assets/images/custom/OSMPublicTransport/{z}/{x}/{y}.png',
  options: {
    maxZoom: 12
  }
}

const mapProviders = {
  osm: osmMapUrlAndOptions,
  google: googleMapsUrlAndOptions,
  mapbox: mapBoxMapUrlAndOptions,
  custom: customMapsUrlAndOptions
}