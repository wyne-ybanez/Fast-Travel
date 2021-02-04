# Tests 

## Website Testing: 

### Navigation Menu

- When hover the cursor changes to a pointer
- When clicked the toggler changes from a humburger menu to an 'X'
- After clicking the page moves left and displays the navigation menu 
- The navigation menu shows the list 
- Clicking on the list forwards the user to the appropriate pages

### Landing Page 

- Clicking on "Book" brings to the user to the appropriate page
- Clicking on "About" brings the user to the apprpriate 'How It Works' page
- The background video plays automatically plays once the user enters the landing page

### Booking Page

- Text predictions are present in both 'origin' and 'destination' inputs
- Time inputs display both the max number of hours and the number of minutes in multiples of 5 
- The date input can be accessed appropriately and pressing on "today" uses the current date
- Page expands when the clicking submit 
- Page will not expand if the required input fields are not answered correctly
- Booking summary displays the values provided in the input fields

### Map

- The map pans and zooms towards the specified locations once the values have been inputted
- The map zooms to the user's current location when 'current location' is clicked - geolocating their device
- A route in red is displayed between the origin location and the destination

### Specifications Form

- Specification form required inputs are working as intended and will not continue if certain inputs are missing 
- Clicking on 'Submit' will expand the page and display the order summary gathered from local storage
- Clicking on 'Cancel' will bring the user back to the booking form 
- Clicking on 'Email Confirmation' will send an email to the designated email

### About 

- About animation effects are working appropriately on the headings 
- Clicking on 'Book' brings the user to the booking form

### Customer Service 

- Customer Service form required inputs are working as intended 
- Form will not send if one of the input fields has no value 
- Clicking on 'Submit' will issue a confirmation email to the user's desingated email address
- Clicking on 'Cancel' will direct the user to index.html

## Bug encounters: 

### 1. Marker Pan and Zoom after route display

 <strong>(i)</strong> After following Google Docs for the pan and zoom effect on the markers. Clicking on the markers did not cause the event to happen. ie. Pressing on 'A' or 'B' shows the address through an info window however, the map will not pan or zoom to the markers once the route has been established. It will only do so if the markers are out of sight

 <strong>(ii)</strong> Attempted to solve this issue with the following code under numerous functions:

      `marker.addListener('click', () => { 
          infowindow.open(map, marker)
          map.setZoom(13)
          map.setCenter(marker.getPosition())
       })`
  
<strong>Conclusion:</strong> The issue is still present

