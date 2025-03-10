function cast() {
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
            <div class="cast__bar">
                <h2 class="cast__header">Cast</h2>
                <button class="btn1 cast__seemore">See more</button>
            </div>
            `
            let divElmCast = document.createElement("div")
            divElmCast.className = "cast__actors"

            divElmCast.innerHTML = cast.cast.map(actor => {

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
            
        }).catch(err => console.error(err));
}