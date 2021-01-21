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


(vii) The on click event to display results for the date and time input is not outputting on the the HTML page: 
    [Screenshot of Date Bug](assets/img/date-bug.png)

  Bug: 
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



