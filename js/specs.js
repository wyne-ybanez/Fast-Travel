//========== Input fields
const name = document.getElementById('name');
const email = document.getElementById('email');
const vehicle = document.getElementById('Vehicle');
const music = document.getElementById('Music');
const payment_method = document.getElementsByName("radioBtn"); 
const submit = document.getElementById('submit');

const menuToggle = document.querySelector('.toggle');
const specificationForm = document.querySelector('.specsForm');


//========== Menu toggle event listener
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  specificationForm.classList.toggle('active');
})

//========== Give local storage new data info on submit
submit.addEventListener('click', () => {
  let specData= {
          name: name.value,
          email: email.value,
          vehicle: vehicle.value,
          music: music.value,
          payment_method: payment_method.value
      };

  // Make it into a JSON string
  let specData_serialized = JSON.stringify(specData);
  localStorage.setItem("specData", specData_serialized);

  // Parse it into an object we can analyse
  let specObj_deserialized = JSON.parse(localStorage.getItem("specData"));
  console.log(specObj_deserialized);

  for(var i=0;i<payment_method.length;i++){
        payment_method[i].checked = true; // marking the required radio as checked
    }  
});



//========== Get Local storage Data of Booking page
let orderData = localStorage.getItem('localObj');

// make it JSON string and parse it again to create the object
let orderData_serialized = JSON.stringify(orderData);
let orderData_deserialized = JSON.parse(localStorage.getItem('localObj'));
console.log(orderData_deserialized);





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