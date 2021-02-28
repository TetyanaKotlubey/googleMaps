'use strict';
let geocoder= null, map = null, marker = null, infowindow = null;
const CITY = document.getElementById('city');
const OPTIONS = document.querySelectorAll('option')
function initMap()
{
    console.log('Hello World');

    geocoder = new google.maps.Geocoder();

    CITY.addEventListener('change', function(e) {
      let selectedItem = document.querySelector('option[selected]');
      if (selectedItem)
      {
        selectedItem.removeAttribute('selected');
      }
      
    document.querySelector(`option[value = "${CITY.value}"]`).setAttribute('selected', 'selected');
      makeGeocode(CITY.value);
    console.log(CITY.value); 
    });
    makeGeocode(CITY.value);

}
function createMap(latLng)
{
  map = new google.maps.Map(document.getElementById("map"), {
  zoom: 16,
  center: latLng,
  styles: mapStyles
  });
}
function createMarker(latLng, title)
{
  marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: 'beetroot.png',
    title: title
  });
}
function createWindow(content)
{
  infowindow = new google.maps.InfoWindow({
    content: `<b>${content}</b>`,
  });
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
}
function makeGeocode (address)
{
  
  geocoder.geocode( { 'address': address}, function(results, status)
  {
    if (status == 'OK') 
    {
      const PSTU = { lat: results[0].geometry.location.lat(), 
                    lng: results[0].geometry.location.lng() 
                  };
      if (map)
      {
        map.setCenter(PSTU);
      }
      else
      {
        createMap(PSTU); 
      } 
      if(marker)
      {
        marker.setPosition(PSTU);
        infowindow.close();
        infowindow.setContent(results[0].formatted_address);
      }
      else
      {
        createMarker(PSTU, results[0].formatted_address);
        createWindow(results[0].formatted_address);  
      } 
    } 
    else 
    {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}