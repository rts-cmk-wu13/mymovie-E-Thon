let rootElm = document.documentElement; // document element kører før noget bliver valideret
let switchElm = document.querySelector("#switch");
let isDarkMode = readFromLocalStorage("isDarkMode");
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// laves for at vi kan tjekke, hvilken preference brugeren har (her tjekkes dark mode).
// .matches retunerer false eller true.
console.log("Matchmedia is dark", browserDark);
// Skal stemme overens med, hvad vi tjekker fra local storage (isDarkMode)
// ... derfor laves darkState
console.log("LocalStorage is dark", isDarkMode);

let darkState = null;
let movieIcon = document.querySelector(".nav__img--movieicon img");

//! udgangspunkt for dark/light mode:
if (isDarkMode == null) {
  darkState = browserDark;
} else {
  darkState = isDarkMode;
}
if (darkState) {
  switchElm.checked = true; // laver et udgangspunkts i checkboxens afkrydsning (afkrydset), hvis dark mode er på
  rootElm.setAttribute("data-dark", switchElm.checked);
  // sætter data-dark="true", hvis checkboxen er afkrydset
  movieIcon.setAttribute("src", "./img/movieicon-dark.svg")
} else {
  switchElm.checked = false; // laver et udgangspunkts i checkboxens afkrydsning (ikke afkrydset), hvis light mode er på
  rootElm.setAttribute("data-dark", switchElm.checked);
  // sætter data-dark="false", hvis checkboxen ikke er afkrydset
  movieIcon.setAttribute("src", "./img/movieicon-light.svg")
}


//! Dark/Light mode skift, når der afkrydses (switches)
switchElm.addEventListener("change", switchTheme);

function switchTheme() {
  saveToLocalStorage("isDarkMode", switchElm.checked);
  // gemmer i local storage, hvorvidt checkboxen er afkrydset eller ej
  
  if (switchElm.checked) {
    rootElm.setAttribute("data-dark", switchElm.checked);
    // sætter data-dark="true el. false" alt efter om checkboxen er afkrydset eller ej
    movieIcon.setAttribute("src", "./img/movieicon-dark.svg")
    
  } else {
    rootElm.setAttribute("data-dark", switchElm.checked);
    // gør det samme som ovenfor - skole eksempel
    movieIcon.setAttribute("src", "./img/movieicon-light.svg")
  }
}

console.log(movieIcon);