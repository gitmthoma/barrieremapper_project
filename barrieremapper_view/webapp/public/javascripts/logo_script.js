// Description: This script is used to fade out the logo container and fade in the main content after the index page has loaded. It is used in the index.html file.

document.addEventListener("DOMContentLoaded", function () {
    // Hide the main content initially
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
    document.querySelector("footer").style.display = "none";

    // Show the logo container initially
    document.getElementById("logo-container").classList.add("show");

    // Fade out the logo container
    setTimeout(function () {
        var logoContainer = document.getElementById("logo-container");
        var opacity = 1;
        var intervalId = setInterval(function () {
            opacity -= 0.01; // Adjust the step as needed
            logoContainer.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(intervalId);
                logoContainer.style.display = "none";

                // Show the main content after the logo has faded out
                document.querySelector("header").style.display = "block";
                document.querySelector("main").style.display = "block";
                document.querySelector("footer").style.display = "flex";
            }
        }, 20); // Adjust the duration of each step as needed
    }, 300); // Adjust the delay before fading out as needed
});
