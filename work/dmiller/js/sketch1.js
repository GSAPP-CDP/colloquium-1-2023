const sketch1 = p => {
    let cols, rows;
    let spacing = 30;
    let elevation = [];
    let paragraph = "When is it necessary to craft data, to make or remake them, alongside the process of collecting, downloading, and gathering? I’m interested in ways of intervening in and expanding notions of “location intelligence”, in a digitized sense, and that will involve intentionally shifting what is considered default in spatial data. It will involve appropriating existing and widely utilized datasets, reading and analyzing them against the grain. It will involve looking to difficult- and /or impossible-to-map collections of information and regarding them as data, to test, explore, and learn from what they can and cannot measure, quantify and represent. It will involve making data and systems to archive and disseminate them that engender new political, aesthetic, and spatial possibilities. What if spatial data and the maps that represent them reflected the experiential, qualitative, and humanistic dimensions of place and space?"; // truncated for brevity
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
        const elt = document.getElementById('p5-sketch1');
        const width = elt.getBoundingClientRect().width;
        const height = elt.getBoundingClientRect().height;

        p.createCanvas(width, height);
        p.background(255);
        p.noLoop();

        styleText();  // Apply the text styling

        cols = p.floor(width / spacing);
        rows = p.floor(height / spacing);

        // Generate elevation data
        for (let x = 0; x < cols; x++) {
            elevation[x] = [];
            for (let y = 0; y < rows; y++) {
                elevation[x][y] = p.noise(x * 0.1, y * 0.1) * 100;
            }
        }

        // Place words along contour lines
        for (let y = 0; y < rows && currentWordIndex < words.length; y++) {
            let x = 0;
            while (x < cols && currentWordIndex < words.length) {
                let word = words[currentWordIndex];
                let wordWidth = p.textWidth(word);

                if (x * spacing + wordWidth < p.width) {
                    p.text(word, x * spacing, y * spacing + elevation[x][y]);
                    x += p.floor(wordWidth / spacing) + 1;
                    currentWordIndex++;
                } else {
                    break;
                }
            }
        }
    }

    p.draw = () => {
        // The drawing is done in setup, so this can be left empty.
    }
}

window.addEventListener('load', () => {
    const elt = document.getElementById('p5-sketch1');
    new p5(sketch1, elt);
});
