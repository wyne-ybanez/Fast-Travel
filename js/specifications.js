//========== Variables
const specsForm = document.querySelector('.specsForm')

const name = document.getElementById('name')
const email = document.getElementById('email')
const vehicle = document.getElementById('Vehicle')
const music = document.getElementById('Music')
const payment_method = document.getElementsByName('radio')
const submit = document.getElementById('submit')

const menu = document.querySelector('.menu')
const menuToggle = document.querySelector('.toggle')

//========== Input fields
let inputs = [
  document.getElementById('name'),
  document.getElementById('email'),
  document.getElementById('Vehicle'),
  document.getElementById('Music'),
  document.getElementsByName('radioBtn'),
]

//========== Event Listeners
submit.addEventListener('click', bookingSummary)
submit.addEventListener('click', ValidateEmail)
submit.addEventListener('click', () => {
  setTimeout(ScrollFunc, 300)
})

//========== Menu toggle event listener
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  specsForm.classList.toggle('active')
})

//========== Validate User's emai address
function ValidateEmail(email) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(specifications.email.value)) {
    window.alert("You have entered a valid email address!"); 
    return true;
  } else {
    alert("You have entered an invalid email address!"); 
    return false;
  }
}

//========== Show local storage data of booking details and display them on page
function bookingSummary() {
  localStorage.setItem('name', document.getElementById('name').value)
  localStorage.setItem('email', document.getElementById('email').value)
  localStorage.setItem('vehicle', document.getElementById('Vehicle').value)
  localStorage.setItem('music', document.getElementById('Music').value)

  // Get radio btn value if checked
  for (i = 0; i < payment_method.length; i++) {
    if (payment_method[i].checked) {
      document.getElementsByName('radio') === payment_method[i].value
      localStorage.setItem('payment', payment_method[i].value)
    }
  }

  // Get Local Storage of all Data
  let name = localStorage.getItem('name')
  let email = localStorage.getItem('email')
  let vehicle = localStorage.getItem('vehicle')
  let music = localStorage.getItem('music')
  let payment = localStorage.getItem('payment')
  let origin = localStorage.getItem('origin')
  let destination = localStorage.getItem('destination')
  let date = localStorage.getItem('date')
  let time = localStorage.getItem('time')

  // Output to HTML on submit
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
                <a id="confirm" class="btn btn-dark" onsubmit="return sendMail(this);">EMAIL CONFRIMATION</a>
              </div>
            </div>
          `
  // Reactive Page height
    if(ValidateEmail == false || 
      inputs[0].value === '' ||
      inputs[1].value === '' ||
      inputs[2].value === '' ||
      inputs[4].value === '' 
    ) {
        document.getElementById('summary').innerHTML = null
        specsForm.classList.remove('height')
        menu.classList.remove('height')
        window.alert('You must have a valid answer for all input fields')
    } else {
      document.getElementById('summary').innerHTML = orderSummary
      specsForm.classList.toggle('height')
      menu.classList.toggle('height')
    }
  // Send Email a confirmation of order
  const confirm = document.getElementById('confirm')
  confirm.addEventListener('click', sendMail)
  }


//========== Scroll to summary section
function ScrollFunc() {
  window.scrollTo(0, 800)
}

// ========== Sending Email Confirmation
function sendMail(){
  // Generate order number 
  let now = Date.now().toString() // '1492341545873'
  now += now + Math.floor(Math.random() * 10)
  let orderNo = [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-')
  window.alert('Your confirmation email will arrive shortly')

  //Get Local Storage of all Data
  let name = localStorage.getItem('name')
  let email = localStorage.getItem('email')
  let vehicle = localStorage.getItem('vehicle')
  let music = localStorage.getItem('music')
  let payment = localStorage.getItem('payment')
  let origin = localStorage.getItem('origin')
  let destination = localStorage.getItem('destination')
  let date = localStorage.getItem('date')
  let time = localStorage.getItem('time')

  // Booking form info
  emailjs
    .send('gmail', 'wyne', {
      order_number: orderNo,
      from_name: name,
      from_email: email,
      from_location: origin,
      to_location: destination,
      time: time,
      date: date,
      vehicle: vehicle,
      music: music,
      payment_method: payment,
    })
    // emailjs.send.then promise
    .then(
      function (response) {
        window.alert('Order Summary Sent 👍')
        console.log('SUCCESS', response)
      },
      function (error) {
        window.alert('Order Summary failed to send 😔')
        console.log('FAILED', error)
      }
    )
  return false
}
