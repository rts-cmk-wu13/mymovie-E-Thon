function info(movie) {
        //! PG rating:
        const usPg = movie.release_dates.results.find(pg => pg.iso_3166_1 === "US");
        let pgRating = "N/A"; // hvis ikke der findes en rating; N/A

        if (usPg && usPg.release_dates.length > 0) {
            pgRating = usPg.release_dates[0].certification;
        }

        //! CONTENT:
      sectionElm1.innerHTML = `
        <h1>${movie.original_title}</h1>
        <p class="movie__rating"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
          1
        )}/10 IMDb
    </p>
    
    <ul class="movie__genres">
        ${
          movie.genres[0].name
            ? `<li class="movie__genre"><button class="btn2">${movie.genres[0].name}</button></li>`
            : ""
        }
        ${
          movie.genres[1].name
            ? `<li class="movie__genre"><button class="btn2">${movie.genres[1].name}</button></li>`
            : ""
        }
        ${
          movie.genres[2].name
            ? `<li class="movie__genre"><button class="btn2">${movie.genres[2].name}</button></li>`
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
                    <td>${Math.floor(movie.runtime / 60)}h ${
        movie.runtime % 60
      }min</td>
                    <!--  "% 60" deler med 60 og trækker disse fra for dermed at returnere det resterende tal (fx: tal/60 = antal => resulatet = tal-(antal*60)) -->
            ${
              movie.spoken_languages[0].english_name
                ? `
                <td  class="movie__languages">${
                  movie.spoken_languages[0].english_name
                }
                ${movie.spoken_languages
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
    <p>${movie.overview}</p>
    `;
}
