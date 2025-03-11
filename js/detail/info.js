function info() {
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=release_dates&language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((detail) => {
    
    
        //! PG rating:
        const usPg = detail.release_dates.results.find(pg => pg.iso_3166_1 === "US");
        let pgRating = "N/A"; // hvis ikke der findes en rating; N/A

        if (usPg && usPg.release_dates.length > 0) {
            pgRating = usPg.release_dates[0].certification;
        }

        //! CONTENT:
      sectionElm1.innerHTML = `
        <h1>${detail.original_title}</h1>
        <p class="movie__rating"><i class="fa-solid fa-star"></i> ${detail.vote_average.toFixed(
          1
        )}/10 IMDb
    </p>
    
    <ul class="movie__genres">
        ${
          detail.genres[0].name
            ? `<li class="movie__genre"><button class="btn2">${detail.genres[0].name}</button></li>`
            : ""
        }
        ${
          detail.genres[1].name
            ? `<li class="movie__genre"><button class="btn2">${detail.genres[1].name}</button></li>`
            : ""
        }
        ${
          detail.genres[2].name
            ? `<li class="movie__genre"><button class="btn2">${detail.genres[2].name}</button></li>`
            : ""
        }
        <!-- ? tjekker om dataen eksisterer, hvis den gør, oprettes <li> hvis ikke, så returneres en tom streng -->
            </ul>
            
            <table class="movie__info">
                <tr>
                    <td>Length</td>
                    <td>Language</td>
                    <td>Rating</td>
                </tr>
                <tr>
                    <td>${Math.floor(detail.runtime / 60)}h ${
        detail.runtime % 60
      }min</td>
                    <!--  "% 60" deler med 60 og trækker disse fra for dermed at returnere det resterende tal (fx: tal/60 = antal => resulatet = tal-(antal*60)) -->
            ${
              detail.spoken_languages[0].english_name
                ? `
                <td  class="movie__languages">${
                  detail.spoken_languages[0].english_name
                }
                ${detail.spoken_languages
                  .slice(1)
                  .map(
                    (language) => `
                <br>${language.english_name}`
                  )
                  .join("")}
                </td>`
                : ""
            }
            <td>
                ${pgRating} 
            </td>
        </tr> 
    </table>
    
    <h2>Description</h2>
    <p>${detail.overview}</p>
    `;
    })
    .catch((err) => console.error(err));
}
