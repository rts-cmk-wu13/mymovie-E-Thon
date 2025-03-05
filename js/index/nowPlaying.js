function nowPlaying(){
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

    document.querySelector("main").appendChild(sectionElm);
  })
  .catch((err) => {
    alert("The movie is not available");
    console.error(err);
  });
}