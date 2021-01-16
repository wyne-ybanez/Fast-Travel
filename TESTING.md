#Tests 

## Bug encounters: 

### Pan and Zoom marker effect

(i) After following Google Docs for the pan and zoom effect on the markers. Clicking on the markers did not cause the event to happen

(ii) Trying to add a marker to user's current location. After panning to it, marker does not appear 

(iii) Server error response comes early before the user can set a orgin/destination point on the map stating error 
`DIRECTIONS_ROUTE: NOT_FOUND: There was an issue performing a Directions request` 

(iv) The directions will automatically render the route without the user pressing the submit button, submit button is inactive:

Bug Fixed via solution: 

`  document.getElementById('submit').addEventListener('click', () => {`
        `DisplayRoute(directionsService, directionsDisplay);`
    `});`

