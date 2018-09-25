document.addEventListener(
  "DOMContentLoaded",
  () => {
   
    const drawMarkerAndCenter = (map, coords) => {
      const myMarker = new google.maps.Marker({
        position: coords,
        map
      });
      map.setCenter(coords);
    };

    let ironhackMAD = { lat: 40.3925321, lng: -3.7004556 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: ironhackMAD
    });

    geolocalize().then(center => {
      map.setCenter(center);
      
      users.forEach(user => {
        new google.maps.Marker({
          position: {
            lat: user.location.coordinates[0],
            lng: user.location.coordinates[1]
          },
          map: map,
          title: user.username
        });
      });
    });
  },
  false
);
