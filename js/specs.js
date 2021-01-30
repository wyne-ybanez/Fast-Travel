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
              <h2 class="headings">Name:</h2>
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${name}</li>  
                    <br>
              <h2 class="headings">Email:</h2>
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${email}</li>  
                    <br>
              <h2 class="headings">Origin:</h2>
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${origin}</li>  
                    <br>  
              <h2 class="headings">Destination:</h2> 
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${destination}</li> 
                    <br>   
              <h2 class="headings">Date:</h2>        
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${date}</li>  
                    <br>   
              <h2 class="headings">Time:</h2>          
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${time}</li>
                    <br>
              <h2 class="headings">Payment-Method:</h2>          
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${payment}</li>
                    <br>
              <h2 class="headings">Vehicle selected:</h2>
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${vehicle}</li>  
                    <br>
              <h2 class="headings">Music selected:</h2>
                  <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${music}</li>  
                    <br>       
            </ul>    
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
}




//========== Sending Email Summary 
// function sendMail(specsForm){
//   emailjs.send("gmail","wyne", {
//       // the name, email and specifications from form
//       "from_name": specsForm.name.value,
//       "from_email": specsForm.email.value,
//       "Vehicle": specsForm.Vehicle.value,
//       "Music": specsForm.Music.value,
//       "Payment-method": specsForm.paymentMethod.value
//   })
//   // emailjs.send.then promise
//   .then(
//       function(response) {
//           console.log("SUCCESS", response);
//       }, 
//       function(error){
//           console.log("FAILED", error);
//       })
//   return false;
// };