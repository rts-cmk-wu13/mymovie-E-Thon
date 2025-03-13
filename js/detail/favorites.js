function favorites () {
let favorites = readFromLocalStorage("favorites") || [];
let favoriteIcon = appartment.querySelector("i");
let currentId = favoriteIcon.dataset.favid;

sectionElm1
      .querySelectorAll(".movie__div")
      .forEach((button) => {
        let icon = button.querySelector("i");
        let currentId = icon.dataset.favid;
        if (favorites.includes(currentId)) {
          icon.classList.add("fa-solid");
          icon.classList.remove("fa-regular");
          icon.style.color = "red";
        }
        button.addEventListener("click", function (event) {
          if (favorites.includes(currentId)) {
            favorites = favorites.filter((id) => id != currentId);
            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");
            icon.style.color = "black";
          } else {
            favorites.push(currentId);
            icon.classList.add("fa-solid");
            icon.classList.remove("fa-regular");
            icon.style.color = "red";
          }
          saveToLocalStorage("favorites", favorites);
        });
      });

    sectionElm.appendChild(destinationElm);
    document.querySelector("#root").append(sectionElm);
;

    if (favorites.includes(currentId)) {
      favoriteIcon.classList.add("fa-solid");
      favoriteIcon.classList.remove("fa-regular");
      favoriteIcon.style.color = "red";
    }
    // Handle the favorite button click event
    favoriteIcon.addEventListener("click", function () {
      if (favorites.includes(currentId)) {
        favorites = favorites.filter((id) => id != currentId);
        favoriteIcon.classList.remove("fa-solid");
        favoriteIcon.classList.add("fa-regular");
        favoriteIcon.style.color = "black";
      } else {
        favorites.push(currentId);
        favoriteIcon.classList.add("fa-solid");
        favoriteIcon.classList.remove("fa-regular");
        favoriteIcon.style.color = "red";
      }
      saveToLocalStorage("favorites", favorites);
    });
}