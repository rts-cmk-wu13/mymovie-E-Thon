function nowPlaying(movies) {
  //! PAGES COUNT:
  let pagesNow = 1;

  fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US`,
    optionsList
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      pagesNow = movies.total_pages;
    });

  //! OBSERVER CREATED:
  let currentOffsetNow = 1;
  const observerNow = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        currentOffsetNow = currentOffsetNow + 1;
        if (currentOffsetNow < pagesNow) {
          fetchMoviesNow(currentOffsetNow);
        } else {
          console.log("There are no more movies for now");
        }
      }
    });
  });

  //! CONTENT:
  let sectionElm = document.createElement("section");
  sectionElm.className = "movies";
  sectionElm.innerHTML = `
    <div class="movies__bar">
        <h2 class="movies__header">Now Showing</h2>
        <button class="btn1">See more</button>
    </div>
    `;
  document.querySelector("main").appendChild(sectionElm);

  let divElm = document.createElement("div");
  divElm.className = "movies__div";
  sectionElm.append(divElm);

  function fetchMoviesNow(offset) {
    const urlNow = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${offset}`;
    fetch(urlNow, optionsList)
      .then((res) => res.json())
      .then((movies) => {
        divElm.innerHTML += movies.results
          .map((movie) => {
            return `
        <article class="movies__movie">
            <a href="detail.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/original/${
                  movie.poster_path
                }" alt="${movie.title} poster">
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

        //! movies being observed:
        let observedMovie = divElm.querySelector(".movies__movie:last-of-type");
        observerNow.observe(observedMovie);
      })
      .catch((err) => {
        alert("The movie is not available");
        console.error(err);
      });
  }
  fetchMoviesNow(currentOffsetNow);
}
