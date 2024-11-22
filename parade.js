let currentSection = 0;
const sections = document.querySelectorAll('.slide');

window.addEventListener('wheel', function(event) {
  if (event.deltaY > 0) {
    // Scroll down: move to the next section
    currentSection = Math.min(currentSection + 1, sections.length - 1);
  } else {
    // Scroll up: move to the previous section
    currentSection = Math.max(currentSection - 1, 0);
  }

  // Scroll to the selected section
  sections[currentSection].scrollIntoView({
    behavior: 'smooth',  // Smooth scrolling effect
    block: 'start'       // Align to the top of the screen
  });
});

const selectDragonBtn = document.getElementById('selectDragonBtn');
const dragons = document.querySelectorAll('.dragon');
const paradeArea = document.getElementById('paradeArea');
let selectedDragon = null;  // This will hold the selected dragon image

// When a dragon is clicked, mark it as selected
dragons.forEach(dragon => {
    dragon.addEventListener('click', () => {
        // Remove any existing selected dragon image in the parade area
        paradeArea.innerHTML = ''; // Clear parade area first
        selectedDragon = dragon.id; // Set the selected dragon's ID
    });
});

// When the "Select Dragon" button is clicked, add the selected dragon as an image in the parade
selectDragonBtn.addEventListener('click', () => {
    if (selectedDragon) {
        const selectedImg = document.getElementById(selectedDragon);
        const dragonImage = document.createElement('img');
        dragonImage.src = selectedImg.src;  // Use the selected image's source
        dragonImage.alt = selectedImg.alt;
        dragonImage.classList.add('parade-dragon');
        dragonImage.setAttribute('draggable', true);
        
        // Add the image to the parade area
        paradeArea.appendChild(dragonImage);

        // Make the newly added image draggable
        dragonImage.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.alt);  // Use alt as data identifier
        });
    }
});

// Allow the image to be dropped into the parade area
paradeArea.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
});

paradeArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');  // Get the image identifier
    const draggedImage = document.querySelector(`img[alt='${data}']`);
    
    if (draggedImage) {
        draggedImage.style.left = `${e.offsetX - draggedImage.offsetWidth / 2}px`;  // Center the image at the drop location
        draggedImage.style.top = `${e.offsetY - draggedImage.offsetHeight / 2}px`;  // Adjust top position
    }
});

document.querySelectorAll('.dragon').forEach(dragon => {
    dragon.addEventListener('click', function() {
        const parade = document.querySelector('.parade');
        const selectedDragon = this.cloneNode(true);
        selectedDragon.style.position = 'absolute';
        selectedDragon.style.width = '100px';  // Set the size of the dragon image
        selectedDragon.style.height = 'auto';
        selectedDragon.style.cursor = 'move'; // Allow drag
        parade.appendChild(selectedDragon);  // Add the image to the parade
    });
});