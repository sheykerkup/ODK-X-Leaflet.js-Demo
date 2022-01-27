const urlTemplate = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const  wmtsUrlTemplate =
  'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=EPSG:3857&layer={layer}&tilematrix={z}&tilerow={y}&tilecol={x}&format=image%2Fpng';

const defautZoomLevel = 10;
const mapAttributionOSM = 'Map data {attribution.OpenStreetMap}';
const defaultSaveZoomLevels = [10, 13];