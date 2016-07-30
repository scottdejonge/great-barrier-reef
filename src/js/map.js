/**
 * Requires
 */

import $ from 'jquery'


/**
 * Variables
 */

// API Key
const API_KEY = 'AIzaSyCHSXxaBYz6cEYOiU4XfaaurReMcCa0oT4';

// Image Size
const IMAGE_SIZE = '480x320';

// DOM Elements
const $map = $('[data-map]');

// Buttons
const $buttonReset = $('[data-button-reset]');
const $buttonIsland = $('[data-button-island]');
const $buttonPanorama = $('[data-button-panorama]');

// Info
const $info = $('[data-info]');
const $infoImage = $('[data-info-image]');
const $infoBody = $('[data-info-body]');
const INIT_IMAGE_SRC = $infoImage.prop('src');
const INIT_CONTENT = $infoBody.html();

// Map
let map;
let canvas;
let bounds;
let infowindow;
let markers = [];
let categories = [];
let backgroundColor = '#EEEEEE';

// Street View
let panorama;
let StreetViewService;
const streetViewRadius = 500;

// Marker Sizes
const markerWidth = 28;
const markerHeight = markerWidth;

// Filter
const $filter = $('[data-filter]');

// Map Styles
const styles = JSON.parse(require('../json/styles.json'));

// Map Layers
const layers = JSON.parse(require('../json/layers.json'));

// Map Dives
const dives = JSON.parse(require('../json/dives.json'));


/**
 * Initialisation
 */

export function initialise() {

	if ($map.length) {

		loadScript('http://maps.googleapis.com/maps/api/js?v=3&key=' + API_KEY, function() {
			createMap($map);
		});
	}
}


/**
 * Load Script
 */

function loadScript(src, callback){
	var script = document.createElement("script");
	script.type = "text/javascript";
	if(callback)script.onload=callback;
	document.getElementsByTagName("head")[0].appendChild(script);
	script.src = src;
}


/**
 * Create Map
 */

function createMap($map) {
	canvas = $map.get(0);
	let center = new google.maps.LatLng(-16.101116, 147.8400143);

	const mapOptions = {
		zoom: 7,
		panControl: true,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		scaleControl: true,
		scrollwheel: false,
		mapTypeControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		center: center,
		styles: styles,
		mapTypeId: google.maps.MapTypeId.HYBRID,
		backgroundColor: backgroundColor
	};

	// Create Map
	map = new google.maps.Map(canvas, mapOptions);

	// Create Panorama
	createPanorama();

	// Create KML Overlay
	createKMLOverlay();

	// Street View Service
	StreetViewService = new google.maps.StreetViewService();

	// Create Bounds object
	bounds = new google.maps.LatLngBounds();

	// init Filters
	// initFilters();
	
	// Create Markers for Dives
	if (dives) {
		createMarkers(dives);
	}

	// Island Button Click
	$buttonIsland.on('click', function() {
		let $this = $(this);
		let marker = $this.data('marker');

		$this.addClass('hide');

		zoomtoLocation(marker.position, marker.zoom);
	});

	// Panorama Button Click
	$buttonPanorama.on('click', function() {
		let $this = $(this);
		let marker = $this.data('marker');

		$this.addClass('hide');

		initStreetViewPanorama(marker);
	});

	// Close Infowindow on Map Click
	google.maps.event.addListener(map, 'click', function() {
		infowindow.close();

		$infoImage.attr('src', INIT_IMAGE_SRC);
		$infoBody.html(INIT_CONTENT);

		$buttonIsland.addClass('hide');
		$buttonPanorama.addClass('hide');
		$buttonReset.addClass('hide');
	});
	
	// Set Map Center on Resize
	google.maps.event.addDomListener(window,'resize',function() {
		center = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
		map.fitBounds(bounds);
	});
};


/**
 * Create Panorama
 */

function createPanorama() {

	// Panorama
	const panoramaOptions = {
		zoom: 1,
		addressControl: false,
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		scrollwheel: false
	}

	// Create Panorama
	panorama = new google.maps.StreetViewPanorama(canvas, panoramaOptions);
	panorama.setVisible(false);
}


/**
 * Create KML Overlay
 */

function createKMLOverlay() {

	// KML Overlay
	const kmlOptions = {
		suppressInfoWindows: true,
		preserveViewport: false,
		map: map
	};

	$.each(layers, function(i, layer) {
		let mapLayer = new google.maps.KmlLayer(layer.url, kmlOptions);
	});
}


/**
 * Create Markers
 */

function createMarkers(locations) {

	// Create Infowindow
	infowindow = new google.maps.InfoWindow();

	// Create Markers
	$.each(locations, function(i, location) {
		if (location.lat && location.lng) {
			createMarker(location, i);
		}
	});

	// Fit Bounds
	map.fitBounds(bounds);
}


/**
 * Create Marker
 */

