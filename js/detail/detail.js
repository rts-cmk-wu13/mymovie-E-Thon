let search = window.location.search;
let params = new URLSearchParams(search);
let id = params.get("id");

//! HEADER:
header();



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