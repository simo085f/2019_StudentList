document.addEventListener("DOMContentLoaded", getJson);

let alleStud;
let studTemplate = document.querySelector(".stud-template");
let studContainer = document.querySelector(".studerende");
let modal = document.querySelector("#modal");

houseFilter = "alle";

async function getJson() {
  let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");
  alleStud = await jsonData.json();

  visStud();
}

//Når der klikkes på et af menu_item skal function filtreringen starte
document.querySelectorAll(".menu_item").forEach(knap => {
  knap.addEventListener("click", filtrering);
});

function filtrering() {
  //Produkterne bliver indelt i deres kategorier så de bliver filtreret og vist
  studContainer.textContent = "";
  houseFilter = this.getAttribute("data-kategori");
  visStud();
}

function visStud() {
  alleStud.forEach(navn => {
    if (houseFilter == navn.house) {
      console.log("hej");
      udskriv();
    } else if (houseFilter == "alle") {
      udskriv();
    }

    function udskriv() {
      console.log(houseFilter + navn.house);
      //Det content som hentes fra json filen og vises
      let klon = studTemplate.cloneNode(true).content;
      klon.querySelector(".navn").textContent = navn.fullname;
      klon.querySelector(".house").textContent = navn.house;
      klon.querySelector(".navn").addEventListener("click", () => {
        visModal(elev);
      });

      //Placer klonen i HTML
      studContainer.appendChild(klon);
    }
  });
}
// TODO: Create scaffolding functions for the rest!

function clickSortByFirst() {}

function sortListByFirst() {}
