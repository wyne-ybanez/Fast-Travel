# Tests 

## Bug encounters: 

(i) After following Google Docs for the pan and zoom effect on the markers. Clicking on the markers did not cause the event to happen

(ii) Trying to add a marker to user's current location. After panning to it, marker does not appear 

  Bug Fixed

    - Solution: 
  - Describing the position of the user and containing it within a constant variable,    

      `  (position) => {`
        `  const pos = {`
           ` lat: position.coords.latitude,`
           ` lng: position.coords.longitude,`
          ` } `
    
    - Adding a marker to the constant variable 

           ` const marker = new google.maps.Marker({`
           ` position: pos,`
           ` map: map,`
          `})`

(iii) Server error response comes early before the user can set a orgin/destination point on the map stating error 
`DIRECTIONS_ROUTE: NOT_FOUND: There was an issue performing a Directions request` 

Bug Fixed 
- Solution: 
- Added a click event to initialize the function once submit button is clicked 

   ` document.getElementById('submit').addEventListener('click', () => {`
   ` DisplayRoute(directionsService, directionsDisplay);`
   `}`

(iv) The directions will automatically render the route without the user pressing the submit button, submit button is inactive:

Bug Fixed

- Solution: 

`  document.getElementById('submit').addEventListener('click', () => {`
        `DisplayRoute(directionsService, directionsDisplay);`
    `});`

(v) Bug where the Geocode data was not displaying. 

Bug Fixed: 

- Solution: Went go Google Developer Console and attached the appropriate required IP address as a referral for the API key
- [Stack Overflow Solution](https://stackoverflow.com/questions/48189532/get-request-with-axios-returning-undefined)
- New error handling message: 
      ` if (response.data.status === 'REQUEST_DENIED'){`
           ` window.alert('You do not have permission to use this API key - Booking location details will not be shown');`
            `console.log(response.data.status);`
       ` }`

(vi) Geocode information for origin and destination after pressing submit is not appearing `Error Uncaught TypeError: Cannot read property 'addEventListener' of null at maps.js:280`

Bug Fixed

- Solution: Set the `locationForm` variable to listen for a click 'submit' event
 
 `let locationForm = document.getElementById('submit');`
`locationForm.addEventListener('click', geocodeData);` 

(vi) Bug found where a route will display even when it's not on the same country - won't stick to the same region
    [Screenshot of bug](assets/img/country-bug.png)


(vii) Bug: The on click event to display results for the date and time input is not outputting on the the HTML page: 
    [Screenshot of Date Bug](assets/img/date-bug.png)


  `function timeDate(){`
   ` let dateInput = document.getElementById('dateInput').value;`
    `if (dateInput === document.getElementById('dateInput').value) {`
        `let date = `
           ` <div class="col-6">`
               ` <h4>Date:</h4>`
            `</div>`
           ` <li class="list-group-item list-group-item-dark">${dateInput}</li>`
        `document.getElementById('dateInput').innerHTMl = date;`
   ` }`
  ` console.log(dateInput);`
`}`

  Fix: 

changed the query selector specified Id to the correct Id within the html page

` document.querySelector('#date').innerHTML = date;`

(viii) Bug (Fixed): Geolocation feature for current location no longer functioning after styling the header for the navigation menu. Displays a success message however, shows no results
      Solution: Developer's own device was not registering chrome as enabled for location services. Security system automatically disabled every unrecognised user location request. Went
      to security & privacy settings, allowed Google Chrome to obtain device location.

(ix) Bug: Answering all input fields and pressing submit resets the entire map and voids all input fields. It could be due to an event listener placed incorrectly

    Solved using the following code in maps.html: 
  ` <form name="booking-form" onsubmit="return false;"> ` 
  [Stack Overflow solution](https://stackoverflow.com/questions/40813467/html-reset-after-form-submit)
