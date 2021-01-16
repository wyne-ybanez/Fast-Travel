const labels = "AB";
let labelIndex = 0;
let map, infoWindow;
let pos;
let marker;
const Ireland = {lat: 53.2734, lng: -7.77832031};

// Get location form and listen for a submission event
let locationForm = document.getElementById('submit');
locationForm.addEventListener('click', geocodeData);
locationForm.addEventListener('click', orderDetails);

function initMap() {
 let directionsService = new google.maps.DirectionsService;
 let directionsDisplay = new google.maps.DirectionsRenderer;
  map = new google.maps.Map(document.getElementById("map"), {
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

  directionsDisplay.setMap(map);

    // Changes once submit button is clicked
    document.getElementById('submit').addEventListener('click', () => {
        DisplayRoute(directionsService, directionsDisplay);
    });

    
  // Info Window with markers
  infoWindow = new google.maps.InfoWindow();

  // Go to user Location with button
  const locationButton = document.createElement('button');
  locationButton.textContent = 'Current Location';
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

          // Place Marker at current position
          let marker = new google.maps.Marker({
            position: {lat:position.coords.latitude, lng: position.coords.longitude},
            map: map,
          })

          // Info Window of user location
          infoWindow.setPosition(pos);
          infoWindow.setContent(`You're here 😎 !`);
          infoWindow.open(map);
          map.setCenter(pos);
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
        travelMode: 'DRIVING',
        };
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else if (status === 'NOT_FOUND' && origin === '') {
        window.alert('Missing Pick-Up location');
      } else if (status === 'NOT_FOUND' && destination === '') {
        window.alert('Missing Destination location');
      } else {
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
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
            region: 'IE'
        }
    })
    .then(function(response){
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
    .catch(function(error){
        console.log(error);
    })

    // GeoCode For Destination
    e.preventDefault();
    let destinationLocation = document.getElementById('destination').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: destinationLocation,
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
            region: 'IE'
        }
    })
    .then(function(response){
        console.log(response);

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
    .catch(function(error){
        console.log(error);
    })
}

// Get order summary to appear once submit has been pressed
function orderDetails(){
    document.querySelector('.order-details').style.visibility = "visible";
}

// Text predictions  

// Reset Map and preferences 
