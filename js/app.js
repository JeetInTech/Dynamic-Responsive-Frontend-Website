const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu (toggle is-active class)
const mobileMenu = () => {
  // Only toggle the mobile menu on screens <= 768px
  if (window.innerWidth <= 768) {
    menu.classList.toggle('is-active'); // Toggles the hamburger icon animation
    menuLinks.classList.toggle('active'); // Toggles the visibility of the menu
  }
};

menu.addEventListener('click', mobileMenu);

// Close mobile menu when resizing to a larger screen
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    menu.classList.remove('is-active'); // Remove hamburger icon animation
    menuLinks.classList.remove('active'); // Hide the mobile menu
  }
});

// Show active menu when scrolling (highlight based on scroll position)
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const servicesMenu = document.querySelector('#services-page');
  const scrollPos = window.scrollY;

  // Highlight menu items based on scroll position (only on large screens)
  if (window.innerWidth > 960) {
    if (scrollPos < 600) {
      homeMenu.classList.add('highlight');
      aboutMenu.classList.remove('highlight');
      servicesMenu.classList.remove('highlight');
    } else if (scrollPos < 1400) {
      aboutMenu.classList.add('highlight');
      homeMenu.classList.remove('highlight');
      servicesMenu.classList.remove('highlight');
    } else if (scrollPos < 2345) {
      servicesMenu.classList.add('highlight');
      aboutMenu.classList.remove('highlight');
      homeMenu.classList.remove('highlight');
    }
  }

  // Remove highlight when screen is resized below 960px (mobile or small screen)
  if (elem && window.innerWidth < 960) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close mobile menu when clicking on a menu item or the logo
const hideMobileMenu = () => {
  if (window.innerWidth <= 768 && menu.classList.contains('is-active')) {
    menu.classList.remove('is-active'); // Hide hamburger icon animation
    menuLinks.classList.remove('active'); // Hide the mobile menu
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

// Animate letters in hero section
document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".hero__description span");
  letters.forEach((letter, index) => {
    letter.style.setProperty("--delay", index); // Assign delay dynamically for each letter
  });
});
