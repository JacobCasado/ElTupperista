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

    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    var onChangeHandler = function() {
      calculateAndDisplayRoute(directionsService, directionsDisplay);
    };

    document
      .getElementById("start")
      .addEventListener("change", () => onChangeHandler());
    document
      .getElementById("end")
      .addEventListener("change", () => onChangeHandler());

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {

      directionsService.route(
        {
          origin: { lat: Number(document.getElementById("start").value.split(",")[0]), lng: Number(document.getElementById("start").value.split(",")[1])},
          destination: { lat: Number(document
            .getElementById("end").value.split(",")[0]), lng: Number(document
            .getElementById("end").value.split(",")[1] )},
          travelMode: "WALKING"
        },
        function(response, status) {
          if (status === "OK") {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }

	directionsDisplay.setMap(map);
	
	geolocalize()
		.then(center => {
			map.setCenter(center);
		

			tuppers.forEach(tupper => {

				new google.maps.Marker({
				position: {
					lat: Number(tupper.user.location.coordinates[0]),
					lng: Number(tupper.user.location.coordinates[1])
				},
				map: map,
				title: tupper.user.username
				});
			});
		})
		.catch(err => 
			console.log(err));
  },
  false
);