### 2. Marking the user's current location

 <strong>(i)</strong> Trying to add a marker to user's current location. After panning to it, marker does not appear, just the infowindow. 

 <strong>(ii)</strong> Bug Fixed through the following solution: 

  - Describing the position of the user and containing this data within a constant variable named 'pos':    

        `const pos = {`
           lat: position.coords.latitude,
           lng: position.coords.longitude,
           }`
    
  - Then add a marker to the constant variable: 

         `const marker = new google.maps.Marker({
            position: pos,
            map: map,
           })`
           
<strong>Conclusion:</strong> Issue solved

### 3. Server Error Response comes early before the user can set a orgin/destination point

 <strong>(i)</strong> The error message is displayed prior to the user having made a complete request ie. both origin and destination have not yet been established and a request is made.

- Error message: `DIRECTIONS_ROUTE: NOT_FOUND: There was an issue performing a Directions request` 

 <strong>(ii)</strong> Bug Fixed through the following solution: 
 
- Added a click event to initialize the function once submit button is clicked 

   `document.getElementById('submit').addEventListener('click', () => 
    {DisplayRoute(directionsService, directionsDisplay);
    }`
  
<strong>Conclusion:</strong> Issue solved

### 4. Directions route is automatically displayed

 <strong>(i)</strong> The map will automatically render the route without the user clicking the 'submit' button.

 <strong>(ii)</strong> Bug Fixed through the following solution:

- Adding an onclick event handler to the submit button which will trigger a function to display a route: 

  `document.getElementById('submit').addEventListener('click', () => {
        DisplayRoute(directionsService, directionsDisplay);
    })`

<strong>Conclusion:</strong> Issue solved

### 5. Geocode Data not displayed due to API key restrictions

 <strong>(i)</strong> Bug where the Geocode data was not displaying once 'submit' was clicked in the booking page, although, the page would still expand.

 <strong>(ii)</strong> Bug Fixed through the following solution:

- I went go Google Developer Console and attached the appropriate required IP address as a referral for the API key
- [Stack Overflow Solution](https://stackoverflow.com/questions/48189532/get-request-with-axios-returning-undefined)
- New error handling message: 
  
      `if(response.data.status === 'REQUEST_DENIED'){
            window.alert('You do not have permission to use this API key - Booking location details will not be shown');
            console.log(response.data.status);
        }`

- The restrictions for this API key has now been changed and is open for this project, specifically, for Geocoding purposes. 

<strong>Conclusion:</strong> Issue solved

### 6. Geocode Data not displayed due to even handler

 <strong>(i)</strong> Geocode information for origin and destination after clicking 'submit' is not appearing, it displays the following error:

  `Error Uncaught TypeError: Cannot read property 'addEventListener' of null at maps.js:280`

 <strong>(ii)</strong> Bug Fixed through the following solution:

- Set the `locationForm` variable to listen for a click 'submit' event:
 
  `let locationForm = document.getElementById('submit');`

  `locationForm.addEventListener('click', geocodeData);` 

<strong>Conclusion:</strong> Issue solved

### 7. Directions route is displayed despite not being in the same region

 <strong>(i)</strong> Bug found where a route will display even when it's not on the same country - won't stick to the same region
    [Screenshot of bug](assets/img/country-bug.png)

 <strong>(ii)</strong> Attempted to fix the bug through the following code in the function 'DisplayRoute' - it shows that I tried to change the region of the request to be made solely for the country of Ireland: 
  
  `let request = {
    origin: Origin,
    destination: Destination,
    travelMode: 'DRIVING',
    region: 'IE',
    }`

<strong>Conclusion:</strong> Issue is still present

### 8. Date and Time inputs are not displaying on the page

 <strong>(i)</strong> The on click event to display results for the date and time input is not outputting on the the HTML page. 
 
 - [Screenshot of Date Bug](assets/img/date-bug.png)

 <strong>(ii)</strong> Bug Fixed through the following solution: 

 - changed the query selector specified Id to the correct Id within the html page
 - `document.querySelector('#date').innerHTML = date;`

<strong>Conclusion:</strong> Issue solved

### 9. Geolocation feature stopped working

 <strong>(i)</strong> Geolocation feature for current location no longer functioning after styling the header for the navigation menu. It displays a success message however, it shows no results.

 <strong>(ii)</strong> Discoveries: Developer's own device was not registering chrome as enabled for location services. Security system automatically disabled every unrecognised user location request. Went to security & privacy settings, allowed Google Chrome to obtain device location.

  - A new warning alert has been implemented for this issue: 

  `window.alert(
      'Your request failed :( \nPlease be specfic, keep requests to the same country and check your permissions. 
      \nFailure status: ' + status
      )`

<strong>Conclusion:</strong> Issue solved

### 10. Submission Page reset

 <strong>(i)</strong> Answering all input fields and pressing submit resets the entire map and voids all input fields. 

 <strong>(ii)</strong> Bug fixed using the following code in maps.html: 

  - `<form name="booking-form" onsubmit="return false;">` 
  - [Stack Overflow solution](https://stackoverflow.com/questions/40813467/html-reset-after-form-submit)
  
<strong>Conclusion:</strong> Issue solved

### 11. Specification form validation stopping EmailJS

 <strong>(i)</strong> Specifications form will not validate inputs despite browser "required" annotation within the element. Clicking submit does not continue with EmailJS request.

 <strong>(ii)</strong> This bug has been fixed through the following:

  - The page will no longer reset once the 'submit' button has been clicked `onsubmit="return false"`
  - A 'sendEmail' function has been created and implemented in the 'bookingSummary' function.
  - A confirmation button is available once the function 'bookingSummary' is called. 
  - The function 'sendEmail' will be triggered once the user clicks to 'confirm' their order:
  
    `const confirm = document.getElementById('confirm')`

    `confirm.addEventListener('click', sendMail)`

  - Please check specs.js for these functions

<strong>Conclusion:</strong> Issue solved

### 12. Local Storage Undefined error

 <strong>(i)</strong> Unable to output local storage object onto html page - [Screenshot of Local Storage Bug](assets/img/LocalStorage-bug.png)
 
 <strong>(ii)</strong> Bug Fixed by changing local storage object value into string values. In maps.html the following code is used to store the data and then retrieve it to output onto the page:

  - Example: `localStorage.setItem('origin', document.getElementById('origin').value)`
  
  - Retrieving the data example: `let origin = localStorage.getItem('origin')`

 <strong>Conclusion:</strong> Issue solved


