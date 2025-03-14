function burger() {
const menu = document.querySelector(".header__links");
const burger = document.querySelector(".header__burger");
const upperBar = document.querySelector(".header__burger span:first-of-type")
const middleBar = document.querySelector(".header__burger span:nth-of-type(2)")
const lowerBar = document.querySelector(".header__burger span:last-of-type")

burger.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex";

    burger.style.justifyContent = "center"
    burger.style.rotate = "-17deg"
    burger.style.padding = "0"
    upperBar.style.rotate = "153.2deg"
    middleBar.style.rotate = "62deg"
    lowerBar.style.rotate = "153.2deg"
  } else {
    menu.style.display = "none";

    burger.style.justifyContent = "space-between"
    burger.style.rotate = "0deg"
    burger.style.padding = "0.25rem"
    upperBar.style.rotate = "0deg"
    middleBar.style.rotate = "0deg"
    lowerBar.style.rotate = "0deg"
}
}
}