// Description: This script is used to handle the form input and send the data to the API. It is used in the barriere.html file.

document.addEventListener('DOMContentLoaded', function () {

    // Get environment variables
    var controllerAPI = "https://pfaffnground.ddns.net/controller_api" // For local deployment use: "http://localhost:8001/controller_api"

    // Get form input elements
    var form = document.getElementById('barrierForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get input values
        var username = document.getElementById('usernameInput').value;
        var barrierLabeling = document.getElementById('barrierLabelingInput').value;
        var barrierDescription = document.getElementById('barrierDescriptionInput').value;
        var isTemporary = document.getElementById('temporaryBarrier').checked;

        // Get marker coordinates set in addBarrier-map_script.js
        var lat = marker.getLatLng().lat;
        var lng = marker.getLatLng().lng;

        // Test output
        console.log('Koordinaten:', lat, lng);
        console.log('Username:', username);
        console.log('Bezeichnung:', barrierLabeling);
        console.log('Beschreibung:', barrierDescription);
        console.log('Temporär:', isTemporary);

        // Send data to API
        fetch(controllerAPI + '/entity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "labeling": barrierLabeling,
                "description": barrierDescription,
                "isTemporary": isTemporary,
                "lat": lat,
                "lng": lng
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert("Deine Barriere wurde erfolgreich gespeichert!\nFüge weitere Barrieren hinzu oder wirf einen Blick in die Barriere-Karte.")
                setTimeout(clearMarkers, 5000); // Clear markers 5 seconds after a barrier has been added
            })

            .catch((error) => {
                console.error('Error:', error);
            });

    });
})
