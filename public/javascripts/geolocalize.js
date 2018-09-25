const geolocalize = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject("No geolocation available");
    navigator.geolocation.getCurrentPosition(pos => {
      const center = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      resolve(center);
    }, reject);
  });
};

geolocalize().then(coords => {
  drawMarkerAndCenter(map, coords);
  const directionsService = new google.maps.DirectionsService();
  const directionsDisplay = new google.maps.DirectionsRenderer();
  const directionRequest = {
    origin: ironhackMAD,
    destination: coords,
    travelMode: "WALKING"
  };

  directionsService.route(directionRequest, function(response, status) {
    if (status === "OK") {
      // everything is ok
      directionsDisplay.setDirections(response);
    } else {
      // something went wrong
      window.alert("Directions request failed due to " + status);
    }
  });

  directionsDisplay.setMap(map);
});
