const sketch2 = p => {
    let cols, rows;
    let spacing = 35;
    let elevation = [];
    let paragraph = "I’m inflecting my approach to data gathering with the work of Yani Loukissas and Johanna Drucker (among other data and media scholars, and historians of science and technology) who emphasize the importance of considering “data settings” (Loukissas) and that data are always taken or captured from a particular context, never given (Drucker). Data are only ever situated, partial, and constructed bits of information and are never whole, representative, or containing innate knowledge or factual bearing on their own. An approach to data gathering should reflect that."; // truncated for brevity
    let words = paragraph.split(" ");
    let currentWordIndex = 0;

    function styleText() {
        p.textFont('acumin-pro');  // Set the font: acumin-pro, interstate-mono, proforma
        p.textSize(16);             
        p.fill(50);                
        p.noStroke();              
        p.textStyle(p.NORMAL);       
    }

    p.setup = () => {
        const elt = document.getElementById('p5-sketch2');
        const width = elt.getBoundingClientRect().width;
        const height = elt.getBoundingClientRect().height;

        p.createCanvas(width, height);
        cols = p.width / spacing;
        rows = p.height / spacing;

        for (let x = 0; x < cols; x++) {
            elevation[x] = [];
            for (let y = 0; y < rows; y++) {
                elevation[x][y] = p.noise(x * 0.1, y * 0.1) * 100;
            }
        }

        p.noLoop();

        styleText();  // Apply the text styling
    }

    p.draw = () => {
        p.background(255);

        for (let x = 0; x < cols - 1; x++) {
            for (let y = 0; y < rows - 1; y++) {
                let x1 = x * spacing;
                let y1 = y * spacing;
                let x2 = x * spacing;
                let y2 = (y + 1) * spacing;

                let elev1 = elevation[x][y];
                let elev2 = elevation[x][y + 1];

                if (Math.floor(elev1 / 10) !== Math.floor(elev2 / 10)) {
                    let lerpAmount = (10 - (elev1 % 10)) / (elev2 - elev1);
                    let ly = p.lerp(y1, y2, lerpAmount);
                    p.line(x1, ly, x2, ly);

                    if (currentWordIndex < words.length) {
                        let word = words[currentWordIndex];
                        let wordWidth = p.textWidth(word);

                        if (x1 + wordWidth < p.width) {
                            p.text(word, x1, ly);
                            x1 += wordWidth + 5;
                            currentWordIndex++;
                        }
                    }
                }
            }
        }
    }
}

window.addEventListener('load', () => {
    const elt = document.getElementById('p5-sketch2');
    new p5(sketch2, elt);
});
