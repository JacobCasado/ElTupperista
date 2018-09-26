document.addEventListener('DOMContentLoaded', () => {

	var input = document.getElementById('autocomplete');
	var autocomplete = new google.maps.places.Autocomplete(input,{types: ['geocode']});
	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		var place = autocomplete.getPlace();
		var lng = place.geometry.viewport.b.b;
		var lat = place.geometry.viewport.f.f;
		fillInputPosition(lat, lng);
	})

}, false);

