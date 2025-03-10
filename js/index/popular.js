// ${(detail.runtime / 60).toFixed(0)}h ${detail.runtime - (detail.runtime / 60).toFixed(0) * 60}min
// koden til runtime fra detail side - find ud af, hvordan man fetcher den og indsætter i popular

function popular() {
  const optionsPop = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
    },
  };

  // //! Fetch af genre:
  // let genreMap = {}; // til at gemme genrene fra id til navne

  // fetch(
  //   "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
  //   optionsPop
  // )
  //   .then((res) => res.json())
  //   .then((data) => {
  //     data.genres.forEach((genre) => {
  //       genreMap[genre.id] = genre.name;
  //     });
  //     fetchMoviesPop(1);
  //   })
  //   .catch((err) => console.error("Fejl ved hentning af genrer:", err));

  //! FETCH AF DATA FRA DETAIL:
  function fetchData(url, mapObject, dataKey, isSingleValue, callback) {
    fetch(url, optionsPop)
      .then((res) => res.json())
      .then((data) => {
        if (isSingleValue) {
          // Hvis det er en enkelt værdi (som runtime)
          mapObject[data.id] = data[dataKey];
        } else {
          // Hvis det er en liste (som genres)
          data[dataKey].forEach((item) => {
            mapObject[item.id] = item.name;
          });
        }
        if (callback) callback();
      })
      .catch((err) => console.error(`Fejl ved hentning af ${dataKey}:`, err));
  }

  //! GENRE:
  let genreMap = {}; // Objekt til at gemme genrer fra id til navn

  // Hent genrer
  fetchData(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    genreMap,
    "genres",
    false,
    () => {
      fetchMoviesPop(1);
    }
  );

  //!RUNTIME:
  let runtimeMap = {}; // Objekt til at gemme runtime fra movieId til runtime

  function fetchMovieRuntime(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    fetchData(url, runtimeMap, "runtime", true, () => {});
  }

  //! PAGES COUNT:
  let pages = 1;
  fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US`, optionsPop)
    .then(function (response) {
      return response.json();
    })
    .then(function (movies) {
      pages = movies.total_pages;
    });

  //! OBSERVER CREATED:
  let currentOffsetPop = 1;
  const observerPop = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        currentOffsetPop = currentOffsetPop + 1;
        if (currentOffsetPop < pages) {
          fetchMoviesPop(currentOffsetPop);
        } else {
          console.log("There are no more movies for now");
        }
      }
    });
  });

  let sectionElm2 = document.createElement("section");
  sectionElm2.className = "moviesPop";
  sectionElm2.innerHTML = `
        <div class="movies__bar">
            <h2 class="movies__header">Popuar</h2>
            <button class="btn1">See more</button>
        </div>
        `;
  document.querySelector("main").appendChild(sectionElm2);

  let divElm2 = document.createElement("div");
  divElm2.className = "movies2__div";
  sectionElm2.append(divElm2);

  function fetchMoviesPop(offset) {
    const urlPop = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${offset}`;
    fetch(urlPop, optionsPop)
      .then((res) => res.json())
      .then((movies) => {
        // Hent alle filmdata og deres runtime samtidig
        const moviePromises = movies.results.map((movie) => {
          return fetchMovieRuntime(movie.id).then((runtime) => {
            return {
              ...movie,
              runtime: runtime,
            };
          });
        });

        // Vent på, at alle filmdata + runtime er hentet
        Promise.all(moviePromises)
          .then((moviesWithRuntime) => {
            divElm2.innerHTML += moviesWithRuntime
              .map((movie) => {
                return `
              <div class="movies2__movie">
                  <a href="detail.html?id=${movie.id}" class="flex1">
                      <img src="https://image.tmdb.org/t/p/original/${
                        movie.poster_path
                      }" alt="${movie.title} poster">
                  </a>
                  <article class="flex3">
                      <a href="detail.html?id=${movie.id}">
                          <h3 class="movie2__title">${movie.original_title}</h3>
                      </a>
                      
                      <p class="movie__rating"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
                        1
                      )}/10 IMDb</p>
      
                      <ul class="movie__genres">
                          ${movie.genre_ids
                            .map((id) => {
                              return genreMap[id]
                                ? `<li class="movie__genre"><button class="btn2">${genreMap[id]}</button></li>`
                                : "";
                            })
                            .join("")}
                      </ul>
                      <p class="movie__duration duration">
                        <i class="fa-solid fa-clock"></i>
                        ${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min
                      </p>
                  </article>   
              </div>
            `;
              })
              .join("");

            // movies being observed
            let observedMovie = divElm2.querySelector(
              ".movies2__movie:last-of-type"
            );
            observerPop.observe(observedMovie);
          })
          .catch((err) => {
            console.error("Fejl ved hentning af film med runtime:", err);
          });
      })
      .catch((err) => {
        alert("The movie is not available");
        console.error(err);
      });
  }

  function fetchMovieRuntime(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    return fetch(url, optionsPop)
      .then((res) => res.json())
      .then((data) => data.runtime) // Returner kun runtime
      .catch((err) => {
        console.error(`Fejl ved hentning af runtime for film ${movieId}:`, err);
        return 0; // Returner 0, hvis der opstår en fejl
      });
  }
  fetchMoviesPop(currentOffsetPop);
}
