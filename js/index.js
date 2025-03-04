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
const urlNow =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const optionsNow = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
  },
};

fetch(urlNow, optionsNow)
  .then((res) => res.json())
  .then((movies) => {
    let sectionElm = document.createElement("section");
    sectionElm.className = "movies";
    sectionElm.innerHTML = `
    <div class="movies__bar">
    <h2 class="movies__header">Now Showing</h2>
    <button class="btn1">See more</button>
    </div>
    `;
    let divElm = document.createElement("div");
    divElm.className = "movies__div";
    sectionElm.append(divElm);

    divElm.innerHTML = movies.results
      .map((movie) => {
        return `
        <article class="movies__movie">
            <a href="detail.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/original/${
              movie.poster_path
            }.svg" alt="${movie.title} poster">
            <h3 class="movie__title">${movie.original_title}</h3>
        </a>
            <p class="movie__rating"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
              1
            )}/10 IMDb
            </p>
            
        </article>
        `;
      })
      .join("");

    document.querySelector("main").appendChild(sectionElm);
  })
  .catch((err) => {
    alert("The movie is not available");
    console.error(err);
  });

//! POPULAR:
const urlPop =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const optionsPop = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
  },
};

fetch(urlPop, optionsPop)
  .then((res) => res.json())
  .then((movies) => {
    let sectionElm2 = document.createElement("section");
    sectionElm2.className = "moviesPop";
    sectionElm2.innerHTML = `
        <div class="movies__bar">
            <h2 class="movies__header">Popuar</h2>
            <button class="btn1">See more</button>
        </div>
    `;

    let divElm2 = document.createElement("div");
    divElm2.className = "movies2__div";
    sectionElm2.append(divElm2);

    divElm2.innerHTML = movies.results
      .map((movie) => {
        return `
        <div class="movies2__movie">
            <a href="detail.html?id=${movie.id}" class="flex1">
                <img src="https://image.tmdb.org/t/p/original/${
                  movie.poster_path
                }.svg" alt="${movie.title} poster">
            </a>
            <article class="flex3">
                <a href="detail.html?id=${movie.id}">
                    <h3 class="movie__title">${movie.original_title}</h3>
                </a>
                
                <p class="movie__rating"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
                  1
                )}/10 IMDb
                </p>

                <ul class="movie__genres">
                    ${
                      movie.genre_ids[0]
                        ? `<li class="movie__genre"><p>${movie.genre_ids[0]}</p></li>`
                        : ""
                    }
                    ${
                      movie.genre_ids[1]
                        ? `<li class="movie__genre"><p>${movie.genre_ids[1]}</p></li>`
                        : ""
                    }
                    ${
                      movie.genre_ids[2]
                        ? `<li class="movie__genre"><p>${movie.genre_ids[2]}</p></li>`
                        : ""
                    }
                    <!-- ? tjekker om dataen eksisterer, hvis den gør, oprettes <li> hvis ikke, så returneres en tom streng -->
                </ul>
                <p class="movie__duration"><i class="fa-solid fa-clock"></i>
                </p>
            </article>   
        </div>
        `;
      })
      .join("");

    document.querySelector("main").appendChild(sectionElm2);
  });
//   .catch(err => {
//     alert("The movie is not available")
//     console.error(err)});

let footer = document.querySelector("footer");
footer.innerHTML = `
<nav class="footer__nav">
    <ul class="footer__links">
        <li class="footer__link"><a href="#">
            <img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon">
        </a></li>
        
        <li class="footer__link"><a href="#"><i class="fa-solid fa-ticket-simple"></i>
        </a></li>
        
        <li class="footer__link"><a href="#"><i class="fa-solid fa-bookmark"></i>
        </a></li>
    </ul>
</nav>
`;