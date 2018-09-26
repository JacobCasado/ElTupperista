document.addEventListener('DOMContentLoaded', () => {

	var geocoder;
	var profileMap;

	initialize();
	
	$('#updateProfile').on('click', codeAddress);

	function initialize() {
		//Ironhack Coordenates
		let defaultLat = 40.3932613;
		let defaultLng = -3.6991178;

		geolocalize()
			.then(position => {
				defaultLat = position.lat;
				defaultLng = position.lng;
			})
			.catch(err => console.log(err));

		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(defaultLat, defaultLng);
		var mapOptions = {
		zoom: 10,
		center: latlng
		}
		profileMap = new google.maps.Map(document.getElementById('profileMap'), mapOptions);
	}

	function codeAddress() {
		var address = document.getElementById('autocomplete').value;
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
			profileMap.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: profileMap,
				position: results[0].geometry.location
			});
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
		});
	}
}, false);