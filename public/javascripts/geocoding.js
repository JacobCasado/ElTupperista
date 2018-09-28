document.addEventListener('DOMContentLoaded', () => {

	//var geocoder;
	let profileMapTag = document.getElementById('profileMap');
	//let autocomplete = $('#autocomplete');

	initialize();
	autocompleteInput();

	function initialize() {
		//Ironhack Location
		let lat = 40.3932613;
		let lng = -3.6991178;
		
		let latlng = { lat: lat, lng: lng }
		let mapOptions = { zoom: 10, center: latlng }
		
		let profileMap = new google.maps.Map(profileMapTag, mapOptions);

		geolocalize()
			.then( position => {
				lat = Number(position.lat);
				lng = Number(position.lng);
				latlng = { lat: lat, lng: lng }
				
				setPosOnForm(latlng);
				drawMarkerAndCenter(profileMap, latlng);
			})
			.catch( err => {
				latlng = { lat: lat, lng: lng };

				setPosOnForm(latlng);
				drawMarkerAndCenter(profileMap, latlng);
			});
	}

}, false);

