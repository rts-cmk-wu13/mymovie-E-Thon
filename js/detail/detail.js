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
info ();

//! SECTION 2 (CAST)
cast();