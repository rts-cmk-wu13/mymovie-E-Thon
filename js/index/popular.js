function popular(movies) {
  //! FETCH AF DATA FRA DETAIL:
  function fetchData(url, mapObject, key) {
    // URL; API-URL der skal hentes data fra
    // mapObject; object, hvor data gemmes
    // key; API'ens data vi vil gemme
    return fetch(url, optionsList)
      .then((res) => res.json())
      // laver svaret til JSON format (bliver JavaScript objekt)
      .then((data) => {
        if (Array.isArray(data[key])) {
          // hvis data[key] er et array, så køres forEach:
          data[key].forEach(item => 
            mapObject[item.id] = item.name);
        } else {
          mapObject[data.id] = data[key];
        }
      })
      .catch(err => {
        alert("The movie is not available");
        console.error(err);
      });
  }

  //! GENRE:
  let genreMap = {}; // Objekt til at gemme genrer fra id til navn

  // Hent genrer og start film-fetch
  fetchData("https://api.themoviedb.org/3/genre/movie/list?language=en-US", genreMap, "genres")
    .then(() => fetchMoviesPop(1));

  //! RUNTIME:
  let runtimeMap = {}; // Objekt til at gemme runtime fra movieId til runtime

  function fetchMovieRuntime(movieId) {
    if (runtimeMap[movieId] !== undefined) {
      return Promise.resolve(runtimeMap[movieId]); // Returnér direkte, hvis vi allerede har det
    }
    return fetchData(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, runtimeMap, "runtime")
      .then(() => runtimeMap[movieId] || 0); // Returnér runtime eller 0 ved fejl
  }

  //! PAGES COUNT:
  let pages = movies.total_pages;

  //! OBSERVER CREATED:
  let currentOffsetPop = 1;
  const observerPop = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        currentOffsetPop++;
        if (currentOffsetPop <= pages) { // Skiftet fra < til <=
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
            <h2 class="movies__header">Popular</h2>
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
        const moviePromises = movies.results.map((movie) =>
          fetchMovieRuntime(movie.id).then((runtime) => ({ ...movie, runtime }))
        );

        // Vent på, at alle filmdata + runtime er hentet
        Promise.all(moviePromises)
          .then((moviesWithRuntime) => {
            divElm2.innerHTML += moviesWithRuntime
              .map((movie) => {

                // billedsti:
              let imageUrl;
        
              if (movie.poster_path) {
                imageUrl = `https://image.tmdb.org/t/p/original/${
                  movie.poster_path
                }`;
              } else {
                imageUrl = 'https://placehold.co/300x450/transparent/000?text=N/A';
              } 

                return `
              <div class="movies2__movie">
                  <a href="detail.html?id=${movie.id}" class="flex1">
                      <img src="${imageUrl}" alt="${movie.title} poster">
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
                            .map((id) =>
                              genreMap[id]
                                ? `<li class="movie__genre"><button class="btn2">${genreMap[id]}</button></li>`
                                : ""
                            )
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

            //! movies being observed
            let observedMovie = divElm2.querySelector(".movies2__movie:last-of-type");
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
}
