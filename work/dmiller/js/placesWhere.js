const canvas2 = document.getElementById('placesWhere');
const ctx2 = canvas2.getContext('2d');

const phrases = [
    'A place where it rains',
    'A place where it rains',
    'A place where it rains',
    'A place where is does not rain',
    'A place where it rains'
];

let placedPhrases = [];

canvas2.addEventListener('click', (e) => {
    const pos = getMousePos(canvas2, e);
    const phrase = getRandomPhrase();
    placedPhrases.push({ text: phrase, x: pos.x, y: pos.y });
    draw();
});

function getMousePos(canvas2, evt) {
    const rect = canvas2.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

function draw() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.font = '20px Arial';
    ctx2.fillStyle = 'black';
    placedPhrases.forEach(phrase => {
        ctx2.fillText(phrase.text, phrase.x, phrase.y);
    });
}

// Initial draw to show the empty canvas
draw();
