const aboutSection = document.querySelector('.about-section');
const menu = document.querySelector('.menu');
const menuToggle = document.querySelector('.toggle');

//========== Menu toggle event listener
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    aboutSection.classList.toggle('active');
  })

