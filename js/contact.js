const menuToggle = document.querySelector('.toggle');
const contactForm = document.querySelector('.contactForm');


menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  contactForm.classList.toggle('active');
})