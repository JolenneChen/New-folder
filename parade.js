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

document.addEventListener("DOMContentLoaded", () => {
    const dragonThumbnails = document.querySelectorAll(".dragon");
    const paradeArea = document.getElementById("paradeArea");
    const parade = document.getElementById("parade");

    // Object that maps each thumbnail ID to an image
    const dragonImages = {
        dragon1: "url('mp3/dog.png')",
        dragon2: "url('mp3/ox.png')",
        dragon3: "url('mp3/tiger.png')",
    };

    let selectedDragon = null; // To keep track of the selected dragon

    // Make the dragons draggable
    dragonThumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", (e) => {
            // If a dragon is already selected, deselect it
            if (selectedDragon) {
                selectedDragon.classList.remove('selected'); // Optional: Remove visual indication of selection
            }
            // Set the selected dragon
            selectedDragon = e.target;
            selectedDragon.classList.add('selected'); // Optional: Add visual indication of selection
        });

        thumbnail.addEventListener("dragstart", (e) => {
            if (selectedDragon !== e.target) {
                e.preventDefault(); // Prevent dragging if the dragon isn't selected
                return;
            }

            // Store the ID of the selected dragon in the dataTransfer
            e.dataTransfer.setData("text/plain", e.target.id); // Store the ID of the selected dragon
        });
    });

    // Handle drag and drop in the parade area
    paradeArea.addEventListener("dragover", (e) => {
        e.preventDefault(); // Allow dropping
    });

    paradeArea.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain"); // Get the dragged item’s ID
        const draggedImage = document.querySelector(`#${data}`); // Find the corresponding image by ID
        
        if (draggedImage) {
            // Create a new image element in the parade
            const paradeDragon = document.createElement("img");
            paradeDragon.src = draggedImage.src;
            paradeDragon.alt = draggedImage.alt;
            paradeDragon.classList.add("parade-dragon");
            paradeDragon.style.left = `${e.offsetX - 50}px`; // Center the image on click
            paradeDragon.style.top = `${e.offsetY - 50}px`;

            // Add the dragon to the parade area
            parade.appendChild(paradeDragon);

            // Now make the image movable inside the parade area
            makeDragonMovable(paradeDragon);
        }
    });

    // Function to make a dragon movable in the parade area
    function makeDragonMovable(dragon) {
        let isDragging = false;
        let offsetX, offsetY;

        // Mouse down event to start dragging
        dragon.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - dragon.offsetLeft;  // Get the initial offset relative to the mouse
            offsetY = e.clientY - dragon.offsetTop;
            dragon.style.cursor = 'grabbing'; // Change cursor to indicate dragging
        });

        // Mouse move event to move the dragon
        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                dragon.style.left = `${e.clientX - offsetX}px`;  // Update left position of the dragon
                dragon.style.top = `${e.clientY - offsetY}px`;   // Update top position of the dragon
            }
        });

        // Mouse up event to stop dragging
        window.addEventListener('mouseup', () => {
            isDragging = false;
            dragon.style.cursor = 'grab';  // Change cursor back to normal
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const dragonThumbnails = document.querySelectorAll(".dragon");
    const section2 = document.getElementById("section2"); // The whole section

    // Object that maps each thumbnail ID to a background color
    const dragonColors = {
        dragon1: "#ff6347", // Red for Dragon 1
        dragon2: "#3b8c42", // Green for Dragon 2
        dragon3: "#f39c12", // Orange for Dragon 3
    };

    // Object that maps each thumbnail ID to a background image
    const dragonImages = {
        dragon1: "url('mp3/dog.png')", // Dragon 1 image
        dragon2: "url('mp3/ox.png')",  // Dragon 2 image
        dragon3: "url('mp3/tiger.png')", // Dragon 3 image
    };

    // Function to change the background color and image
    function changeDragonBackground(imageSrc, bgColor) {
        // Add background properties to prevent repetition and adjust the image
        section2.style.backgroundImage = imageSrc;
        section2.style.backgroundColor = bgColor;
        section2.style.backgroundRepeat = "no-repeat"; // Prevent the background from repeating
        section2.style.backgroundSize = "cover"; // Ensure the image covers the entire section
        section2.style.backgroundPosition = "center"; // Center the image within the section

        // Start the slide-up transition (from bottom to top)
        setTimeout(() => {
            section2.style.transform = "translateY(0)"; // Slide up
        }, 500); // After a slight delay for smooth transition
    }

    // Event listener for each dragon thumbnail
    dragonThumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            const thumbnailId = thumbnail.id; // Get the clicked thumbnail's id
            const imageSrc = dragonImages[thumbnailId]; // Get the image source from the mapping
            const bgColor = dragonColors[thumbnailId]; // Get the background color from the mapping

            // Change the background color and image based on the clicked dragon
            changeDragonBackground(imageSrc, bgColor);
        });
    });

    // Optional: Handle the "Select Dragon" button
    const selectDragonBtn = document.getElementById("selectDragonBtn");
    selectDragonBtn.addEventListener("click", () => {
        alert("Dragon selected!"); // You can add any additional functionality here
    });
});
