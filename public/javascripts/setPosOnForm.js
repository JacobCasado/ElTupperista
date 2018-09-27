const setPosOnForm = (latlng) => {
	document.getElementById('lat-pos').value = latlng.lat;
	document.getElementById('lng-pos').value = latlng.lng;
}