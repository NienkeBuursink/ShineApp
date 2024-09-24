const button = document.querySelector("button");
const header = document.querySelector("header");
const reviews = document.querySelectorAll("section:nth-of-type(5) p");
const therapists = document.querySelectorAll("section:nth-of-type(4) li");
const podcasts = document.querySelectorAll("section:nth-of-type(3) li");

// hamburgertje
button.onclick = toggleMenu;

function toggleMenu (){
  header.classList.toggle("toonMenu")
}


// reviews veranderen, tip gekregen van Tom en Bahaa 
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



// gekke observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    
    if(intersecting){
      entry.target.classList.add("inbeeld");
    }
  });
});

podcasts.forEach((podcast) => {
  observer.observe(podcast);
});

therapists.forEach((therapist) => {
  observer.observe(therapist);
});


