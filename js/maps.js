// Add marker on the map - Destinations
// Only allowing max 3 destinations
const labels = "ABC";
let labelIndex = 0;
let map, infoWindow;

// Create a route to that marker 

// Init Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 53.2734, lng: -7.77832031},
    zoom: 7,
  });
  // New marker
const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    title: "Click to zoom",
  });

 // Zoom in when a marker is clicked
 marker.addListener("click", () => {
    map.setZoom(4);
    map.setCenter(marker.getPosition());
  });

  // Info Window with markers
  infoWindow = new google.maps.InfoWindow();

  // Add to user input field
  // Go to user Location
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  // Button position
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          infoWindow.setPosition(pos);
          infoWindow.setContent("Current Location");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // When Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
      console.log("Browser does not support Geolocation")
    }
  });
}

// Incase Geolocation fails
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}
// Reset Map and preferences 
