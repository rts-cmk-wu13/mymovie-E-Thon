import { optionsList } from "./optionList.js";
import initDarkMode from "../darkmode.js";
import burger from "./burger.js";
import nowPlaying from "./nowPlaying.js";
import popular from "./popular.js";

const urlList = `https://api.themoviedb.org/3/movie/now_playing?append_to_response=popular&language=en-US&page=1`;
// optionsListFunc();

fetch(urlList, optionsList)
  .then((res) => res.json())
  .then((movies) => {
    //! HEADER:
    let header = document.querySelector("header");
    header.innerHTML = `
<nav class="header__nav">
    <div class="header__menu">
        <div class="header__burger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="header__links">
            <li class="header__link"><img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon"></li>
            <li class="header__link"><i class="fa-solid fa-ticket-simple"></i></li>
            <li class="header__link"><a href="../favorites.html"><i class="fa-solid fa-bookmark"></i>
            </a></li>
        </ul>
    </div>
    <h1>MyMovies</h1>
    <form action="#" class="header__switch" method="post">
        <input type="checkbox" id="switch" value="false" name="switch">
        <span class="slider round"></span>
    </form>
</nav>
`;
    burger();
    initDarkMode();

    //! NOW PLAYING:
    nowPlaying(movies);

    //! POPULAR:
    popular(movies);

    //! FOOTER:
    let footer = document.querySelector("footer");
    footer.innerHTML = `
<nav class="footer__nav">
    <ul class="footer__links">
        <li class="footer__link"><a href="#">
            <img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon">
        </a></li>
        
        <li class="footer__link"><a href="#"><i class="fa-solid fa-ticket-simple"></i>
        </a></li>
        
        <li class="footer__link"><a href="../favorites.html"><i class="fa-solid fa-bookmark"></i>
        </a></li>
    </ul>
</nav>
`;
  })
  .catch((err) => {
    alert("The movie is not available");
    console.error(err);
  });
