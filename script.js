let currentSlide = 0;
let slideInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const texts = document.querySelectorAll('.text');


    texts[currentSlide].style.opacity = 0;
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;


    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;

    setTimeout(() => {
        texts[currentSlide].style.opacity = 1;
    }, 500);

    resetSlideInterval();
}


function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), 4000); 
}


document.querySelectorAll('.text')[currentSlide].style.opacity = 1;

slideInterval = setInterval(() => {
    changeSlide(1);
}, 4000);

const navbar = document.querySelector('.navbar');


function handleScroll() {
    if (window.scrollY > 50) { 
        navbar.classList.add('shrink'); 
        //navbar.classList.add('transparent');
    } else {
        navbar.classList.remove('shrink'); 
        //navbar.classList.remove('transparent');
    }
}


window.addEventListener('scroll', handleScroll);



const elementsToShow = document.querySelectorAll('.hidden');


const options = {
    root: null, 
    rootMargin: '0px',
    threshold: 0.1 
};

const callback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); 
            observer.unobserve(entry.target); 
        }
    });
};

const observer = new IntersectionObserver(callback, options);


elementsToShow.forEach(element => {
    observer.observe(element);
});

function countUp(element, target, duration) {
    const start = parseInt(element.innerText, 10);
    const startTimestamp = performance.now();
    

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function update(timestamp) {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1); 
        const easedProgress = easeOutQuad(progress); 
        element.innerText = Math.floor(start + (target - start) * easedProgress);
        if (progress < 1) {
            requestAnimationFrame(update); 
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector('.stats');
    let hasAnimated = false;


    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; 
                countUp(document.getElementById("count1"), 37, 2000); 
                countUp(document.getElementById("count2"), 65, 2000); 
                countUp(document.getElementById("count3"), 35, 2000);
            }
        });
    });


    observer.observe(statsSection);
});


document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('#mainContent > div');
    sections.forEach(section => section.style.display = 'none');

    // Afișează secțiunea "Introducere" la început
    //const homeContent = document.getElementById('homeContent');
    //homeContent.style.display = 'block';
    //homeContent.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('homeBtn').addEventListener('click', function() {
        showContent('homeContent');
    });

    document.getElementById('imagesBtn').addEventListener('click', function() {
        showContent('imagesContent');
    });

    document.getElementById('videoBtn').addEventListener('click', function() {
        showContent('videoContent');
    });

    document.getElementById('catalogBtn').addEventListener('click', function() {
        showContent('catalogContent');
    });

    document.getElementById('integritate').addEventListener('click', function() {
        showContent('personalitatiContent');
    });
});

function showContent(contentId) {
    const sections = document.querySelectorAll('#mainContent > div');

    // Ascunde toate secțiunile
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Afișează secțiunea dorită
    const activeSection = document.getElementById(contentId);
    activeSection.style.display = 'block';
    activeSection.scrollIntoView({ behavior: 'smooth' });
}



const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});