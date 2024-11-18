let currentSection = 0; // Index for tracking the current section
const sections = document.querySelectorAll('.a'); // Select all sections with class 'a'

let isScrolling = false; // Flag to prevent multiple scroll actions in quick succession

// Handle mouse wheel scrolling for smooth transition
window.addEventListener('wheel', function(event) {
  // If scrolling is already in progress, do nothing (avoid overlap)
  if (isScrolling) return;

  // Prevent the default scroll behavior (we control the scrolling here)
  event.preventDefault();

  // Set the flag to block further scrolls while one is in progress
  isScrolling = true;

  // Determine the scroll direction (down or up)
  if (event.deltaY > 0) {
    // Scroll down: go to the next section
    currentSection = Math.min(currentSection + 1, sections.length - 1); // Don't exceed the last section
  } else {
    // Scroll up: go to the previous section
    currentSection = Math.max(currentSection - 1, 0); // Don't go before the first section
  }

  // Scroll to the appropriate section with smooth scrolling
  sections[currentSection].scrollIntoView({
    behavior: 'smooth',  // Smooth scroll
    block: 'start'       // Align the target section at the top
  });

  // Reset the flag after a 1-second delay (adjustable based on scroll speed)
  setTimeout(() => {
    isScrolling = false; // Allow the next scroll action
  }, 1000); // Adjust this duration based on how long the scroll should take
}, { passive: false }); // Make sure preventDefault can be called properly
