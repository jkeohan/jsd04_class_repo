$(document).ready(function() {

	// store myMap at the global level so buildBikeMarkers can access its value
	var myMap;

	// Builds the map
	function initMap() {
		myMap = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 40.7127, lng: -74.0059},
			zoom: 14
		});
	}

	initMap()

	// Use the Citibike live-data feed to render citi bike stations across NYC
	$.ajax({
		url: 'http://api.citybik.es/citi-bike-nyc.json',
		type: 'GET',
		success: function (data) {
			buildBikeMarkers(data)
		},
		error: function (xhr) {
			console.log(xhr)
		}
	})

	// Build bike markers from the CitiBike data
	function buildBikeMarkers (stations) {
		// loop overs stations array and use coordinates to append each station to myMap
		stations.forEach(function (station) {
			// we have to divide each value by 1000000 due to the data format
			var lat = station.lat / 1000000
			var lng = station.lng / 1000000

		    var marker = new google.maps.Marker({
		        position: {lat: lat, lng: lng},
		        map: myMap,
	            title: station.name,
		    });

			// create InfoWindow HTML
            var content = '<div>' + station.name + '<br>' + station.bikes +' bikes, ' + station.free + ' racks free.</div>'

        	var infowindow = new google.maps.InfoWindow({
            	content: content,
        	});

    		// add an event listener to your marker to open the InfoWindow on click
        	marker.addListener('click', function() {
            	infowindow.open(map, marker);
        	});
		})


	}
})


