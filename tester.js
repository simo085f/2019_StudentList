"use strict";

document.addEventListener("DOMContentLoaded", init);

// Globale variabler
let studTemplate = document.querySelector(".stud-template");
let studContainer = document.querySelector(".studerende");
let houseFilter;
let jsonStuderende;
let firstspace;
let lastspace;
let activeArray;
let sortBy;
let liste;

const prototype = {
  fullname: "-fullname-",
  firstname: "-firstname-",
  lastname: "-lastname-",
  house: "-house-"
};

function init() {
  document.querySelector(".alle").addEventListener("click", filterAlle);
  document
    .querySelector(".Ravenclaw")
    .addEventListener("click", filterRavenclaw);
  document
    .querySelector(".Hufflepuff")
    .addEventListener("click", filterHufflepuff);
  document
    .querySelector(".Gryffindor")
    .addEventListener("click", filterGryffindor);
  document
    .querySelector(".Slytherin")
    .addEventListener("click", filterSlytherin);

  document
    .querySelector(".firstname")
    .addEventListener("click", sortByFirstname);
  document.querySelector(".lastname").addEventListener("click", sortByLastname);
  document.querySelector(".house").addEventListener("click", sortByHouse);

  getJson();
}

async function getJson() {
  let jsonData = await fetch("http://petlatkea.dk/2019/hogwarts/students.json");
  jsonStuderende = await jsonData.json();
  prepareObjects(jsonStuderende);
}

function prepareObjects(jsonStuderende) {
  const arrayOfStudents = [];

  jsonStuderende.forEach(student => {
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

function filterAlle() {
  houseFilter = "alle";
  filterList();
}
function filterRavenclaw() {
  houseFilter = "Ravenclaw";
  filterList();
}

function filterHufflepuff() {
  houseFilter = "Hufflepuff";
  filterList();
}
function filterGryffindor() {
  houseFilter = "Gryffindor";
  filterList();
}

function filterSlytherin() {
  houseFilter = "Slytherin";
  filterList();
}

function onlyAlle(person) {
  return person.house === "alle";
}

function onlyRavenclaw(person) {
  return person.house === "Ravenclaw";
}

function onlyHufflepuff(person) {
  return person.house === "Hufflepuff";
}

function onlyGryffindor(person) {
  return person.house === "Gryffindor";
}

function onlySlytherin(person) {
  return person.house === "Slytherin";
}

function filterList() {
  sortStudents();
  liste = activeArray;

  if (houseFilter === "alle") {
    liste = activeArray;
  } else if (houseFilter === "Ravenclaw") {
    liste = activeArray.filter(onlyRavenclaw);
  } else if (houseFilter === "Hufflepuff") {
    liste = activeArray.filter(onlyHufflepuff);
  } else if (houseFilter === "Gryffindor") {
    liste = activeArray.filter(onlyGryffindor);
  } else if (houseFilter === "Slytherin") {
    liste = activeArray.filter(onlySlytherin);
  }
  displayList(liste);
}

function sortByFirstname() {
  sortBy = "firstname";
  filterList();
}

function sortByLastname() {
  sortBy = "lastname";
  filterList();
}

function sortByHouse() {
  sortBy = "house";
  filterList();
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
  }
}

function displayList(liste) {
  document.querySelector(".studerende").textContent = " ";

  //klon og vis indhold
  liste.forEach(person => {
    let klon = studTemplate.cloneNode(true).content;
    klon.querySelector(".navn").textContent =
      person.firstname + " " + person.lastname;
    klon.querySelector(".house").textContent = person.house;
    //klon.querySelector(".remove");
    klon.querySelector(".stud-container").addEventListener("click", () => {
      visModal(person);
    });
    studContainer.appendChild(klon);
  });
}
function visModal(eleven) {
  let name = eleven.fullname.split(" ");
  let firstName = name[0];
  let lastName = name[name.length - 1];
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
    document.querySelector("#modal-content").classList.add("gryffindor");
    document.querySelector("#modal-content").classList.remove("ravenclaw");
    document.querySelector("#modal-content").classList.remove("hufflepuff");
    document.querySelector("#modal-content").classList.remove("slytherin");
  }
  if (eleven.house === "Ravenclaw") {
    document.querySelector("#modal-content").classList.add("ravenclaw");
    document.querySelector("#modal-content").classList.remove("gryffindor");
    document.querySelector("#modal-content").classList.remove("hufflepuff");
    document.querySelector("#modal-content").classList.remove("slytherin");
  }
  if (eleven.house === "Hufflepuff") {
    document.querySelector("#modal-content").classList.add("hufflepuff");
    document.querySelector("#modal-content").classList.remove("gryffindor");
    document.querySelector("#modal-content").classList.remove("ravenclaw");
    document.querySelector("#modal-content").classList.remove("slytherin");
  }
  if (eleven.house === "Slytherin") {
    document.querySelector("#modal-content").classList.add("slytherin");
    document.querySelector("#modal-content").classList.remove("gryffindor");
    document.querySelector("#modal-content").classList.remove("ravenclaw");
    document.querySelector("#modal-content").classList.remove("hufflepuff");
  }
  console.log("Modal");
}

function skjulModal() {
  modal.classList.remove("vis");
}
