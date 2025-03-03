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
            <li class="header__link"><img src="./img/movieicon-light.svg" alt="Movie icon"></li>
            <li class="header__link"><i class="fa-solid fa-ticket-simple"></i></li>
            <li class="header__link"><i class="fa-solid fa-bookmark"></i></li>
        </ul>
    </div>
    <h1>MyMovies</h1>
    <form action="#" class="header__form" method="post">
        <input type="checkbox" id="switch" value="false" name="switch">
    </form>
</nav>
`;

let footer = document.querySelector("footer");
footer.innerHTML = `
<nav class="footer__nav">
    <ul class="footer__links">
        <li class="footer__link"><img src="./img/movieicon-light.svg" alt="Movie icon"></li>
        <li class="footer__link"><i class="fa-solid fa-ticket-simple"></i></li>
        <li class="footer__link"><i class="fa-solid fa-bookmark"></i></li>
    </ul>
</nav>
`;
