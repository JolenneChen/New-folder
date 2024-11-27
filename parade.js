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
        dragon.classList.add('selected'); 
        selectedDragon = dragon.id; 
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
    const parade = document.getElementById("parade");

    // Allow dropping dragons into the parade area
    parade.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    parade.addEventListener("drop", (e) => {
        e.preventDefault();

        // Get the dragged dragon's data
        const dragonId = e.dataTransfer.getData("text/plain");
        const draggedDragon = document.querySelector(`#${dragonId}`);

        if (!draggedDragon) return;

        // Create a container for the dropped dragon
        const dragonContainer = document.createElement("div");
        dragonContainer.classList.add("parade-dragon");
        dragonContainer.style.left = `${e.offsetX}px`;
        dragonContainer.style.top = `${e.offsetY}px`;

        // Create the image element for the dragon
        const dragonImg = document.createElement("img");
        dragonImg.src = draggedDragon.src;
        dragonImg.alt = draggedDragon.alt;

        // Create the resize handle
        const resizeHandle = document.createElement("div");
        resizeHandle.classList.add("resize-handle");

        // Add elements to the container
        dragonContainer.appendChild(dragonImg);
        dragonContainer.appendChild(resizeHandle);
        parade.appendChild(dragonContainer);

        // Make the dragon draggable inside the parade
        makeDraggable(dragonContainer);
        enableResizing(dragonContainer);
    });

    // Function to enable dragging within the parade
    function makeDraggable(dragonContainer) {
        dragonContainer.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("resize-handle")) return; 

            const shiftX = e.clientX - dragonContainer.getBoundingClientRect().left;
            const shiftY = e.clientY - dragonContainer.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                dragonContainer.style.left = `${pageX - shiftX}px`;
                dragonContainer.style.top = `${pageY - shiftY}px`;
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
    }

    // Function to enable resizing of dragons
    function enableResizing(dragonContainer) {
        const resizeHandle = dragonContainer.querySelector(".resize-handle");

        resizeHandle.addEventListener("mousedown", (e) => {
            e.stopPropagation(); // Prevent interfering with drag

            const initialWidth = dragonContainer.offsetWidth;
            const initialHeight = dragonContainer.offsetHeight;
            const initialX = e.clientX;
            const initialY = e.clientY;

            function onMouseMove(event) {
                const newWidth = initialWidth + (event.clientX - initialX);
                const newHeight = initialHeight + (event.clientY - initialY);

                dragonContainer.style.width = `${newWidth}px`;
                dragonContainer.style.height = `${newHeight}px`;
            }

            document.addEventListener("mousemove", onMouseMove);

            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    let selectedDragon = null; // Track the selected dragon

    // Selecting a dragon from the second section
    const dragonThumbnails = document.querySelectorAll(".dragon");
    dragonThumbnails.forEach((dragon) => {
        dragon.addEventListener("click", () => {
            selectedDragon = dragon;
        });
    });

    // Add the selected dragon to the parade
    const addDragonBtn = document.getElementById("addDragonBtn");
    const parade = document.getElementById("parade");

    addDragonBtn.addEventListener("click", () => {
        if (!selectedDragon) {
            alert("Please select a dragon first!");
            return;
        }

        // Create a container for the dragon
        const dragonContainer = document.createElement("div");
        dragonContainer.classList.add("parade-dragon");
        dragonContainer.style.left = "50px"; 
        dragonContainer.style.top = "50px";
        dragonContainer.style.width = "150px"
        dragonContainer.style.height = "150px"

        // Create the dragon image
        const dragonImg = document.createElement("img");
        dragonImg.src = selectedDragon.src;
        dragonImg.alt = selectedDragon.alt;

        // Create the resize handle
        const resizeHandle = document.createElement("div");
        resizeHandle.classList.add("resize-handle");

        // Append dragon and resize handle to the container
        dragonContainer.appendChild(dragonImg);
        dragonContainer.appendChild(resizeHandle);

        // Append the container to the parade area
        parade.appendChild(dragonContainer);

        // Make the dragon draggable and resizable
        makeDraggable(dragonContainer);
        enableResizing(dragonContainer);
    });

    // Function to make dragons draggable
    function makeDraggable(dragonContainer) {
        dragonContainer.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("resize-handle")) return; 

            const shiftX = e.clientX - dragonContainer.getBoundingClientRect().left;
            const shiftY = e.clientY - dragonContainer.getBoundingClientRect().top;

            function moveAt(pageX, pageY) {
                dragonContainer.style.left = `${pageX - shiftX}px`;
                dragonContainer.style.top = `${pageY - shiftY}px`;
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
    }

    // Function to enable resizing of dragons
    function enableResizing(dragonContainer) {
        const resizeHandle = dragonContainer.querySelector(".resize-handle");

        resizeHandle.addEventListener("mousedown", (e) => {
            e.stopPropagation();

            const initialWidth = dragonContainer.offsetWidth;
            const initialHeight = dragonContainer.offsetHeight;
            const initialX = e.clientX;
            const initialY = e.clientY;

            function onMouseMove(event) {
                const newWidth = initialWidth + (event.clientX - initialX);
                const newHeight = initialHeight + (event.clientY - initialY);

                dragonContainer.style.width = `${newWidth}px`;
                dragonContainer.style.height = `${newHeight}px`;
            }

            document.addEventListener("mousemove", onMouseMove);

            document.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const dragonThumbnails = document.querySelectorAll(".dragon");
    const section2 = document.getElementById("section2");

    // Object that maps each thumbnail ID to a background color
    const dragonColors = {
        dragon1: "#ff6347",
        dragon2: "#3b8c42", 
        dragon3: "#f39c12", 
    };

    // Object that maps each thumbnail ID to a background image
    const dragonImages = {
        dragon1: "url('mp3/dragon1.png')", 
        dragon2: "url('mp3/dragon2.png')",  
        dragon3: "url('mp3/dragon3.png')", 
    };

    // Function to change the background color and image
    function changeDragonBackground(imageSrc, bgColor) {
        // Add background properties to prevent repetition and adjust the image
        section2.style.backgroundImage = imageSrc;
        section2.style.backgroundColor = bgColor;
        section2.style.backgroundRepeat = "no-repeat";
        section2.style.backgroundSize = "cover"; 
        section2.style.backgroundPosition = "center"; 

        // Start the slide-up transition (from bottom to top)
        setTimeout(() => {
            section2.style.transform = "translateY(0)"; 
        }, 500); 
    }

    // Event listener for each dragon thumbnail
    dragonThumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            const thumbnailId = thumbnail.id; 
            const imageSrc = dragonImages[thumbnailId]; 
            const bgColor = dragonColors[thumbnailId]; 

            // Change the background color and image based on the clicked dragon
            changeDragonBackground(imageSrc, bgColor);
        });
    });

    // Optional: Handle the "Select Dragon" button
    const selectDragonBtn = document.getElementById("selectDragonBtn");
    selectDragonBtn.addEventListener("click", () => {
        alert("Lion selected!"); 
    });
});
