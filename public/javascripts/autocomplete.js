const autocompleteInput = () => {
	var input = document.getElementById('autocomplete');
	var autocomplete = new google.maps.places.Autocomplete(input,{types: ['geocode']});
	
	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		var place = autocomplete.getPlace();
		var lng = place.geometry.viewport.j.j;
		var lat = place.geometry.viewport.l.l;
		let latlng = { lat: lat, lng: lng };

		setPosOnForm(latlng);
		codeAddress(latlng, lat, lng);
	})
}


