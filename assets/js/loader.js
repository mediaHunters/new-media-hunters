document.addEventListener("DOMContentLoaded", function() {
    // Declare overlay variable
    var overlay;

    // Create the overlay div
    overlay = document.createElement("div");
    overlay.id = "overlay";

    // Create the loaderCircular div
    var loaderCircular = document.createElement("div");
    loaderCircular.id = "loaderCircular";

    // Append the overlay and loaderCircular to the body
    document.body.appendChild(overlay);
    document.body.appendChild(loaderCircular);

    // Select the loader
    var loader = document.getElementById("loaderCircular");
    
    // Show the overlay and loader
    overlay.style.opacity = "1"; // Show the overlay smoothly
    loader.style.opacity = "1"; // Show the loader smoothly
    
    // Simulate loading completion after 3 seconds
    setTimeout(function() {
        overlay.style.opacity = "0"; // Hide the overlay smoothly
        loader.style.opacity = "0"; // Hide the loader smoothly
        
        // Ensure the loader is hidden after transition
        setTimeout(function() {
            overlay.style.display = "none";
            loader.style.display = "none";
        }, 300);
        
    }, 3000);
});
