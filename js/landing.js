const menuToggle = document.querySelector('.toggle')
const landing = document.querySelector('.landing')

//========== Menu toggle event listener 
// From Brad Traversy used and eddited: https://codepen.io/bradtraversy/pen/eYdMqvx
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  landing.classList.toggle('active')
})
