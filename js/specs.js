//========== Variables
const specsForm = document.querySelector('.specsForm');

const name = document.getElementById('name');
const email = document.getElementById('email');
const vehicle = document.getElementById('Vehicle');
const music = document.getElementById('Music');
const payment_method = document.getElementsByName("radio"); 
const submit = document.getElementById('submit');

const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.toggle');

//========== Input fields
let inputs = [
  document.getElementById('name'),
  document.getElementById('email'),
  document.getElementById('Vehicle'),
  document.getElementById('Music'),
  document.getElementsByName("radioBtn")
]

//========== Event Listeners
submit.addEventListener('click', bookingSummary);
submit.addEventListener('click', () => {
  setTimeout(ScrollFunc, 300);
});


//========== Menu toggle event listener
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  specsForm.classList.toggle('active');
})

//========== Show local sotrage data of booking details and display them on page
// Dcode Local storage code used and eddited: https://www.youtube.com/watch?v=k8yJCeuP6I8&ab_channel=dcode
function bookingSummary(){

  // Set Local Storage for accessing Specifications data
  localStorage.setItem("name", document.getElementById('name').value);
  localStorage.setItem("email", document.getElementById('email').value);
  localStorage.setItem("vehicle", document.getElementById('Vehicle').value);
  localStorage.setItem("music", document.getElementById('Music').value);;
  console.log(localStorage);

  // Get radio btn value if checked
  for (i=0;i<payment_method.length;i++){
    if (payment_method[i].checked){
        document.getElementsByName("radio") === payment_method[i].value;
        localStorage.setItem("payment", payment_method[i].value);
    }
  }

// Get Local Storage of all Data
  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');
  let vehicle = localStorage.getItem('vehicle');
  let music = localStorage.getItem('music');
  let payment = localStorage.getItem('payment');
  let origin = localStorage.getItem('origin');
  let destination = localStorage.getItem('destination');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');

  // Output to HTML on submit 
  // Re-arrange info on the basis of importance
  let orderSummary = `
          <h1 class="page-heading" data-aos="fade-right" data-aos-anchor-placement="right-left" data-aos-duration="1500">
              Order Summary
          </h1>
            <ul class="list-group">  
              <h2 class="display-6">Name:</h2>
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${name}</li>  
                    <br>
              <h2 class="display-6">Email:</h2>
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${email}</li>  
                    <br>
              <h2 class="display-6">Origin:</h2>
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${origin}</li>  
                    <br>  
              <h2 class="display-6">Destination:</h2> 
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${destination}</li> 
                    <br>   
              <h2 class="display-6">Date:</h2>        
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${date}</li>  
                    <br>   
              <h2 class="display-6">Time:</h2>          
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${time}</li>
                    <br>
              <h2 class="display-6">Payment-Method:</h2>          
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${payment}</li>
                    <br>
              <h2 class="display-6">Vehicle selected:</h2>
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${vehicle}</li>  
                    <br>
              <h2 class="display-6">Music selected:</h2>
                  <li class="list-group-item list-group-item-action list-group-item-secondary text-dark text-center">${music}</li>  
                    <br>       
            </ul>    

            <div class="row">
              <div class="col-12 text-center justify-content-center submit-btn mt-3">
                <div class="form-text text-secondary">* This may take a moment to load *</div>
                <button id="confirm" type="button" class="btn btn-dark" value="CONFIRM" onsubmit="return sendMail(this);">EMAIL CONFRIMATION</button>
              </div>
            </div>
          ` 
  // Reactive Page height
  for(i=0; i<inputs.length; i++) {
      if (inputs[i].value === '' || inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '' || inputs[3].value === '' || inputs[4].value === ''){
          document.getElementById('summary').innerHTML = null; 
          specsForm.classList.remove('height');
          menu.classList.remove('height');
      } else {
          document.getElementById('summary').innerHTML = orderSummary;
          specsForm.classList.toggle('height');
          menu.classList.toggle('height');
      }
  }

  // Send Email a confirmation of order
  const confirm =  document.getElementById('confirm');
  confirm.addEventListener('click', sendMail);
}

//========== Scroll to summary section
function ScrollFunc(){
  window.scrollTo(0, 800);
}    

// ========== Sending Email Summary 
function sendMail(){

  //Get Local Storage of all Data
  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');
  let vehicle = localStorage.getItem('vehicle');
  let music = localStorage.getItem('music');
  let payment = localStorage.getItem('payment');
  let origin = localStorage.getItem('origin');
  let destination = localStorage.getItem('destination');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');

  // Booking form info 
  emailjs.send("gmail","wyne", {
      "from_name": name,
      "from_email": email,
      "from_location": origin,
      "to_location": destination,
      "time": time,
      "date": date,
      "vehicle": vehicle,
      "music": music,
      "payment_method": payment
  })
  // emailjs.send.then promise
  .then(
      function(response) {
          window.alert('Order Summary Sent 👍')
          console.log("SUCCESS", response);
      }, 
      function(error){
          window.alert('Order Summary failed to send')
          console.log("FAILED", error);
      })
  return false;
};