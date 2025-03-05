let header = document.querySelector("header");
header.innerHTML = `
<nav class="header__nav">
    <div class="header__menu">
        <div class="header__burger">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul class="header__links">
            <li class="header__link"><img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon"></li>
            <li class="header__link"><i class="fa-solid fa-ticket-simple"></i></li>
            <li class="header__link"><i class="fa-solid fa-bookmark"></i></li>
        </ul>
    </div>
    <h1>MyMovies</h1>
    <form action="#" class="header__switch" method="post">
        <input type="checkbox" id="switch" value="false" name="switch">
        <span class="slider round"></span>
    </form>
</nav>
`;

//! NOW PLAYING:
nowPlaying()

  
//! POPULAR:
popular()

//! FOOTER:
let footer = document.querySelector("footer");
footer.innerHTML = `
<nav class="footer__nav">
    <ul class="footer__links">
        <li class="footer__link"><a href="#">
            <img class="nav__img--movieicon" src="./img/movieicon-dark.svg" alt="Movie icon">
        </a></li>
        
        <li class="footer__link"><a href="#"><i class="fa-solid fa-ticket-simple"></i>
        </a></li>
        
        <li class="footer__link"><a href="#"><i class="fa-solid fa-bookmark"></i>
        </a></li>
    </ul>
</nav>
`;
