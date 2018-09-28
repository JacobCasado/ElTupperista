const drawMarkerAndCenter = (map, coords) => {
	const myMarker = new google.maps.Marker({
		position: coords,
		map
	});
	map.setCenter(coords);
};