const labels = 'AB';

//========== Input fields
const inputs = [
  document.getElementById('origin'),
  document.getElementById('destination'),
  document.getElementById('timeInputHr'),
  document.getElementById('timeInputMin'),
  document.getElementById('dateInput'),
]
const Ireland = { lat: 53.2734, lng: -7.77832031 }

//========== Event Listeners for submission event
const order = document.getElementById('submit')
const resetInputs = document.getElementById('reset')
const mapsSection = document.querySelector('.map-section')
const Toggle = document.querySelector('.toggle')
const menuMaps = document.querySelector('.menuMaps')

// Submit event Listeners
order.addEventListener('click', geocodeData)
order.addEventListener('click', timeDate)
order.addEventListener('click', height)
order.addEventListener('click', ScrollFunc)
order.addEventListener('click', localDataStorage)

// Reset form event
resetInputs.addEventListener('click', resetForm)

//  Nav menu toggle event
Toggle.addEventListener('click', () => {
  Toggle.classList.toggle('active')
  mapsSection.classList.toggle('active')
})

//========== Init Map
function initMap() {
  let directionsService = new google.maps.DirectionsService()
  let directionsDisplay = new google.maps.DirectionsRenderer({
    // To change the color of the route: https://stackoverflow.com/questions/19022702/how-to-change-the-color-of-route-in-google-maps-v3
    polylineOptions: {
      strokeColor: 'red',
    },
  })
  const map = new google.maps.Map(document.getElementById('map'), {
    center: Ireland,
    zoom: 7,
    // Map styling from Snazzy Maps: https://snazzymaps.com/style/47631/blue
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [
          {
            color: '#005383',
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            gamma: 0.01,
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            saturation: -31,
          },
          {
            lightness: -33,
          },
          {
            weight: 2,
          },
          {
            gamma: 0.8,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            lightness: 30,
          },
          {
            saturation: 30,
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            saturation: 20,
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            lightness: 20,
          },
          {
            saturation: -20,
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            lightness: 10,
          },
          {
            saturation: -30,
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
          {
            saturation: 25,
          },
          {
            lightness: 25,
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          {
            lightness: -20,
          },
        ],
      },
    ],
  })

  // Changes once submit button is clicked
  // Clear old markers and set route marker positions
  directionsDisplay.setMap(map)
  document.getElementById('submit').addEventListener('click', () => {
    DisplayRoute(directionsService, directionsDisplay)
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    markers = []
  })

  //========== Auto Completion on input
  // Google Maps documentation used and editted: https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
  const inputOrigin = document.getElementById('origin')
  const inputDestination = document.getElementById('destination')
  const searchBox1 = new google.maps.places.SearchBox(inputOrigin)
  const searchBox2 = new google.maps.places.SearchBox(inputDestination)
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', () => {
    searchBox1.setBounds(map.getBounds())
    searchBox2.setBounds(map.getBounds())
  })
  let markers = []
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox1.addListener('places_changed', () => {
    const places = searchBox1.getPlaces()
    if (places.length == 0) {
      return
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    markers = []

    const bounds = new google.maps.LatLngBounds()
    places.forEach((place) => {
      if (!place.geometry) {
        console.log('Returned origin contains no geometry')
        return
      }
      // Create a marker for origin place
      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        })
      )
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    map.fitBounds(bounds)
  })

  searchBox2.addListener('places_changed', () => {
    const places = searchBox2.getPlaces()
    if (places.length == 0) {
      return
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    markers = []

    const bounds = new google.maps.LatLngBounds()
    places.forEach((place) => {
      if (!place.geometry) {
        console.log('Returned destination contains no geometry')
        return
      }
      markers.push(
        new google.maps.Marker({
          map,
          title: place.name,
          position: place.geometry.location,
        })
      )
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    })
    map.fitBounds(bounds)
  })

  //========== Go to user Location with 'Current Location' button
  // Code from Google Docs used and editted: https://developers.google.com/maps/documentation/javascript/geolocation
  const locationButton = document.createElement('button')
  locationButton.textContent = 'Current location'
  locationButton.classList.add('custom-map-control-button')
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)

  locationButton.addEventListener('click', () => {
    // Loading message
    window.alert(
      "This will just take a moment to load 😊 \nPlease enable your browser's location permissions."
    )

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
            center: pos,
          })
          // Place Marker at current position
          const marker = new google.maps.Marker({
            position: pos,
            map: map,
            zoom: 10,
          })
          // Clear previous marker requests
          markers.forEach((marker) => {
            marker.setMap(null)
          })
          markers = []
          marker.addListener('click', () => {
            infowindow.open(map, marker)
            map.setZoom(13)
            map.setCenter(marker.getPosition())
          })
        },
        () => {
          handleLocationResponse(true, infoWindow, map.getCenter())
        }
      )
    } else {
      // When Browser doesn't support Geolocation
      handleLocationResponse(false, infoWindow, map.getCenter())
      console.log('Browser does not support Geolocation')
    }
  })
}

//========== In case Geolocation fails for user current location
function handleLocationResponse(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
}

//========== Display the route between origin and destination
// If successful, allow use to add specifications to order
// CodeFLix code used and editted:  https://www.dropbox.com/s/8yq58seg4zp902q/test.html?dl=0
function DisplayRoute(directionsService, directionsDisplay) {
  const Origin = document.getElementById('origin').value
  const Destination = document.getElementById('destination').value
  let request = {
    origin: Origin,
    destination: Destination,
    travelMode: 'DRIVING',
    region: 'IE',
  }
  directionsService.route(request, (response, status) => {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
      // Make order details summary
      let visible = `
        <div class="col-12" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-duration="1500">
            <h1 class="page-heading mt-5 active" id="order-details">Booking Information</h1>
        </div>
        `
      document.getElementById('order-details').innerHTML = visible;  
    } else if (status === 'NOT_FOUND' && Origin === '') {
      window.alert('Missing Pick-Up location')
    } else if (status === 'NOT_FOUND' && Destination === '') {
      window.alert('Missing Destination')
    } else {
      // When request fails - user cannot move forward with booking
      mapsSection.classList.remove('height')
      menuMaps.classList.remove('height')
      window.alert(
        'Your request failed :( \n Please be specfic, keep requests to the same country and check your permissions. \nFailure status: ' +
          status
      )
    }
  })
}

