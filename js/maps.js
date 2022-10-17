const labels = 'AB'

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

//========== Nav menu toggle event
Toggle.addEventListener('click', () => {
  Toggle.classList.toggle('active')
  mapsSection.classList.toggle('active')
})

//========== Init Map
function initMap() {
  let directionsService = new google.maps.DirectionsService()
  let directionsDisplay = new google.maps.DirectionsRenderer({
    polylineOptions: {
      strokeColor: '#00AEAE',
    },
  })
  const map = new google.maps.Map(document.getElementById('map'), {
    center: Ireland,
    zoom: 7,
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#d3d3d3',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#808080',
          },
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#b3b3b3',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ffffff',
          },
          {
            weight: 1.8,
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d7d7d7',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ebebeb',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            color: '#a7a7a7',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#efefef',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'label.text.fill',
        stylers: [
          {
            color: '#696969',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#737373',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d6d6d6',
          },
        ],
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {},
      {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d6d6d6',
          },
        ],
      },
    ],
  })

  // Changes markers once submit button is clicked
  directionsDisplay.setMap(map)
  document.getElementById('submit').addEventListener('click', () => {
    DisplayRoute(directionsService, directionsDisplay)
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    markers = []
  })

  //========== Auto Completion on input
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

  // Search box for origin
  searchBox1.addListener('places_changed', () => {
    const places = searchBox1.getPlaces()
    if (places === '') {
      return null
    }
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

  // Search box for destination
  searchBox2.addListener('places_changed', () => {
    const places = searchBox2.getPlaces()
    if (places === '') {
      return null
    }
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
  const locationButton = document.createElement('button')
  locationButton.textContent = 'Current location'
  locationButton.classList.add('custom-map-control-button')
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton)

  locationButton.addEventListener('click', () => {
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
          handleLocationResponse(true, infoWindow, markers, map.getCenter())
        }
      )
    } else {
      // When Browser doesn't support Geolocation
      handleLocationResponse(false, infoWindow, markers, map.getCenter())
    }
  })
}

//========== In case Geolocation fails for user current location
function handleLocationResponse(
  browserHasGeolocation,
  infoWindow,
  markers,
  pos
) {
  // Add infowindow
  infoWindow.setPosition(pos)
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  )
  infoWindow.open(map)
  // Add marker
  markers.forEach((marker) => {
    marker.setMap(null)
  })
  markers = []
}

//========== Display the route between origin and destination
function DisplayRoute(directionsService, directionsDisplay) {
  let Origin = document.getElementById('origin').value
  let Destination = document.getElementById('destination').value
  let TimeInputHr = document.getElementById('timeInputHr').value
  let TimeInputMin = document.getElementById('timeInputMin').value
  let DateInput = document.getElementById('dateInput').value
  let request = {
    origin: Origin,
    destination: Destination,
    travelMode: 'DRIVING',
    region: 'IE',
  }
  directionsService.route(request, (response, status) => {
    // Make order details summary
    if (status === 'OK' && TimeInputHr && TimeInputMin && DateInput) {
      directionsDisplay.setDirections(response)
      let visible = `
        <div class="col-12" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-duration="1500">
            <h1 class="page-heading mt-5 active d-block" id="order-details">Booking Information</h1>
        </div>
        `
      document.getElementById('order-details').innerHTML = visible
    } else if (status === 'NOT_FOUND' && Origin === '') {
      window.alert('Missing pick-up location.')
    } else if (status === 'NOT_FOUND' && Destination === '') {
      window.alert('Missing destination location.')
    }
    // If request is failed for any reason - user cannot move forward with booking
    else {
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
async function geocodeData() {
  let originLocation = document.getElementById('origin').value
  let destinationLocation = document.getElementById('destination').value
  let TimeInputHr = document.getElementById('timeInputHr').value
  let TimeInputMin = document.getElementById('timeInputMin').value
  let DateInput = document.getElementById('dateInput').value

  // Geocode for origin location with validation
  if (
    originLocation === '' ||
    destinationLocation === '' ||
    TimeInputMin === '' ||
    TimeInputHr === '' ||
    DateInput === ''
  ) {
    return false
  } else {
    await axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: originLocation,
          key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
        },
      })
      .then((response) => {
        // Formatted Origin address
        const formattedOrigin = response.data.results[0].formatted_address
        let formattedOrgOutput = `
                  <h4>Origin:</h4>
                      <ul class="list-group">
                          <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedOrigin}</li>
                      </ul>
                      `
        document.getElementById('formatted-address-origins').innerHTML =
          formattedOrgOutput
      })
      .catch((error) => {
        console.log(error.response)
      })

    // Geocode Destination
    await axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: destinationLocation,
          key: 'AIzaSyA5r2j07Re55oPPzjJczUaC_R5O8gLtvkY',
        },
      })
      .then((response) => {
        // Formatted Destination address
        const formattedDestination = response.data.results[0].formatted_address
        let formattedDestOutput = `
              <h4>Destination:</h4>
                  <ul class="list-group">
                      <li class="list-group-item list-group-item-secondary text-dark text-center">${formattedDestination}</li>
                  </ul>
                  `
        document.getElementById('formatted-address-destination').innerHTML =
          formattedDestOutput
      })
      .catch((error) => {
        console.log(error.response)
      })
  }
}

//========== Display Time and Date preferences on the HTML page
function timeDate() {
  let dateInput = document.getElementById('dateInput').value
  let timeHr = document.getElementById('timeInputHr').value
  let timeMin = document.getElementById('timeInputMin').value
  // Date
  if (document.querySelector('#dateInput').value === '') {
    date = null
    window.alert('You must choose a date')
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
    window.alert('You must choose an hourly time')
  } else if (document.getElementById('timeInputMin').value === '') {
    time = null
    window.alert('You must choose at what minute they would like to depart at')
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
  location.reload()

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
                <a class="btn btn-light" href="maps.html">
                    CANCEL
                </a>
            </div>
            <div class="col-xs-12 col-md-6 mx-auto mb-3 text-center justify-content-center" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-delay="500" data-aos-duration="1500">
                <a class="btn btn-light" href="specsForm.html">
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
  localStorage.setItem(
    'destination',
    document.getElementById('destination').value
  )
  localStorage.setItem('date', document.getElementById('dateInput').value)
  localStorage.setItem(
    'time',
    document.getElementById('timeInputHr').value +
      ':' +
      document.getElementById('timeInputMin').value
  )
}
