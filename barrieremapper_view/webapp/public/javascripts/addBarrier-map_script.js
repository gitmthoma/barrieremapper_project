// Description: This script is used to add a barrier to the map. It is used in the barriere.html file.


// Initialize the map and set the view to Heidelberg
const map = L.map('map');
map.setView([49.3987524, 8.6724335], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize the marker and circle variables
let marker, circle, zoomed;

// Create a layer group for the markers
let markers = L.layerGroup().addTo(map);

// Ask user if they want to use their location or manually set a marker
const useLocation = confirm("Möchten Sie Ihren Standort verwenden? Klicken Sie auf Abbrechen, um stattdessen eine manuelle Markierung zu setzen.");

// If the user wants to use their location, add a marker to the map at their location
if (useLocation) {
    if (!navigator.geolocation) {
        throw new Error("There is no geolocation.")
    }
    const options = {};

    // Add a temporary marker to the map at the user's location
    navigator.geolocation.getCurrentPosition(function (pos) {
        addLocationBarrier(pos);
    }, error, options);

} else {
    map.on('click', function (e) { // When the map is clicked, add a marker to the map at the clicked location
        if (marker) {
            marker.bindPopup("Du hast bereits eine Markierung gesetzt.").openPopup();
        } else {
            addManualBarrier(e.latlng.lat, e.latlng.lng); // Add a marker to the map at the clicked location
            map.off('click');
        }
    });
}

// Function to add a marker to the map at the user's location
function addLocationBarrier(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    // Removes any existing marker and circle (new ones about to be set)
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    // Adds a marker to the map at the user's location
    const markerIcon = new L.Icon({
        iconUrl: 'images/marker.png',
        iconSize: [35, 35],
    })
    marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    marker.bindPopup("<b>Deine Barriere befindet sich hier.</b><br>Beschreibe sie mithilfe der Formulare.").openPopup();
    circle = L.circle([lat, lng], { color: '#005751', fillOpacity: 0.05, weight: 0.5, radius: accuracy }).addTo(map);

    // Set zoom to boundaries of accuracy circle
    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    // Set map focus to current user position
    map.setView([lat, lng]);
    return marker;
}

// Function to add a marker to the map at the clicked location
function addManualBarrier(lat, lng) {
    const markerIcon = new L.Icon({
        iconUrl: 'images/marker.png',
        iconSize: [35, 35],
    })
    marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map);
    marker.bindPopup("<b>Diese Position wurde als Barriere markiert.</b><br>Beschreibe nun Deine Barriere mithilfe der Formulare!").openPopup();
}

function clearMarkers() {
    markers.clearLayers();
    marker = null;
}

// Function to get the coordinates of the marker as String
function locationString(pos) {
    if (marker) {
        posString = marker.latlng.toString();
        return posString;
    }
}

// Function to handle errors when getting the user's location
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

