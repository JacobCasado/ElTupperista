document.addEventListener('DOMContentLoaded', () => {

  /* const drawMarkerAndCenter = (map, coords) => {
    const myMarker = new google.maps.Marker({
      position: coords,
      map,
    });
    map.setCenter(coords)
}

let ironhackMAD= { lat: 40.3925321, lng: -3.7004556 };
const map = new google.maps.Map(
  document.getElementById('map'),
  {
    zoom: 10,
    center: ironhackMAD
  }
);

drawMarkerAndCenter(map, ironhackMAD);
  geolocalize().then(center => {
    map.setCenter(center);

    User.forEach(rest => {
      new google.maps.Marker({
        position: {
          lat:rest.location.coordinates[0],
          lng:rest.location.coordinates[1]
        },
        map: map,
        title: rest.name
      });
    })

  }); */

  const drawMarkerAndCenter = (map, coords) => {
    const myMarker = new google.maps.Marker({
      position: coords,
      map,
    });
    map.setCenter(coords)
}

let ironhackMAD= { lat: 40.3925321, lng: -3.7004556 };
const map = new google.maps.Map(
  document.getElementById('map'),
  {
    zoom: 14,
    center: ironhackMAD
  }
);

drawMarkerAndCenter(map, ironhackMAD);

}, false);
