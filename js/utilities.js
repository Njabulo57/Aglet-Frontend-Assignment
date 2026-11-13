const burgerMenu = document.querySelector('.burger-menu');
const mobileLinks = document.querySelector(".nav-links-mobile");


burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('open');
    mobileLinks.classList.toggle('show');
});