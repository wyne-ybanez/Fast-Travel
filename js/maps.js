const labels = "AB";
let labelIndex = 0;
let map, infoWindow;
let pos;
let marker;
const Ireland = {lat: 53.2734, lng: -7.77832031};

// Get location form and listen for a submission event
let locationForm = document.getElementById('submit');
locationForm.addEventListener('click', geocodeData);

function initMap() {
 let directionsService = new google.maps.DirectionsService;
 let directionsDisplay = new google.maps.DirectionsRenderer;
 const map = new google.maps.Map(document.getElementById("map"), {
    center: Ireland,
    zoom: 7,
    // Map styling from: https://snazzymaps.com/style/132/light-gray
    styles: [
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#d3d3d3"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "color": "#808080"
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#b3b3b3"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "weight": 1.8
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d7d7d7"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ebebeb"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a7a7a7"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#efefef"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#696969"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#737373"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#d6d6d6"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {},
        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dadada"
                }
            ]
        }
    ]
});

// Changes once submit button is clicked  
// Clear old markers and set route marker positions
directionsDisplay.setMap(map);
document.getElementById('submit').addEventListener('click', () => {
    DisplayRoute(directionsService, directionsDisplay);
    markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
});

// Auto Completion on input used and editted: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
const inputOrigin = document.getElementById("origin");
const inputDestination = document.getElementById("destination");
const searchBox1 = new google.maps.places.SearchBox(inputOrigin);
const searchBox2 = new google.maps.places.SearchBox(inputDestination);
    // Bias the SearchBox results towards current map's viewport.
 map.addListener("bounds_changed", () => {
     searchBox1.setBounds(map.getBounds());
     searchBox2.setBounds(map.getBounds());
 });
let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
   searchBox1.addListener("places_changed", () => {
     const places = searchBox1.getPlaces();
     if (places.length == 0) {
        return;
     }
     // Clear out the old markers.
     markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
       if (!place.geometry) {
           console.log("Returned place contains no geometry");
         return;
       }
       // Create a marker for origin place
       markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        })
        );
       if (place.geometry.viewport) {
         // Only geocodes have viewport.
         bounds.union(place.geometry.viewport);
       } else {
         bounds.extend(place.geometry.location);
       }
     });
     map.fitBounds(bounds);
 });

 searchBox2.addListener("places_changed", () => {
    const places = searchBox2.getPlaces();
      if (places.length == 0) {
       return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
       marker.setMap(null);
     });
     markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
          console.log("Returned place contains no geometry");
        return;
      }
      markers.push(
       new google.maps.Marker({
         map,
         title: place.name,
         position: place.geometry.location,
       })
       );
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
});

// Go to user Location with 'Current Location' button used and editted: https://developers.google.com/maps/documentation/javascript/geolocation
  const locationButton = document.createElement('button');
  locationButton.textContent = 'Current location';
  locationButton.classList.add('custom-map-control-button');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          } 
           // Info Window of user location
           const infowindow = new google.maps.InfoWindow({
            position: pos,
            content: '<strong>Here you are!</strong>',
            map: map,
            center: pos
          });
          // Place Marker at current position
            const marker = new google.maps.Marker({
            position: pos,
            map: map,
          });
         // Clear previous marker requests
            markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = [];
          marker.addListener("click", () => {
            infowindow.open(map, marker);
          });
        },
        () => {
          handleLocationResponse(true, infoWindow, map.getCenter());
        });
    } else {
      // When Browser doesn't support Geolocation
      handleLocationResponse(false, infoWindow, map.getCenter());
      console.log('Browser does not support Geolocation')
    }
  });
}

// In case Geolocation fails for user current location
function handleLocationResponse(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// CodeFLix code used and editted:  https://www.dropbox.com/s/8yq58seg4zp902q/test.html?dl=0
// Display the route between origin and destination
function DisplayRoute(directionsService, directionsDisplay) {
    let origin = document.getElementById('origin').value;
    let destination = document.getElementById('destination').value;
    let request = { 
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
        };
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        // Make order details summary
        let visible = `
        <div class="col-md-12">
            <h2 class="page-heading mt-5 active">Order Details</h2>
        </div>
        `;
        document.getElementById('order-details').innerHTML = visible;
      } 
      // Make order details hidden
        else if (status === 'NOT_FOUND' && origin === '') {
        let hidden = '';
        document.getElementById('order-details').innerHTMl = hidden;
        window.alert('Missing Pick-Up location');
      } else if (status === 'NOT_FOUND' && destination === '') {
        document.getElementById('order-details').innerHTMl = hidden;
        window.alert('Missing Destination location');
      } else {
        document.getElementById('order-details').innerHTMl = hidden;
        window.alert('Directions request failed due to ' + status);
      }
    });
}

// Get Geocode Data to display on web page using axios
// Brad Traversy code used and eddited: https://www.youtube.com/watch?v=pRiQeo17u6c&t=917s&ab_channel=TraversyMedia
function geocodeData(e){
    //prevent actual submit
    e.preventDefault();
    // Geocode for origin location
    let originLocation = document.getElementById('origin').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: originLocation,
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY'
        }
    })
    .then((response) => {
        console.log(response);
        // Formatted Address
        let formattedAddress = response.data.results[0].formatted_address; 
        let formattedAddressOutput = `
                <ul class="list-group">
                    <div class="col-6">
                        <h4>From:</h4>
                    </div>
                    <li class="list-group-item list-group-item-dark">${formattedAddress}</li>
                </ul>
            `;
        // Output to app 
          document.getElementById('formatted-address-origins').innerHTML = formattedAddressOutput;
    })
    .catch((error) => {
        console.log(error.response);
    })
    // GeoCode For Destination
    e.preventDefault();
    let destinationLocation = document.getElementById('destination').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: destinationLocation,
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY'
        }
    })
    .then((response) => {
        let formattedAddress = response.data.results[0].formatted_address; 
        let formattedAddressOutput = `
            <ul class="list-group">
                <div class="col-6">
                    <h4>To:</h4>
                </div>
                <li class="list-group-item list-group-item-dark">${formattedAddress}</li>
            </ul>
            `;
          document.getElementById('formatted-address-destination').innerHTML = formattedAddressOutput;
    })
    .catch((error) => {
        console.log(error.response);
    })
}






// Reset Map and preferences 