function createMarker(location, i) {
	const zIndex = 1 + i;
	const latLng = new google.maps.LatLng(location.lat, location.lng);

	// Marker Icon
	const icon = {
		url: '/great-barrier-reef/src/marker/' + location.category + '.svg',
		scaledSize: new google.maps.Size(markerWidth, markerHeight),
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point((markerWidth / 2), markerHeight),
	};

	// Create Marker Object
	const marker = new google.maps.Marker({
		map: map,
		icon: icon,
		position: latLng,
		zIndex: zIndex,
		title: location.title,
		category: location.category,
		streetViewId: location.streetViewId,
		zoom: location.zoom,
		content: location.content
	});

	// Marker click event Update Info
	google.maps.event.addListener(marker, 'click', function(event) {
		markerClick(this);
	});

	// if ($.inArray(location.category, categories) != -1) {
	// 	marker.setVisible(true);
	// } else {
	// 	marker.setVisible(false);
	// }

	//Add Marker to markers
	markers.push(marker);

	// Extend Map Bounds
	bounds.extend(latLng);
};


/**
 * Marker Click
 */

function markerClick(marker) {
	let content = '';

	$buttonIsland.addClass('hide');
	$buttonPanorama.addClass('hide');

	// Update Image
	updateImage(marker);

	// Update Content
	updateContent(marker);

	if (marker.category == 'island') {
		$buttonIsland.removeClass('hide');
		$buttonIsland.data('marker', marker);
	} else if (marker.category == 'dive') {
		$buttonPanorama.removeClass('hide');
		$buttonPanorama.data('marker', marker);
	}
};


/**
 * Update Content
 */

function updateContent(marker) {
	let content = '';

	if (marker.title) {
		content += '<h2>' + marker.title + '</h2>';
	}

	if (marker.content) {
		content += '<p>' + marker.content + '</p>';
	}

	$infoBody.html(content);
}


/**
 * Update Image
 */

function updateImage(marker) {
	let src;
	let lat = marker.getPosition().lat();
	let lng = marker.getPosition().lng();
	let zoom = marker.zoom - 1;

	if (marker.image) {
		src = marker.image;
	} else {
		if (marker.category == 'island') {
			src = 'https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=' + lat + ',' + lng + '&zoom=' + zoom + '&size=' + IMAGE_SIZE + '&key=' + API_KEY;
		} else if (marker.category == 'dive') {
			src = 'https://maps.googleapis.com/maps/api/streetview?size=' + IMAGE_SIZE + '&location=' + lat + ',' + lng + '&key=' + API_KEY;
		}
	}
	
	$infoImage.attr('src', src);
}


/**
 * Function to filter markers by category
 */

function initFilters() {

	$.each($filter, function() {
		let $this = $(this);
		let category = $this.data('filter');

		if ($this.hasClass('on')) {
			categories.push(category);
		}
	});

	$filter.on('click', function() {
		let $this = $(this);
		let category = $this.data('filter');

		if ($this.hasClass('on')) {
			$this.removeClass('on');

			let index = categories.indexOf(category);

			if (index > -1) {
				categories.splice(index, 1);
			}

		} else {
			$this.addClass('on');
			categories.push(category);
		}

		filterMarkers(categories);
	});
}


/**
 * Function to filter markers by category
 */

function filterMarkers(category) {

	$.each(markers, function(i, location) {
		let marker = markers[i];

		// Category is in active categories
		if ($.inArray(marker.category, categories) != -1) {
			marker.setVisible(true);
		} else {
			// Categories don't match 
			marker.setVisible(false);
		}
	});
}


/**
 * Zoom to location
 */

function zoomtoLocation(latLng, zoom) {

	map.setCenter(latLng);
	
	if (zoom) {
		map.setZoom(zoom);
	} else {
		map.setZoom(15);
	}

	showReset();

};


/**
 * Init Street View Panorama
 */

function initStreetViewPanorama(marker) {

	// Get Panorama for location with radius
	StreetViewService.getPanorama({
		location: marker.position,
		radius: streetViewRadius
	}, function(data, status) {
		createStreetViewPanorama(marker, data, status);
	});
}


/**
 * Create Street View Panorama
 */

function createStreetViewPanorama(marker, data, status) {
	let panoramaID;

	if (marker.streetViewId) {
		panoramaID = marker.streetViewId;
	}

	if (panoramaID || status === google.maps.StreetViewStatus.OK) {

		// Set Panorama Location
		if (!marker.streetViewId) {
			panoramaID = data.location.pano;
		}

		panorama.setPano(panoramaID);

		// Set Panorama POV
		let pov = panorama.getPhotographerPov();
		panorama.setPov(pov);

		// Set Panorama Visible
		panorama.setVisible(true);

		showReset();

		return false;

	} else if (status === google.maps.StreetViewStatus.ZERO_RESULTS) {
		console.error('Street View data not found for this location.');
		return false;
	} if (status === google.maps.StreetViewStatus.UNKNOWN_ERROR) {
		console.error('An unknown error occurred.');
		return false;
	}
}


/**
 * Show Reset
 */

function showReset() {

	$buttonReset.removeClass('hide');

	$buttonReset.on('click', function() {
		resetMap();
	});
};


/**
 * Reset Map
 */

function resetMap() {

	$infoImage.attr('src', INIT_IMAGE_SRC);
	$infoBody.html(INIT_CONTENT);

	$buttonReset.addClass('hide');
	$buttonIsland.addClass('hide');
	$buttonIsland.data('marker', null);
	$buttonPanorama.addClass('hide');
	$buttonPanorama.data('marker', null);

	if (panorama) {
		// panorama.setPano(null);
		panorama.setVisible(false);
	}

	map.fitBounds(bounds);
};