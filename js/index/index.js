const urlList = `https://api.themoviedb.org/3/movie/now_playing?append_to_response=popular&language=en-US&page=1`;
const optionsList = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
  },
};

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
            <li class="header__link"><i class="fa-solid fa-bookmark"></i></li>
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
