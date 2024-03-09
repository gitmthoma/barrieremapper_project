// Description: This script is used to display all barriers on a map. It is used in the kartenansicht.html file.

document.addEventListener('DOMContentLoaded', function () {
    // Get environment variables
    var controllerAPI = "https://pfaffnground.ddns.net/controller_api";

    // Initializes map
    const map = L.map('map');

    // Sets initial coordinates and zoom level
    map.setView([49.3987524, 8.6724335], 13);

    console.log("Map initialized");

    // Add the tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // initialize list for marker group
    var marker_cluster = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true,
        animate: true,
        spiderLegPolylineOptions: { weight: 0.5, color: '#E37E30', opacity: 0.5 },

    });

    // Use different icon than default
    const markerIcon = new L.Icon({
        iconUrl: 'images/marker.png',
        iconSize: [20, 20], // size of the icon
    })

    // Get all barrier entities
    fetch(controllerAPI + '/entities?entity_type=' + 'Barrier' + '&key_value=' + 'yes', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(entities => {
            // For each entity, create a marker on the map
            entities.forEach(entity => {
                if (entity.location && entity.location.coordinates && entity.location.coordinates.includes(0) == false) {
                    var marker = L.marker([entity.location.coordinates[0], entity.location.coordinates[1]], { icon: markerIcon });
                    var popupContent = "<b>" + entity.labeling + "</b><br>" + entity.description + "</b><br>";
                    // Check if the barrier is temporary
                    if (entity.isTemporary) {
                        // Add clock icon and text
                        popupContent += "<i class='fa fa-clock-o'></i> Temporäre Barriere";
                    }
                    var popup = marker.bindPopup(popupContent);
                    // add marker to cluster
                    marker_cluster.addLayer(marker)

                }
            });
        });

    // Add cluster to map
    marker_cluster.addTo(map);

    // Fit map to current location
    let location_marker, circle, zoomed;

    if (!navigator.geolocation) {
        console.log("There is no geolocation.")
    }

    const options = {};

    // Watch user position
    navigator.geolocation.watchPosition(success, error, options);

    let hasCentered = false; // Add this line at the beginning of your script

    // Success handling
    function success(pos) {
        console.log("position success");
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        if (location_marker) {
            map.removeLayer(location_marker);
            map.removeLayer(circle);
        }
        // Removes any existing marker and circule (new ones about to be set)
        // Use different icon than default
        const pinIcon = new L.Icon({
            iconUrl: 'images/pin.png',
            iconSize: [35, 35], // size of the icon
            zIndexOffset: 1000,
        })
        location_marker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
        // Set map focus to current user position, if not already done
        if (!hasCentered) {
            map.setView([lat, lng]);
            hasCentered = true;
        }
        // Add popup to marker
        location_marker.bindPopup("<b>Hey Du!</b><br>Du befindest dich gerade hier.");
        circle = L.circle([lat, lng], { color: '#005751', fillOpacity: 0.05, weight: 0.5, radius: accuracy }).addTo(map);
        // Adds marker to the map and a circle for accuracy

        // Set zoom to boundaries of accuracy circle
        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds());
        }


    }

    // Error handling
    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
    }



});