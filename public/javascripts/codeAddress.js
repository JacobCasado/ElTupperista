const codeAddress = (latlng, lat, lng) => {
	let geocoder = new google.maps.Geocoder();
	latlng = new google.maps.LatLng(lat, lng);
	let mapOptions = { zoom: 10, center: latlng }
	let address = document.getElementById('autocomplete').value;
	let map = new google.maps.Map(document.getElementById('profileMap'), mapOptions);

	geocoder.geocode( { 'address': address}, function(results, status) {

		if (status == 'OK') {
	
		map.setCenter(results[0].geometry.location);
		let marker = new google.maps.Marker({
			position: results[0].geometry.location,
			map: map
		});

	} else {
		alert('Geocode was not successful for the following reason: ' + status);
	}
	});
}
