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

//! NOW PLAYING:
const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(movies => {
    console.log(movies);
    
    let sectionElm = document.createElement("section")
    sectionElm.className = "movies"

    sectionElm.innerHTML = movies.results.map(movie => {
        return `
        <article class="movies__movie" id="">
            <h3 class="movie__title">${movie.original_title}</h3>
            <p class="movie__rating"><i class="fa-solid fa-star"></i> ${Math.round(movie.vote_average)}/10 IMDb
            </p>
        </article>
        `;
    }).join("");

    document.querySelector("main").appendChild(sectionElm);

  })
//   .catch(err => {
//     alert("The movie is not available")
//     console.error(err)
// });

let footer = document.querySelector("footer");
footer.innerHTML = `
<nav class="footer__nav">
    <ul class="footer__links">
        <li class="footer__link"><img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon"></li>
        <li class="footer__link"><i class="fa-solid fa-ticket-simple"></i></li>
        <li class="footer__link"><i class="fa-solid fa-bookmark"></i></li>
    </ul>
</nav>
`;
