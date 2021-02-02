const menuToggle = document.querySelector('.toggle')
const landing = document.querySelector('.landing')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  landing.classList.toggle('active')
})
