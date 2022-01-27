 let useNonImageMarker = (mapCenter) => {
    console.log(mapCenter);
    let myIcon = new  L.divIcon({
         className: 'custom-icon',
         html: '<i class="fas fa-map-marker-alt"></i>'
      }); 
    return new L.marker(mapCenter, {icon: myIcon});
 }


 //changes the color of an marker icon which created
 //using L.divIcon
 let changeNonImageMarkerColor = (color) => {
   let markerDivElement = document.querySelector(".custom-icon");
   markerDivElement.setAttribute("style", `color:${color}`);
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

  document.querySelector('#marker-color').addEventListener('change', e => {
      const color = e.target.value;
      console.log(color);

      changeNonImageMarkerColor(color);
  });

  }