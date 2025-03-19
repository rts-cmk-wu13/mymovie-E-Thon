import header from "./header.js";
import info from "./info.js";
import cast from "./cast.js";

let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");

//! MAIN ELEMENTS:
let divOuterElm = document.createElement("div");
divOuterElm.className = "details";
document.querySelector("main").append(divOuterElm);

export let sectionElm1 = document.createElement("section")
sectionElm1.className = "movie"
export let sectionElm2 = document.createElement("section")
sectionElm2.className = "cast"

divOuterElm.append(sectionElm1, sectionElm2)

const urlMovie = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,release_dates,credits&language=en-US`;
const optionsMovie = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzZkMjA0YzQ5NTkwMWY4ZDcwMWU1MDRiODdmZDM2YyIsIm5iZiI6MTc0MDk4Njc0MC4zMDQsInN1YiI6IjY3YzU1OTc0Y2NmYzc0OWFmMjkxZjBmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XzCF9nv3KxofSgdCfmo_5ZQmrHjGYWwy3a0Pnjgx17c'
    }
};

fetch(urlMovie, optionsMovie)
.then(res => res.json())
.then(movie =>  {
      
    //! HEADER:
    header(movie);

    //! SECTION 1
    info(movie);
    
    //! SECTION 2 (CAST)
    cast(movie);
    
}).catch(err => console.error(err));
