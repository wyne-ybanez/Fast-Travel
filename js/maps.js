const labels = "AB";
const inputs = [
    document.getElementById('origin'),
    document.getElementById('destination'),
    document.getElementById('timeInputHr'),
    document.getElementById('timeInputMin'),
    document.getElementById('dateInput'),
];
const Ireland = {lat: 53.2734, lng: -7.77832031};

//========== Event Listeners for submission event
const orderForm = document.getElementById('submit');
const resetInputs = document.getElementById('reset');
const mapsSection = document.querySelector('.map-section');
const Toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu-maps');

orderForm.addEventListener('click', geocodeData);
orderForm.addEventListener('click', timeDate);
orderForm.addEventListener('click', options);
resetInputs.addEventListener('click', resetForm);
Toggle.addEventListener('click', () => {
    Toggle.classList.toggle('active');
    mapsSection.classList.toggle('active');
    menu.classList.toggle('active');
})

//========== Init Map
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

//========== Auto Completion on input 
// Google Maps documentation used and editted: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
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

//========== Go to user Location with 'Current Location' button 
// Code from Google Docs used and editted: https://developers.google.com/maps/documentation/javascript/geolocation
  const locationButton = document.createElement('button');
  locationButton.textContent = 'Current location';
  locationButton.classList.add('custom-map-control-button');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener('click', () => {
    // Loading message 
    window.alert("This will just take a moment to load 😊 \nPlease enable your browser's location permissions.");

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
            content: '<strong>Here you are😎 !</strong>', 
            map: map,
            center: pos
          });
          // Place Marker at current position
            const marker = new google.maps.Marker({
            position: pos,
            map: map,
            zoom: 10
          });
         // Clear previous marker requests
            markers.forEach((marker) => {
            marker.setMap(null);
          });
            markers = [];
            marker.addListener("click", () => {
              infowindow.open(map, marker);
              map.setZoom(13);
             map.setCenter(marker.getPosition());
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

//========== In case Geolocation fails for user current location
function handleLocationResponse(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation ? "Error: The Geolocation service failed." : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

//========== Display the route between origin and destination
// CodeFLix code used and editted:  https://www.dropbox.com/s/8yq58seg4zp902q/test.html?dl=0
function DisplayRoute(directionsService, directionsDisplay) {
    const Origin = document.getElementById('origin').value;
    const Destination = document.getElementById('destination').value;
    let request = { 
        origin: Origin,
        destination: Destination,
        travelMode: 'DRIVING'
        };
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        // Make order details summary
        let visible = `
        <div class="col-md-12">
            <h2 class="page-heading mt-3 active">Booking Details</h2>
        </div>
        `;
        document.getElementById('order-details').innerHTML = visible;
      } 
        else if (status === 'NOT_FOUND' && Origin === '') {
        window.alert('Missing Pick-Up location');
      } else if (status === 'NOT_FOUND' && Destination === '') {
        window.alert('Missing Destination');
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

//========== Get Geocode Data to display on web page
// Brad Traversy code used and eddited: https://www.youtube.com/watch?v=pRiQeo17u6c&t=917s&ab_channel=TraversyMedia
function geocodeData(e){
    //prevent actual submit
    e.preventDefault();
    // Geocode for origin location
    const originLocation = document.getElementById('origin').value
    const destinationLocation = document.getElementById('destination').value
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: originLocation,
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY'
        }
    })
    .then((response) => {
        console.log(response);
        // Formatted Origin address
        const formattedOrigin = response.data.results[0].formatted_address; 
        let formattedOrgOutput = `
                <ul class="list-group">
                    <h4>Origin:</h4>
                    <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedOrigin}</li>
                </ul>
            `;
          document.getElementById('formatted-address-origins').innerHTML = formattedOrgOutput;
        // Request Denied due to restrictions
        if (response.data.status === 'REQUEST_DENIED'){
            window.alert('You do not have permission to use this API key - Booking location details will not be shown');
            console.log(response.data.status);
        }
    })
    .catch((error) => {
        console.log(error.response);
    })

    // Geocode Destination
    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: destinationLocation,
            key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY'
        }
    })
    .then((response) => {
        console.log(response);
        // Formatted Destination address
        const formattedDestination = response.data.results[0].formatted_address; 
        let formattedDestOutput = `
                <ul class="list-group">
                    <h4>Destination:</h4>
                    <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedDestination}</li>
                </ul>
                `;
          document.getElementById('formatted-address-destination').innerHTML = formattedDestOutput;
    })
    .catch((error) => {
        console.log(error.response);
    })
}

//========== Display Time and Date preferences on the HTML page
function timeDate(){
    let dateInput = document.getElementById('dateInput').value;
    let timeHr = document.getElementById('timeInputHr').value;
    let timeMin = document.getElementById('timeInputMin').value;
    // Date
    if (document.querySelector('#dateInput').value === ''){
        date =  null;
        window.alert('Date of journey unspecified. Please choose a date');
        console.log('User must choose a date');
    } else { 
        date = `
        <ul class="list-group mb-5">
            <h4>Date:</h4>
            <li class="list-group-item list-group-item-secondary text-dark text-center">${dateInput}</li>
        </ul>
        `;
    }   
    // Time
    if (document.querySelector('#timeInputHr').value === ''){
        time =  null;
        window.alert('Please choose an hourly time of departure');
        console.log('User must choose an hourly time');
    } else if (document.getElementById('timeInputMin').value === ''){ 
        time = null;
        window.alert('Time of departure is incomplete');
        console.log('User must choose at what minute they would like to depart at');
    } else {
        time = `  
        <ul class="list-group mb-5">
            <h4>Time:</h4>
            <li class="list-group-item list-group-item-secondary text-dark text-center">${timeHr} : ${timeMin}</li>
        </ul>
        `;
    }   
    document.querySelector('#time').innerHTML = time;
    document.querySelector('#date').innerHTML = date;
}

//========== Reset Map and delivery preferences 
function resetForm(){
    let resetHtmlVal = [
        document.querySelector('#time'),
        document.querySelector('#date'),
        document.getElementById('formatted-address-origins'),
        document.getElementById('formatted-address-destination'),
        document.getElementById('options')
    ]
    // Empty all inputs fields
    for (i=0; i<inputs.length; i++){
        inputs[i].value = '';
    };
    // Remove all preferences details
    for (i=0; i<resetHtmlVal.length; i++){
        resetHtmlVal[i].innerHTML = null;
    };
    let visible = '';
        document.getElementById('order-details').innerHTML = visible;
    // Reinitialize Map
    initMap();
    console.log('Form has been reset');
}


//========== If user submits without answering input fields
function options(){
    let optionButtons = `
            <div class="d-grid gap-4 col-xs-12 col-md-6 mx-auto mb-3">
                <a class="btn btn-dark" type="button" href="index.html">CANCEL</a>
                <a class="btn btn-dark" type="button" href="form.html">CONFIRM</a>
            </div>` 

    for(i=0; i<inputs.length; i++) {
        if (inputs[i].value === ''){
            document.getElementById('options').innerHTML = null;
        } else {
            document.getElementById('options').innerHTML = optionButtons;
        }
    }
}