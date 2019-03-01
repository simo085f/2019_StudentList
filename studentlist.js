document.addEventListener("DOMContentLoaded", getJson);

let studTemplate = document.querySelector(".stud-template");
let studContainer = document.querySelector(".studerende");
let modal = document.querySelector("#modal");
let houseFilter = "alle";
let firstspace;
let lastspace;
let activeArray;
let sortBy;
let liste;
let stud;

const prototype = {
  fullname: "-fullname-",
  firstname: "-firstname-",
  lastname: "-lastname-",
  house: "-house-"
};

async function getJson() {
  let jsonData = await fetch("http://petlatkea.dk/2019/students1991.json");
  const jsonstud = await jsonData.json();

  prepareObjects(jsonstud);
}

//Når der klikkes på et af menu_item skal function filtreringen starte
document.querySelectorAll(".menu_item").forEach(knap => {
  knap.addEventListener("click", filtrering);
});
document.querySelector(".firstname").addEventListener("click", sortByFirstname);
document.querySelector(".lastname").addEventListener("click", sortByLastname);
document.querySelector(".house").addEventListener("click", sortByHouse);

function prepareObjects(jsonstud) {
  const arrayOfStudents = [];

  jsonstud.forEach(student => {
    //Student.setJSONData(student);
    firstspace = student.fullname.indexOf(" ");
    lastspace = student.fullname.lastIndexOf(" ");
    let firstname = student.fullname.slice(0, firstspace);
    let lastname = student.fullname.slice(lastspace + 1);
    console.log(`${firstname} + ${lastname}`);

    //lav nyt objekt//
    const Student = Object.create(prototype);

    // setJSONData(student)
    Student.fullname = student.fullname;
    Student.firstname = firstname;
    Student.lastname = lastname;
    Student.house = student.house;

    arrayOfStudents.push(Student);
  });
  activeArray = arrayOfStudents;
  filterList();

  console.log(arrayOfStudents);
}

function filtrering() {
  //de studerende bliver indelt i deres kategorier så de bliver filtreret og vist
  studContainer.textContent = "";
  houseFilter = this.getAttribute("data-kategori");
  filterList();
}

function filterList() {
  liste = activeArray.filter(stud => stud.house === houseFilter);
  if (houseFilter === "alle") {
    liste = activeArray;
  }

  visStud(liste);
}

function sortByFirstname() {
  sortBy = "firstname";
  sortStudents();
}

function sortByLastname() {
  sortBy = "lastname";
  sortStudents();
}

function sortByHouse() {
  sortBy = "house";
  sortStudents();
}

function sortStudents() {
  if (sortBy === "firstname") {
    activeArray.sort(function(a, b) {
      if (a.firstname < b.firstname) {
        return -1;
      } else {
        return 1;
      }
    });
    visStud(liste);
    console.log(sortBy);
  }
  if (sortBy === "lastname") {
    activeArray.sort(function(a, b) {
      if (a.lastname < b.lastname) {
        return -1;
      } else {
        return 1;
      }
    });
    visStud(liste);
    console.log(sortBy);
  }
  if (sortBy === "house") {
    activeArray.sort(function(a, b) {
      if (a.house < b.house) {
        return -1;
      } else {
        return 1;
      }
    });
    console.log(sortBy);
    visStud(liste);
  }
}

function visStud(liste) {
  liste.forEach(udskriv);
  // liste.forEach(sortByFirstname);
}

function udskriv(navn) {
  console.log(houseFilter + navn.house);
  //Det content som hentes fra json filen og vises
  let klon = studTemplate.cloneNode(true).content;
  klon.querySelector(".navn").textContent =
    navn.firstname + " " + navn.lastname;
  klon.querySelector(".house").textContent = navn.house;
  klon.querySelector(".stud-container").addEventListener("click", () => {
    visModal(navn);
  });

  //Placer klonen i HTML
  studContainer.appendChild(klon);
}
// });

function visModal(eleven) {
  let name = eleven.fullname.split(" ");
  let firstName = name[0];
  let lastName = name[1];
  let firstLetterFirstName = firstName.substring(0, 1);
  let imageName = lastName + "_" + firstLetterFirstName + ".png";
  imageName = imageName.toLowerCase();
  modal.classList.add("vis");
  modal.querySelector(".modal-navn").textContent =
    eleven.firstname + " " + eleven.lastname;
  modal.querySelector(".modal-house").textContent = eleven.house;
  modal.querySelector(".modal-img").src = "images/" + imageName;
  modal.querySelector("button").addEventListener("click", skjulModal);
  if (eleven.house === "Gryffindor") {
    document.querySelector("#modal-content").classList.add("Gryffindor");
    document.querySelector("#modal-content").classList.remove("Ravenclaw");
    document.querySelector("#modal-content").classList.remove("Hufflepuff");
    document.querySelector("#modal-content").classList.remove("Slytherin");
  }
  if (eleven.house === "Ravenclaw") {
    document.querySelector("#modal-content").classList.add("Ravenclaw");
    document.querySelector("#modal-content").classList.remove("Gryffindor");
    document.querySelector("#modal-content").classList.remove("Hufflepuff");
    document.querySelector("#modal-content").classList.remove("Slytherin");
  }
  if (eleven.house === "Hufflepuff") {
    document.querySelector("#modal-content").classList.add("Hufflepuff");
    document.querySelector("#modal-content").classList.remove("Gryffindor");
    document.querySelector("#modal-content").classList.remove("Ravenclaw");
    document.querySelector("#modal-content").classList.remove("Slytherin");
  }
  if (eleven.house === "Slytherin") {
    document.querySelector("#modal-content").classList.add("Slytherin");
    document.querySelector("#modal-content").classList.remove("Gryffindor");
    document.querySelector("#modal-content").classList.remove("Ravenclaw");
    document.querySelector("#modal-content").classList.remove("Hufflepuff");
  }
  console.log("Modal");
}

function skjulModal() {
  modal.classList.remove("vis");
}
