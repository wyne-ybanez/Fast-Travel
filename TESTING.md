#Tests 

## Bug encounters: 

### Pan and Zoom marker effect

(i) After following Google Docs for the pan and zoom effect on the markers. Clicking on the markers did not cause the event to happen

(ii) Trying to add a marker to user's current location. After panning to it, marker does not appear 

(iii) Server error response comes early before the user can set a orgin/destination point on the map stating error 
`DIRECTIONS_ROUTE: NOT_FOUND: There was an issue performing a Directions request` 

(iv) The directions will automatically render the route without the user pressing the submit button, submit button is inactive:

Bug Fixed

- Solution: 

`  document.getElementById('submit').addEventListener('click', () => {`
        `DisplayRoute(directionsService, directionsDisplay);`
    `});`

(v) Bug where the API data for geocode was not displaying. 

Bug Fixed: 

- Solution: Went go Google Developer Console and attached the appropriate required IP address as a referral for the API key

(vi) Geocode information for origin and destination after pressing submit is not appearing `Error Uncaught TypeError: Cannot read property 'addEventListener' of null at maps.js:280`

Bug Fixed

- Solution: Set the `locationForm` variable to listen for a click 'submit' event
 
 `let locationForm = document.getElementById('submit');`
`locationForm.addEventListener('click', geocodeData);` 

(vi) Bug found where a route will display even when it's not on the same country - won't stick to the same region
    [Screenshot of bug](assets/img/country-bug.png)



