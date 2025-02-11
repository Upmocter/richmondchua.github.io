document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector("nav");

    window.addEventListener("scroll", function () {
        if (window.scrollY === 0) {
            nav.style.opacity = "1";
            nav.style.right = "0"; 
        } else {
            nav.style.opacity = "0.5";  // Keep it faintly visible
            nav.style.right = "-170px";  // Keep it slightly visible so users can hover
        }
    });

    // When the user hovers, make it fully visible
    nav.addEventListener("mouseenter", function () {
        nav.style.opacity = "1";
        nav.style.right = "0";
    });

    // When the user moves the mouse away, return to hidden state (unless at top)
    nav.addEventListener("mouseleave", function () {
        if (window.scrollY > 0) {
            nav.style.opacity = "0.5";
            nav.style.right = "-170px";
        }
    });
});

const slider = document.querySelector(".image-container");
const leftBtn = document.querySelector(".left-btn p");
const rightBtn = document.querySelector(".right-btn p");
const slides = document.querySelectorAll(".beautella-image");
const numberOfSlides = slides.length;
var slideNumber = 0;


rightBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideNumber++;

    if(slideNumber > (numberOfSlides - 1)){
        slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
});

leftBtn.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slideNumber--;

    if(slideNumber < 0){
        slideNumber = numberOfSlides - 1;
    }

    slides[slideNumber].classList.add("active");
});

var playSlider;

var repeater = () => {
    playSlider = setInterval(function(){
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
    
        slideNumber++;
    
        if(slideNumber > (numberOfSlides - 1)){
            slideNumber = 0;
        }
    
        slides[slideNumber].classList.add("active");
    }, 4000);
}

repeater();

slider.addEventListener("mouseover", () => {
    clearInterval(playSlider);
});

slider.addEventListener("mouseout", () => {
    repeater();
});


