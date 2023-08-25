document.addEventListener('DOMContentLoaded', () => {
    let isDragging = false;
    let startX;

    document.querySelectorAll('.draggable').forEach(img => {
        img.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
        });

        img.addEventListener('mousemove', (e) => {
            if (isDragging) {
                let dx = e.clientX - startX;
                img.style.left = (img.offsetLeft + dx) + 'px';
                startX = e.clientX;
            }
        });

        img.addEventListener('mouseup', () => {
            isDragging = false;
        });

        img.addEventListener('mouseleave', () => {
            isDragging = false;
        });
    });
});
