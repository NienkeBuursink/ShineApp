// JavaScript Document
const button = document.querySelector("button");
const header = document.querySelector("header");
const reviews = document.querySelectorAll(".reviews p");

button.onclick = toggleMenu;

function toggleMenu (){
  header.classList.toggle("toonMenu")
}


// tip gekregen van Tom en Bahaa 
function reviewsLatenZien(currentIndex = 0) {
  let alleReviews = reviews.length;

  reviews.forEach((p) => {
    p.classList.remove("latenZien");
    p.classList.add("nietLatenZien");
  });

  reviews[currentIndex].classList.remove("nietLatenZien");
  reviews[currentIndex].classList.add("latenZien");

  let nextIndex = (currentIndex + 1) % alleReviews;

  setTimeout(() => reviewsLatenZien(nextIndex), 7000);
}


window.onload = () => reviewsLatenZien();