//========== Get Geocode Data to display on web page
// Brad Traversy code used and eddited: https://www.youtube.com/watch?v=pRiQeo17u6c&t=917s&ab_channel=TraversyMedia
function geocodeData() {
  // Geocode for origin location
  let originLocation = document.getElementById('origin').value
  let destinationLocation = document.getElementById('destination').value
  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: originLocation,
        key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
      },
    })
    .then((response) => {
      console.log(response)
      // Formatted Origin address
      const formattedOrigin = response.data.results[0].formatted_address
      let formattedOrgOutput = `
                <h4>Origin:</h4>
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedOrigin}</li>
                    </ul>
                    `
      document.getElementById(
        'formatted-address-origins'
      ).innerHTML = formattedOrgOutput
      // Request Denied due to restrictions
      if (response.data.status === 'REQUEST_DENIED') {
        window.alert(
          'You do not have permission to use this API key - Booking location details will not be shown'
        )
        console.log(response.data.status)
      }
    })
    .catch((error) => {
      console.log(error.response)
    })
  // Geocode Destination
  axios
    .get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: destinationLocation,
        key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
      },
    })
    .then((response) => {
      console.log(response)
      // Formatted Destination address
      const formattedDestination = response.data.results[0].formatted_address
      let formattedDestOutput = `
            <h4>Destination:</h4>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedDestination}</li>
                </ul>
                `
      document.getElementById(
        'formatted-address-destination'
      ).innerHTML = formattedDestOutput
    })
    .catch((error) => {
      console.log(error.response)
    })
}

//========== Display Time and Date preferences on the HTML page
function timeDate() {
  let dateInput = document.getElementById('dateInput').value
  let timeHr = document.getElementById('timeInputHr').value
  let timeMin = document.getElementById('timeInputMin').value
  // Date
  if (document.querySelector('#dateInput').value === '') {
    date = null
    console.log('User must choose a date')
  } else {
    date = `
        <h4>Date:</h4>
        <ul class="list-group mb-5">
            <li class="list-group-item list-group-item-secondary text-dark text-center">${dateInput}</li>
        </ul>
        `
  }
  // Time
  if (document.querySelector('#timeInputHr').value === '') {
    time = null
    console.log('User must choose an hourly time')
  } else if (document.getElementById('timeInputMin').value === '') {
    time = null
    console.log('User must choose at what minute they would like to depart at')
  } else {
    time = `  
        <h4>Time:</h4>
        <ul class="list-group mb-5">         
            <li class="list-group-item list-group-item-secondary text-dark text-center">${timeHr} : ${timeMin}</li>
        </ul>
        `
  }
  document.querySelector('#time').innerHTML = time
  document.querySelector('#date').innerHTML = date
}

//========== Reset Map and delivery preferences
function resetForm() {
  let resetHtmlVal = [
    document.querySelector('#time'),
    document.querySelector('#date'),
    document.getElementById('formatted-address-origins'),
    document.getElementById('formatted-address-destination'),
    document.getElementById('options'),
  ]

  // Empty all inputs fields
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = ''
  }

  // Remove all preferences details
  for (i = 0; i < resetHtmlVal.length; i++) {
    resetHtmlVal[i].innerHTML = null
  }
  let visible = ''
  document.getElementById('order-details').innerHTML = visible

  // Reset height
  mapsSection.classList.remove('height')
  menuMaps.classList.remove('height')

  // Reinitialize Map
  initMap()
  console.log('Form has been reset')
}

//========== If user submits without answering input fields
function height() {
  let optionButtons = `
            <div class="col-xs-12 col-md-6 mx-auto mb-3 text-center justify-content-center" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-duration="1500">
                <a class="btn btn-light" type="button" href="maps.html">
                    CANCEL
                </a>
            </div>
            <div class="col-xs-12 col-md-6 mx-auto mb-3 text-center justify-content-center" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-delay="500" data-aos-duration="1500">
                <a class="btn btn-light" type="button" href="specsForm.html">
                    CONFIRM
                </a>
            </div>`

  // Reactive Page height
  for (i = 0; i < inputs.length; i++) {
    if (
      inputs[i].value === '' ||
      inputs[0].value === '' ||
      inputs[1].value === '' ||
      inputs[2].value === '' ||
      inputs[3].value === '' ||
      inputs[4].value === ''
    ) {
      document.getElementById('options').innerHTML = null
      mapsSection.classList.remove('height')
      menuMaps.classList.remove('height')
    } else {
      document.getElementById('options').innerHTML = optionButtons
      mapsSection.classList.toggle('height')
      menuMaps.classList.toggle('height')
    }
  }
}

//========== Scroll to booking details after submission
function ScrollFunc() {
  window.scrollTo(0, 600)
}

//========== Set Local Storage for accessing data
function localDataStorage() {
  localStorage.setItem('origin', document.getElementById('origin').value)
  localStorage.setItem('destination', document.getElementById('destination').value)
  localStorage.setItem('date', document.getElementById('dateInput').value)
  localStorage.setItem(
    'time',
    document.getElementById('timeInputHr').value +
      ':' +
      document.getElementById('timeInputMin').value
  )
  console.log(localStorage)
}
