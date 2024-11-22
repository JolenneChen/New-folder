let currentSection = 0;
const sections = document.querySelectorAll('.a');

window.addEventListener('wheel', function(event) {
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
  const slides = document.querySelectorAll('.sliding'); // Select all slides
  const prevButton = document.querySelector('.prev');  // Previous button
  const nextButton = document.querySelector('.next');  // Next button
  const box = document.querySelector('.box');          // The box to reposition
  let currentSlide = 0;                                // Index of the current slide

  // Function to update slides
  function updateSlides() {
      slides.forEach((slide, index) => {
          slide.classList.remove('active'); // Hide all slides
      });
      slides[currentSlide].classList.add('active'); // Show the current slide

      // Check if on the last slide and update the box position
      if (currentSlide === slides.length - 1) {
          box.classList.add('end-position'); // Add class for new position
      } else {
          box.classList.remove('end-position'); // Remove class for default position
      }
  }

  // Move to the next slide
  nextButton.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length; // Wrap around if at the end
      updateSlides();
  });

  // Move to the previous slide
  prevButton.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length; // Wrap around if at the beginning
      updateSlides();
  });

  // Initialize the slider
  updateSlides();
});


const thumbnails = document.querySelectorAll('.Celebret');

// Get the main display image
const mainImage = document.getElementById('mainImage');

// Add event listeners to each thumbnail image
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', (event) => {
        // Get the src of the clicked thumbnail
        const newSrc = event.target.src;
        
        // Change the src of the main image to the clicked thumbnail's image
        mainImage.src = newSrc;
    });
});