let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");

//! HEADER:
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
`;

//! MAIN:
let divOuterElm = document.createElement("div");
divOuterElm.className = "details";
document.querySelector("main").append(divOuterElm);

let sectionElm1 = document.createElement("section")
sectionElm1.className = "movie"
let sectionElm2 = document.createElement("section")
sectionElm2.className = "cast"


divOuterElm.append(sectionElm1, sectionElm2)

//! SECTION 1
const url = `https://api.themoviedb.org/3/movie/${id}append_to_response=1&language=en-US`;
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
    
    
    // if-else rating ifht. adult boolean:
    function agePG() {
        if (detail.adult === true) {
            return "PG-18";
        } else {
            return "PG-13";
        }
    }
    
    sectionElm1.innerHTML = `
        <h1>${detail.original_title}</h1>
        <p class="movie__rating"><i class="fa-solid fa-star"></i> ${detail.vote_average.toFixed(1)}/10 IMDb
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
                    <td>${(detail.runtime / 60).toFixed(0)}h ${
                        detail.runtime - (detail.runtime / 60).toFixed(0) * 60
                    }min</td>
            ${
                detail.spoken_languages[0].english_name
                ? `
                <td>${detail.spoken_languages[0].english_name}
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
                ${agePG(detail.adult)} 
                <!-- skal ændres til if else med PG-13 rating (indtil jeg ved, hvor den rigtige rating findes -->
            </td>
        </tr> 
    </table>
    
    <h2>Description</h2>
    <p>${detail.overview}</p>
    `;

})
.catch((err) => console.error(err));

//! SECTION 2 (CAST)
const urlCast = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
const optionsCast = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c'
    }
};

fetch(urlCast, optionsCast)
.then(res => res.json())
.then(cast =>  {
    
    sectionElm2.innerHTML = `
            <div class="movie__bar">
                <h2 class="movie__header">Cast</h2>
                <button class="btn1 seemore">See more</button>
            </div>
            `
            let divElmCast = document.createElement("div")
            divElmCast.className = "movie__actors"

            divElmCast.innerHTML = cast.cast.map(actor => {
                return ` 
                <figure>
                    <img src="https://image.tmdb.org/t/p/original/${
                  actor.profile_path
                }" alt="${actor.name}">
                    <figcaption>${actor.name}</figcaption>
            </figure>
                `
            }).join("");
            sectionElm2.appendChild(divElmCast)

            seeMore();
            
        }).catch(err => console.error(err));