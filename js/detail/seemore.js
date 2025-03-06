function seeMore() {
  const gridContainer = document.querySelector(".movie__actors");

  // array på alle child elementer i movie__actors grid elementet:
  const gridItems = Array.from(gridContainer.children);

  // Beregning af antallet af kolonner i gridet dynamisk (fordi der er brugt minmax og auto-fit)
  const columnCount = Math.floor(
    gridContainer.offsetWidth / gridItems[0].offsetWidth
    // offsetWidth: synlige bredde af en kontainer (her mit grid)
    // divideres med første bredden på første element i arrayet = ca. hvor mange der er i rækken
    // rundes ned, fordi elementerne hopper ned på næste række, hvis ikke der er plads til dem 
  );


  // console.log(columnCount);

  // For at skjule alle andre rækker end første i grid:
  gridItems.forEach((item, index) => {
    if (index >= columnCount) {
      // Hvis indekset er større end eller lig med columnCount, betyder det, at elementet ikke er på første række
      item.style.display = "none";
    }
  });

  let seeMoreBtn = document.querySelector(".seemore");
  let clicked = false; // Tilstand: viser mere eller ej

  seeMoreBtn.addEventListener("click", showHide);
  function showHide() {
    clicked = !clicked; // Skift tilstand

    gridItems.forEach((item, index) => {
      if (index >= columnCount) {
        if (clicked) {
          item.style.display = "block";
          seeMoreBtn.textContent = "See Less";
        } else {
          item.style.display = "none";
          seeMoreBtn.textContent = "See More";
        }
      }
    });
  }
}
