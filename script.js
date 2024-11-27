let currentSection = 0;
const sections = document.querySelectorAll('.slide-section');

window.addEventListener('wheel', function (event) {
    if (event.deltaY > 0) {
        currentSection = Math.min(currentSection + 1, sections.length - 1);
    } else {
        currentSection = Math.max(currentSection - 1, 0);
    }

    sections[currentSection].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.sliding');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const box = document.querySelector('.box');
  let currentSlide = 0;

  function updateSlides() {
      slides.forEach((slide, index) => {
          slide.classList.remove('active'); 
      });
      slides[currentSlide].classList.add('active'); 

      if (currentSlide === slides.length - 1) {
          box.classList.add('end-position');
      } else {
          box.classList.remove('end-position');
      }
  }

  nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
  });

  prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
  });

  updateSlides();
});

const thumbnails = document.querySelectorAll('.Celebret');

// Get the main display image and description
const mainImage = document.getElementById('mainImage');
const imageDescription = document.getElementById('imageDescription');

// Add event listeners to each thumbnail image
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        const newSrc = event.target.src;
        
        const newDescription = event.target.getAttribute('data-description');
        
        mainImage.src = newSrc;
        
        imageDescription.textContent = newDescription;
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".slide-section"); 
    const animatedElements = document.querySelectorAll("[data-animate]"); 

    const observerOptions = {
        root: null, 
        threshold: 0.5, 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const animated = entry.target.querySelectorAll("[data-animate]");
                animated.forEach((element) => {
                    element.classList.remove("animated"); 
                    void element.offsetWidth; 
                    element.classList.add("animated"); 
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
});
