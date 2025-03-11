function popular(movies) {

  //! FETCH AF DATA FRA DETAIL:
  function fetchData(url, mapObject, dataKey, isSingleValue, callback) {
    fetch(url, optionsList)
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
      .catch((err) => {
        alert("The movie is not available");
        console.error(err)
      });
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
      // kalder funktionen på side 1
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
  let pages = movies.total_pages;
  
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

  //! CONTENT:
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
    fetch(urlPop, optionsList)
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
                        ${Math.floor(movie.runtime / 60)}h ${
                  movie.runtime % 60
                }min
                      </p>
                  </article>   
              </div>
            `;
              })
              .join("");

            //! movies being observed
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

  //! Rutime function
  function fetchMovieRuntime(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    return fetch(url, optionsList)
      .then((res) => res.json())
      .then((data) => data.runtime) // Returner kun runtime
      .catch((err) => {
        alert("Runtime is not available");
        console.error(err);
        return 0; // Returner 0, hvis der opstår en fejl
      });
  }
  fetchMoviesPop(currentOffsetPop);
}
