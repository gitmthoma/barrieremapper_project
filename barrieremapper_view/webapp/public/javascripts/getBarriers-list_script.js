// Description: This script is used to list all barriers. It is used in the listenansicht.html file.

document.addEventListener('DOMContentLoaded', function () {

    // Get environment variables
    var controllerAPI = "https://pfaffnground.ddns.net/controller_api"; // For local deployment use: "http://localhost:8001/controller_api"

    // Set the default sort value
    document.getElementById('sort').value = 'date';

    // Set the default filter value	
    document.getElementById('filter').value = 'all';

    // Show info bubble
    document.querySelectorAll('.info-icon').forEach(function (icon) {
        icon.addEventListener('click', function () {
            var infoBubble = document.createElement('div');
            infoBubble.textContent = this.dataset.info;
            infoBubble.classList.add('info-bubble');
            this.appendChild(infoBubble);
            infoBubble.style.display = 'block';
        });
    });

    // Function to fetch entities from the API
    function fetchEntities() {
        return fetch(controllerAPI + '/entities?entity_type=' + 'Barrier' + '&key_value=' + 'yes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
            .then(response => response.json());
    }

    // Function to sort entities by username or date
    function sortEntities(entities) {
        var sortValue = document.getElementById('sort').value;
        if (sortValue === 'username') {
            return entities.sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortValue === 'date') {
            return entities.sort((a, b) => {
                var dateA = a.dateCreated.split('T')[0];
                var dateB = b.dateCreated.split('T')[0];
                return new Date(dateB) - new Date(dateA);
            });
        } else {
            return entities;
        }
    }

    // Function to filter entities by temporary or permanent
    function filterEntities(entities) {
        var filterValue = document.getElementById('filter').value;
        if (filterValue === 'all') {
            return entities.filter(entity => entity.location && entity.location.coordinates && !entity.location.coordinates.includes(0));
        } else if (filterValue === 'temporary') {
            return entities.filter(entity => entity.location && entity.location.coordinates && !entity.location.coordinates.includes(0) && entity.isTemporary);
        } else if (filterValue === 'permanent') {
            return entities.filter(entity => entity.location && entity.location.coordinates && !entity.location.coordinates.includes(0) && !entity.isTemporary);
        } else {
            return [];
        }
    }

    // Function to list entities as cards in the HTML
    function listEntities(entities) {
        // Get the HTML element where the entities will be listed
        var listElement = document.getElementById('entitiesList');

        // Clear the list
        listElement.innerHTML = '';

        // Loop through the entities
        entities.forEach(entity => {
            // Create a new list item
            var listItem = document.createElement('li');
            listItem.className = 'card';

            // Create the header for the list item
            var header = document.createElement('div');
            header.className = 'card-header';
            header.innerHTML = "<b>" + entity.labeling + "</b>";

            // List entity contents
            var content = document.createElement('div');
            content.className = 'card-content';
            content.innerHTML = entity.description + "<br>Username:</b> " + entity.username + "<br>";

            // Check if the barrier is temporary
            if (entity.isTemporary) {
                // Add clock icon and text
                content.innerHTML += "<i class='fa fa-clock-o'></i> Temporäre Barriere";
            }

            // Add GoogleMaps link
            if (entity.location && entity.location.coordinates && !entity.location.coordinates.includes(0)) {
                header.innerHTML += "<span class='right-align'><a href='https://www.google.com/maps/place/" + entity.location.coordinates[0] + "," + entity.location.coordinates[1] + "' target='_blank'><i class='fa fa-external-link info-icon'></i></a></span>";
            }
            // Set the content of the list item
            listItem.appendChild(header);
            listItem.appendChild(content);

            // Add the list item to the list
            listElement.appendChild(listItem);
        });
    }

    // Function to search entities
    function searchEntities(entities) {
        var searchText = document.getElementById('search').value.toLowerCase();
        return entities.filter(entity => {
            return entity.username.toLowerCase().includes(searchText)
                || entity.labeling.toLowerCase().includes(searchText)
                || entity.description.toLowerCase().includes(searchText);
        });
    }

    // Function to fetch and display entities
    function fetchAndDisplayEntities() {
        fetchEntities()
            .then(entities => sortEntities(entities))
            .then(entities => filterEntities(entities))
            .then(entities => searchEntities(entities))
            .then(entities => listEntities(entities));
    }

    // Call the function when the page is loaded
    fetchAndDisplayEntities();

    // Add a click event listener to the info icons to show info bubbles
    document.querySelectorAll('.info-icon').forEach(function (icon) {
        icon.addEventListener('click', function (event) {
            // Remove any existing info bubbles
            document.querySelectorAll('.info-bubble').forEach(function (bubble) {
                bubble.remove();
            });

            // Create a new info bubble
            var infoBubble = document.createElement('div');
            infoBubble.textContent = this.dataset.info;
            infoBubble.classList.add('info-bubble');
            this.appendChild(infoBubble);
            infoBubble.style.display = 'block';

            // Prevent the document click event from being triggered
            event.stopPropagation();
        });
    });

    // Add a click event listener to the document to remove all info bubbles when the user clicks outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.info-bubble').forEach(function (bubble) {
            bubble.remove();
        });
    });

    // Call the function when the sort value is changed
    document.getElementById('sort').addEventListener('change', function () {
        fetchAndDisplayEntities();
    });

    // Call the function when the filter value is changed
    document.getElementById('filter').addEventListener('change', function () {
        fetchEntities().then(entities => {
            var sortedEntities = sortEntities(entities);
            var filteredEntities = filterEntities(sortedEntities);
            listEntities(filteredEntities);
        });
    });

    // Call the function when the search value is changed
    document.getElementById('search').addEventListener('input', function () {
        fetchEntities().then(entities => {
            var sortedEntities = sortEntities(entities);
            var filteredEntities = filterEntities(sortedEntities);
            var searchedEntities = searchEntities(filteredEntities);
            listEntities(searchedEntities);
        });
    });
});

