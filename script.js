const button = document.querySelector(".menu-toggler");
const navbar_menu = document.querySelector(".navbar-menu");

button.addEventListener("click", ()=>{
    navbar_menu.classList.toggle("navbar-menu2");
})
button.addEventListener("click", ()=>{
    button.classList.toggle("menu-toggler2")
})


