let sectionElmFav = document.createElement("section");
sectionElmFav.className = "favorites";
document.querySelector("main").append(sectionElmFav);

let header = document.querySelector("header");
header.innerHTML = `
        <nav class="header__nav">
          <div class="header__div">
            <a href="index.html"><i class="fa-solid fa-arrow-left-long"></i></a>
            <form action="#" class="header__switch" method="post">
              <input type="checkbox" id="switch" value="false" name="switch">
              <span class="slider round"></span>
            </form>
          </div>
        </nav>

  `;

initDarkMode();
// favoritesList();

sectionElmFav.innerHTML = `
  <h1>Favorite Movies</h1>
  <div class="favorites__list">
    <p>Favorites N/A</p>
    <span >... under construction</span>
  </div>
`;
