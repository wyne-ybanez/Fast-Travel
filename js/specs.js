//========== Variables
const specsForm = document.querySelector('.specsForm');

//========== Input fields
let inputs = [
  document.getElementById('name'),
  document.getElementById('email'),
  document.getElementById('Vehicle'),
  document.getElementById('Music'),
  document.getElementsByName("radioBtn")
]

const name = document.getElementById('name');
const email = document.getElementById('email');
const vehicle = document.getElementById('Vehicle');
const music = document.getElementById('Music');
const payment_method = document.getElementsByName("radioBtn"); 
const submit = document.getElementById('submit');

const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.toggle');

//========== Event Listeners
submit.addEventListener('click', bookingSummary);
submit.addEventListener('click', specsSummary);

//========== Menu toggle event listener
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  specsForm.classList.toggle('active');
})

//========== Give local storage new specs data info on submit
function specsSummary(){

  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');
  let vehicle = localStorage.getItem('vehicle');
  let music = localStorage.getItem('music');
  let payment = localStorage.getItem('payment');
};

//========== Show local sotrage data of booking details and display them on page
// Dcode Local storage code used and eddited: https://www.youtube.com/watch?v=k8yJCeuP6I8&ab_channel=dcode
function bookingSummary(){

  let origin = localStorage.getItem('origin');
  let destination = localStorage.getItem('destination');
  let date = localStorage.getItem('date');
  let time = localStorage.getItem('time');

  let orderSummary = `
          <ul class="list-group">     
            <h2>Origin:</h2>
                <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${origin}</li>  
                  <br>  
            <h2>Destination:</h2> 
                <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${destination}</li> 
                  <br>   
            <h2>Date:</h2>        
                <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${date}</li>  
                  <br>   
            <h2>Time:</h2>          
                <li class="list-group-item list-group-item-action bg-secondary text-light text-center">${time}</li>
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