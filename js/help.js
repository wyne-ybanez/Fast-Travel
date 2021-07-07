//========== This HTML page uses specs form template
const specsForm = document.querySelector('.specsForm')
const menuToggle = document.querySelector('.toggle')

//========== Menu toggle event listener 
// From Brad Traversy used and eddited: https://codepen.io/bradtraversy/pen/eYdMqvx
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  specsForm.classList.toggle('active')
})

//========== Submit Functions 
function sendMail() {
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const order = document.getElementById('order').value
  const message = document.getElementById('textarea').value

  // Form validation
  if (name || email || order || message == "" || null ){
    console.log('All form fields must be answered')
  } 
  else {
    window.alert(
      'Your message will process shortly. This may just take a minute or two...'
    )
  }

  // Booking form info
  emailjs
    .send('service_kj5u5qt', 'template_l2zzplc', {
      order_number: order,
      from_name: name,
      from_email: email,
      message: message,
    })
    // emailjs.send.then promise
    .then(
      function (response) {
        window.alert('Message was successfully sent 👍')
        reset();
        console.log('SUCCESS', response)
      },
      function (error) {
        window.alert('Message Failed 😔')
        console.log('FAILED', error)
      }
    )
  return false
}

function reset(){
  let inputs = [
    document.getElementById('name'),
    document.getElementById('email'),
    document.getElementById('order'),
    document.getElementById('textarea')
   ]

  for(i=0;i<inputs.length;i++){
    inputs[i].value='';
  }
}
