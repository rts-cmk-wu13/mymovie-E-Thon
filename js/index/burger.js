const menu = document.querySelector(".header__links");
const burger = document.querySelector(".header__burger");

burger.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";
  } else {
    menu.style.display = "none";
}
}
