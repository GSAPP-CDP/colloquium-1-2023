let isDragging = false;
let startX = 0;
let startY = 0;
let currentRotationY = 0;
let currentRotationX = 0;
let lastRotationY = 0;
let lastRotationX = 0;

const carousel = document.getElementById('carousel');

carousel.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
});

window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    const x = event.clientX;
    const y = event.clientY;

    const movementX = x - startX;
    const movementY = y - startY;

    currentRotationY = lastRotationY + movementX / 3; // sensitivity adjustment for horizontal rotation
    currentRotationX = lastRotationX - movementY / 3; // sensitivity adjustment for vertical rotation

    carousel.style.transform = `rotateY(${currentRotationY}deg) rotateX(${currentRotationX}deg)`;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    lastRotationY = currentRotationY;
    lastRotationX = currentRotationX;
});

window.addEventListener('mouseleave', () => {
    isDragging = false;
    lastRotationY = currentRotationY;
    lastRotationX = currentRotationX;
});


// Get all the modals
const modals = document.querySelectorAll(".modal");

// Get all the figures
const figures = document.querySelectorAll("#carousel figure");

// Add a click event listener to every figure
figures.forEach(figure => {
    figure.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal-id');
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    });
});

// Close modal when clicking on the overlay (outside the modal content)
modals.forEach(modal => {
    modal.onclick = function() {
        modal.style.display = "none";
    }

    const content = modal.querySelector(".modal-content");
    content.onclick = function(event) {
        event.stopPropagation(); // Prevents the event from reaching the modal overlay
    }
});





