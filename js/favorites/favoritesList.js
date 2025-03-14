function favoritesList() {
    let favorites = readFromLocalStorage("favorites") || [];
    let bookmark = document.querySelectorAll(".movie__div i");
    console.log(bookmark);
    
    bookmark.forEach((icon) => {
      let currentId = icon.dataset.favid;
  
      // Hvis film allerede er favorit, vis det korrekt
      if (favorites.some((movie) => movie.id == currentId)) {
        icon.classList.add("fa-solid");
        icon.classList.remove("fa-regular");
      }
  
      // Håndter favorit-knap klik
      icon.addEventListener("click", function () {
        let movieTitle = icon.closest(".movie__div").querySelector("h1").innerText;
  
        let existingIndex = favorites.findIndex((movie) => movie.id == currentId);
  
        if (existingIndex !== -1) {
          // Hvis filmen er i favoritter, fjern den
          favorites.splice(existingIndex, 1);
          icon.classList.remove("fa-solid");
          icon.classList.add("fa-regular");
          icon.style.color = "black";
        } else {
          // Tilføj filmen som favorit
          favorites.push({ id: currentId, title: movieTitle });
          icon.classList.add("fa-solid");
          icon.classList.remove("fa-regular");
          icon.style.color = "red";
        }
  
        saveToLocalStorage("favorites", favorites);
      });
    });
  }
  
  // Hvis vi er på favorites.html, vis favoritter
  if (document.body.contains(document.querySelector(".favorites__list"))) {
    displayFavorites();
  }
  
  function displayFavorites() {
    let favorites = readFromLocalStorage("favorites") || [];
    let container = document.querySelector(".favorites__list");
  
    container.innerHTML = ""; // Ryd tidligere indhold
  
    if (favorites.length === 0) {
      container.innerHTML = "<p>No favorite movies yet.</p>";
      return;
    }
  
    favorites.forEach((movie) => {
      let div = document.createElement("div");
      div.className = "favorite-movie";
      div.innerHTML = `
        <h3>${movie.title}</h3>
        <button class="remove-fav" data-id="${movie.id}">Remove</button>
      `;
      container.appendChild(div);
    });
  
    // Håndter fjern-funktionalitet
    document.querySelectorAll(".remove-fav").forEach((btn) => {
      btn.addEventListener("click", function () {
        let id = this.dataset.id;
        let updatedFavorites = favorites.filter((movie) => movie.id != id);
        saveToLocalStorage("favorites", updatedFavorites);
        displayFavorites();
      });
    });
  }
  