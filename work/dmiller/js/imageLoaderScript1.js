const canvas = document.getElementById('image1');
const ctx = canvas.getContext('2d');

let images = [];
let positions = [];
let scales = [];
let draggingImage = null;
let hoveredImageIndex = null;
let lastX, lastY;
let zoom = 1;

const imagePaths = [
    'media/images1/Admassu AashwitaYadav DanMiller JohnMaxGrenuwaldIII 04.jpg',
    'media/images1/ASS2_G2.gif',
    'media/images1/CDP Layne DanMiller_SU22_LastMile_3-sm.gif',
    'media/images1/mhny.png',
    'media/images1/situ-research-amnestyrohingya-spatial-analysis-15.jpg',
    'media/images1/situ-research-maidan-spatial-analysis-11.jpg',
    'media/images1/situ-research-where-the-bodies-spatial-analysis-1.jpg',
    'media/images1/social-explorer.png',
    'media/images1/VS-Begley-DanMiller-SP2023-04.jpg'
    // ... add more paths as needed
];

const captions = [
    'Immeasurable Sites',
    'CDP Colloquium I',
    'Notes on the Last Mile',
    'Mapping Historical New York',
    'Mapping Crimes Against the Ronhinya',
    'Euromaidan Event Reconstruction',
    'Where the Bodies Are Buried',
    'Social Explorer',
    'Points Unknown'
    // ... add more captions as needed
];

let selectedImageIndex = null;

function adjustCanvasResolution() {
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
}

adjustCanvasResolution();

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

imagePaths.forEach(path => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
        let scale = Math.random() * 0.15 + 0.1;
        scales.push(scale);

        let posX = Math.random() * (canvas.width - img.width * scale);
        let posY = Math.random() * (canvas.height - img.height * scale);
        positions.push({ x: posX, y: posY });
        images.push(img);
        draw();
    };
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const pos = positions[i];
        const scale = scales[i] * zoom;

        const drawX = pos.x * zoom;
        const drawY = pos.y * zoom;
        const drawWidth = img.width * scale * zoom;
        const drawHeight = img.height * scale * zoom;

        if (i === hoveredImageIndex) {
            // Example: Draw a shadow around the hovered image
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
        } else {
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

        if (i === selectedImageIndex) {
            ctx.fillStyle = 'black';
            ctx.font = '20px Arial';
            ctx.fillText(captions[i], drawX, drawY + drawHeight + 25);
        }
    }
}


canvas.addEventListener('mousedown', (e) => {
    const pos = getMousePos(canvas, e);
    lastX = pos.x;
    lastY = pos.y;
    selectedImageIndex = null;

    for (let i = images.length - 1; i >= 0; i--) {
        const img = images[i];
        const imgPos = positions[i];
        const scale = scales[i] * zoom;

        const leftBound = imgPos.x * zoom;
        const rightBound = leftBound + img.width * scale * zoom;
        const topBound = imgPos.y * zoom;
        const bottomBound = topBound + img.height * scale * zoom;

        if (pos.x >= leftBound && pos.x <= rightBound && pos.y >= topBound && pos.y <= bottomBound) {
            draggingImage = i;
            selectedImageIndex = i;
            break;
        }
    }

    draw();
});

canvas.addEventListener('mouseup', () => {
    draggingImage = null;
    draw();
});

canvas.addEventListener('mousemove', (e) => {
    const pos = getMousePos(canvas, e);
    if (draggingImage !== null) {
        const dx = pos.x - lastX;
        const dy = pos.y - lastY;
        positions[draggingImage].x += dx;
        positions[draggingImage].y += dy;
        lastX = pos.x;
        lastY = pos.y;
        draw();
    }
});


canvas.addEventListener('wheel', (e) => {
    const pos = getMousePos(canvas, e);
    const mouseX = pos.x;
    const mouseY = pos.y;

    const oldZoom = zoom;
    zoom += e.deltaY * -0.001;
    zoom = Math.max(0.1, Math.min(zoom, 5));
    const zoomFactor = zoom / oldZoom;

    for (let i = 0; i < positions.length; i++) {
        positions[i].x = (positions[i].x - mouseX) * zoomFactor + mouseX;
        positions[i].y = (positions[i].y - mouseY) * zoomFactor + mouseY;
    }

    draw();
});