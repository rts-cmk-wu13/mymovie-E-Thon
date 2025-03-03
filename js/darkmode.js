
let rootElm = document.documentElement; // document element kører før noget bliver valideret
let switchElm = document.querySelector("#switch");
let isDarkMode = readFromLocalStorage("isDarkMode");
let browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
// laves for at vi kan tjekke, hvilken preference brugeren har (dark el. light mode). Retunerer false eller true. 
// Skal stemme overens med, hvad vi tjekker fra local storage (isDarkMode)
console.log("Matchmedia is dark", browserDark);
console.log("LocalStorage is dark", isDarkMode);


let darkState = null


if (isDarkMode == null) {
    darkState = browserDark;
} else {
    darkState = isDarkMode;
}
if(darkState){
    switchElm.checked = true; // laver et udgangspunkts i checkboxens afkrydsning, hvis dark mode er på
    rootElm.setAttribute("data-dark", switchElm.checked);
} else {
    switchElm.checked = false; // laver et udgangspunkts i checkboxens afkrydsning, hvis light mode er på
    rootElm.setAttribute("data-dark", switchElm.checked);
}


switchElm.addEventListener("change", switchTheme);
function switchTheme(){
    saveToLocalStorage("isDarkMode", switchElm.checked);
    
    if(switchElm.checked){
        rootElm.setAttribute("data-dark", switchElm.checked);
    } else {
        rootElm.setAttribute("data-dark", switchElm.checked);
    }
};
