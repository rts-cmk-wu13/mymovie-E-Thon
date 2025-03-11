function header() {
  const urlMovie = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const optionsMovie = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
    },
  };

  fetch(urlMovie, optionsMovie)
    .then((res) => res.json())
    .then((movie) => {
      let header = document.querySelector("header");
      header.innerHTML = `
        <nav class="header__nav">
          <div class="header__div">
            <a href="index.html"><i class="fa-solid fa-arrow-left-long"></i></a>
            <form action="#" class="header__switch" method="post">
              <input type="checkbox" id="switch" value="false" name="switch">
              <span class="slider round"></span>
            </form>
          </div>
        </nav>
        <div class="header_trailer">
            <iframe src="https://www.youtube.com/embed/${movie.results[0]?.key}" allowfullscreen></iframe>
        </div>

`;
initDarkMode();
    })
    .catch((err) => console.error(err));
}
