let currentSection = 0;
const sections = document.querySelectorAll('section');

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