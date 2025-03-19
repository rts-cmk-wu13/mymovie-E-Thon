import seeMore from "./seemore.js";
import { sectionElm2 } from "./detail.js";

export default function cast(movie) {
    sectionElm2.innerHTML = `
            <div class="cast__bar">
                <h2 class="cast__header">Cast</h2>
                <button class="btn1 cast__seemore">See more</button>
            </div>
            `
            let divElmCast = document.createElement("div")
            divElmCast.className = "cast__actors"
    
            divElmCast.innerHTML = movie.credits.cast.map(actor => {
    
                //! billedsti:
                let imageUrl;
    
                if (actor.profile_path) {
                    imageUrl = `https://image.tmdb.org/t/p/original/${actor.profile_path}`;
                } else {
                    imageUrl = 'https://placehold.co/300/transparent/000?text=N/A';
                }                
    
                return ` 
                <figure>
                    <img src="${imageUrl}" alt="${actor.name}">
                    <figcaption>${actor.name}</figcaption>
                </figure>
                `
            }).join("");
            sectionElm2.appendChild(divElmCast)
    
            seeMore();
}