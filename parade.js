let currentSection = 0;
const sections = document.querySelectorAll('.slide');

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

const selectDragonBtn = document.getElementById('selectDragonBtn');
const dragons = document.querySelectorAll('.dragon');
const paradeArea = document.getElementById('paradeArea');
const paradeButtons = document.getElementById('paradeButtons');
let selectedDragon = null;

// Highlight the selected dragon
dragons.forEach(dragon => {
    dragon.addEventListener('click', () => {
        // Remove highlight from all dragons
        dragons.forEach(d => d.classList.remove('selected'));
        dragon.classList.add('selected'); // Highlight selected dragon
        selectedDragon = dragon.id; // Save selected dragon ID
    });
});

// Add a button for the selected dragon
selectDragonBtn.addEventListener('click', () => {
    if (selectedDragon) {
        const existingButton = document.getElementById(`${selectedDragon}-button`);
        if (!existingButton) {
            // Create a button for the selected dragon
            const button = document.createElement('button');
            button.id = `${selectedDragon}-button`;
            button.textContent = `Add ${selectedDragon}`;
            paradeButtons.appendChild(button);

            // Add event listener to place the dragon in the parade
            button.addEventListener('click', () => {
                const selectedImg = document.getElementById(selectedDragon);
                const dragonImage = document.createElement('img');
                dragonImage.src = selectedImg.src;
                dragonImage.alt = selectedImg.alt;
                dragonImage.classList.add('parade-dragon');
                dragonImage.setAttribute('draggable', true);

                // Append dragon to parade
                paradeArea.querySelector('.parade').appendChild(dragonImage);

                // Make the image draggable
                dragonImage.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', e.target.alt);
                });
            });
        }
    }
});

// Handle drag and drop in the parade area
paradeArea.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
});

paradeArea.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const draggedImage = document.querySelector(`img[alt='${data}']`);
    if (draggedImage) {
        draggedImage.style.left = `${e.offsetX - draggedImage.offsetWidth / 2}px`;
        draggedImage.style.top = `${e.offsetY - draggedImage.offsetHeight / 2}px`;
    }
});