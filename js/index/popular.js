function popular() {
    const optionsPop = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
        },
      };
      // PAGES COUNT:
      let pages = 1;
      fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US`, optionsPop)
        .then(function (response) {
          return response.json();
        })
        .then(function (movies) {
          pages = movies.total_pages;
        });
      
      // OBSERVER CREATED:
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
      let currentOffsetPop = 1;
      
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
      
      function fetchMoviesPop(offset) {
        const urlPop = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${offset}`;
        fetch(urlPop, optionsPop)
          .then((res) => res.json())
          .then((movies) => {
            divElm2.innerHTML += movies.results
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
                      )}/10 IMDb
                      </p>
      
                      <ul class="movie__genres">
                          ${
                            movie.genre_ids[0]
                              ? `<li class="movie__genre"><button class="btn2">${movie.genre_ids[0]}</button></li>`
                              : ""
                          }
                          ${
                            movie.genre_ids[1]
                              ? `<li class="movie__genre"><button class="btn2">${movie.genre_ids[1]}</button></li>`
                              : ""
                          }
                          ${
                            movie.genre_ids[2]
                              ? `<li class="movie__genre"><button class="btn2">${movie.genre_ids[2]}</button></li>`
                              : ""
                          }
                          <!-- ? tjekker om dataen eksisterer, hvis den gør, oprettes <li> hvis ikke, så returneres en tom streng -->
                      </ul>
                      <p class="movie__duration duration"><i class="fa-solid fa-clock"></i>
                      </p>
                  </article>   
              </div>
              `;
              })
              .join("");
      
            // movies being observed:
            let observedMovie = divElm2.querySelector(".movies2__movie:last-of-type");
            observerPop.observe(observedMovie);
      
            document.querySelector("main").appendChild(sectionElm2);
          })
          .catch((err) => {
            alert("The movie is not available");
            console.error(err);
          });
      }
      
      fetchMoviesPop(currentOffsetPop);
}