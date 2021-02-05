const aboutSection = document.querySelector('.about-section')
const menu = document.querySelector('.menu')
const menuToggle = document.querySelector('.toggle')

//========== Menu toggle event listener 
// From Brad Traversy used and editted: https://codepen.io/bradtraversy/pen/eYdMqvx
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  aboutSection.classList.toggle('active')
})
