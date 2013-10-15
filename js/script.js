// Set view of Leaflet map based on screen size
if ($(window).width() < 626) {
	var map = new L.Map('map').setView([35.1,-106.6],11);
} else {
	var map = new L.Map('map').setView([35.13,-106.53],12);
}

// Information for the base tile via Cloudmade
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png'
var cloudmade = new L.TileLayer(cloudmadeUrl, {
	attribution: 'Jolie McCullough, Albuquerque Journal | Map data &copy; City of Albuquerque, Imagery &copy; 2011 CloudMade',
	key: '09cb1b5940994a2695239c8c775524ef',
	styleId: 106670,
	maxZoom: 18
});
// Add to map
map.addLayer(cloudmade);


// Here's the Tabletop feed
// First we'll initialize Tabletop with our spreadsheet
var jqueryNoConflict = jQuery;
jqueryNoConflict(document).ready(function(){
	initializeTabletopObject('0AjA5lxcZKkY5dEhCcWtOS1ppMWNaeXUyc0pYN0kxVlE');
});

// Pull data from Google spreadsheet
// And push to our startUpLeaflet function
function initializeTabletopObject(dataSpreadsheet){
	Tabletop.init({
    	key: dataSpreadsheet,
    	callback: startUpLeafet,
    	simpleSheet: true,
    	debug: false
    });
}

// This function gets our data from our spreadsheet
// Then gets it ready for Leaflet.
// It creates the marker, sets location
// And plots on it on our map
function startUpLeafet(tabletopData) {
	// Tabletop creates arrays out of our data
	// We'll loop through them and create markers for each
	for (var num = 0; num < tabletopData.length; num ++) {
		// Our table columns
		// Change 'brewery', 'address', etc.
		// To match table column names in your table
		var dataOne = tabletopData[num].location;
		var dataTwo = tabletopData[num].address;
		var dataThree = tabletopData[num].quadrant;
		var dataFour= tabletopData[num].whentovotethere;

		// Pull in our lat, long information
		var dataLat = tabletopData[num].latitude;
		var dataLong = tabletopData[num].longitude;

		// Add to our marker
		marker_location = new L.LatLng(dataLat, dataLong);
		// Create the marker
    	layer = new L.Marker(marker_location);
    
    	// Create the popup
    	// Change 'Address', 'City', etc.
		// To match table column names in your table
    	var popup = "<div class=popup_box" + "id=" + num + ">";
    	popup += "<div class='popup_box_header'><strong>" + dataOne + "</strong></div>";
    	popup += "<hr />";
    	popup += "<strong>Address:</strong> " + dataTwo + "<br />";
    	popup += "<strong>Open:</strong> " + dataFour + "<br />";
    	popup += "</div>";
    	// Add to our marker
		layer.bindPopup(popup);
	
		// Add marker to our to map
		map.addLayer(layer);
	}
};



// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;
// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();
// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();
$('.toggle_description').click(function() {
	if (isVisibleDescription === false) {
		$('.description_box_cover').show();
		// Add Sidebar header into our description box
		// And 'Scroll to read more...' text on wide mobile screen
		$('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');
		// Add the rest of our sidebar content, credit information
		$('.description_box_text').html(sidebarContent + '<br />');
		$('#caption_box').html('Credits: ' + creditsContent);
		$('.description_box').show();
		isVisibleDescription = true;
	} else {
		$('.description_box').hide();
		$('.description_box_cover').hide();
		isVisibleDescription = false;
	}
});