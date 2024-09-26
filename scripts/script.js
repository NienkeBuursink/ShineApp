const button = document.querySelector("button");
const header = document.querySelector("header");
const reviews = document.querySelectorAll("section:nth-of-type(5) article");

const therapists = document.querySelectorAll("section:nth-of-type(4) li");
const podcasts = document.querySelectorAll("section:nth-of-type(3) li");

const popup = document.querySelectorAll("section:nth-of-type(3) dialog");
const playbutton = document.querySelectorAll("section:nth-of-type(3) li > button");
const closePopup = document.querySelectorAll("section:nth-of-type(3) dialog button");
const popupPlaybutton = document.querySelectorAll("section:nth-of-type(3) dialog button:nth-of-type(3)");
const popupPausebutton = document.querySelectorAll("section:nth-of-type(3) dialog button:nth-of-type(5)");

let rickRoll = new Audio("audio/rickroll.mp4");
rickRoll.loop = true;


// hamburgertje
button.onclick = toggleMenu;

function toggleMenu (){
  header.classList.toggle("toonMenu")
}


// reviews veranderen, tip gekregen van Tom en Bahaa 
function reviewsLatenZien(currentIndex = 0) {
  let alleReviews = reviews.length;

  reviews.forEach((review) => {
    review.classList.remove("latenZien");
    review.classList.add("nietLatenZien");
  });

  reviews[currentIndex].classList.remove("nietLatenZien");
  reviews[currentIndex].classList.add("latenZien");

  let nextIndex = (currentIndex + 1) % alleReviews;

  setTimeout(() => reviewsLatenZien(nextIndex), 7000);
}

window.onload = () => reviewsLatenZien();



// gekke observers

// podcasts observer
let podcastsInBeeld = [];

const observerPodcasts = new IntersectionObserver((entries) => {
  // alleen de podcasts die in beeld zijn gekomen opslaan in de podcastsInBeeld array
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    if(intersecting){
      podcastsInBeeld.push(entry.target);
    }
  });

  // de podcastsInBeeld array sturen naar de showElements function
  showElements(podcastsInBeeld);
});

// de podcasts toevoegen aan de observer
podcasts.forEach((podcast) => {
  observerPodcasts.observe(podcast);
});




// therapists observer

let therapistsInBeeld = []; 
// een timer om therapists in meerdere rijen samen na elkaar te laten verschijnen
let therapistsInBeeldTimer;

const observerTherapists = new IntersectionObserver((entries) => {
  // de timer van de vorige rij uitzetten als die nog niet is afgegaan
  // zodat de nieuwe rij aan dezelfde therapistsInBeeld array toegevoegd kan worden
  clearTimeout(therapistsInBeeldTimer);

  // alleen de therapists die in beeld zijn gekomen opslaan in de podcastsInBeeld array
  entries.forEach((entry) => {
    const intersecting = entry.isIntersecting;
    if(intersecting){
      therapistsInBeeld.push(entry.target);
    }
  });

  // een timer zetten voordat de showElements function wordt aangeroepen
  // daarmee wordt er gewacht 200ms gewacht op een eventueel volgende rij die in beeld scrollt
  therapistsInBeeldTimer = setTimeout(() => {
    showElements(therapistsInBeeld);
    // de therapistsInBeeld array leegmaken zodat de rijen bij langzaam scrollen een voor een in beeld kunnen komen
    therapistsInBeeld = [];
  }, 200);
});

therapists.forEach((therapist) => {
  observerTherapists.observe(therapist);
});

// bron: https://stackoverflow.com/questions/33977352/how-do-i-delay-a-function-executing-for-each-element-in-an-array-using-javascrip

function showElements(elements) {
  for(i=0; i<elements.length; i++ ) {
    (function(index){
    
      setTimeout(() => {
        elements[index].classList.add("inbeeld");
      }, index * 500); // de elemenetn komen 500ms na elkaar in beeld - kun je mee spelen

    })(i);
  }
}



// popup met behulp van https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
playbutton.forEach((button, index) => {
  button.addEventListener("click", () => {
    popup[index].showModal();
  });
});

closePopup.forEach((button, index) => {
  button.addEventListener("click", () => {
    popup[index].close();
  });
});

// geluid afspelen 
popupPlaybutton.forEach((button, index) => {
  button.addEventListener("click", function () {
    if (rickRoll.paused) {
      rickRoll.play();
      button.src = "pausebutton.png";  // Change to pause button
      console.log("Playing audio");
    } else {
      rickRoll.pause();
      button.src = "playbutton.png";  // Change back to play button
      console.log("Pausing audio");
    }
  });
});

