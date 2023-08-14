const sketch4 = p => {
    let globeRadius = 300;
    let paragraph = "I am also asking: can you learn through creative synthesis of seemingly disparate collections of information? By bringing these data together with others, there will be even more to explore and reveal about what constitutes digitized location intelligence.";
    
    function styleText() {
        p.textFont('acumin-pro');  // Set the font: acumin-pro, interstate-mono, proforma
        p.textSize(16);             
        p.fill(50);                
        p.noStroke();              
        p.textStyle(p.NORMAL); 
    }

    p.setup = () => {
        const elt = document.getElementById('p5-sketch4');
        const width = elt.getBoundingClientRect().width;
        const height = elt.getBoundingClientRect().height;

        p.createCanvas(width, height);
        p.background(255);
        p.noLoop();

        styleText();  // Apply the text styling
    }

    function wrapTextOnGlobe(txt) {
        let words = txt.split(' ');
        let lineHeight = 14;
        let yOff = -globeRadius + lineHeight; // Start near the top of the globe

        for (let i = 0; i < words.length; i++) {
            let line = words[i];
            let nextWord = words[i + 1];

            while (nextWord && p.textWidth(line + ' ' + nextWord) < 2 * p.PI * (globeRadius + yOff)) {
                line += ' ' + nextWord;
                i++;
                nextWord = words[i + 1];
            }

            if (Math.abs(yOff) < globeRadius) { // Ensure we're within the globe's boundaries
                drawArcText(line, yOff);
            }
            yOff += lineHeight;
        }
    }

    function drawArcText(txt, yOff) {
        let len = txt.length;
        let angleSpacing = p.TWO_PI / len;
        let currentAngle = -p.PI / 2 - angleSpacing * len / 2; // Start from the leftmost point

        for (let char of txt) {
            let x = p.width / 2 + (globeRadius + yOff) * p.cos(currentAngle);
            let y = p.height / 2 + (globeRadius + yOff) * p.sin(currentAngle);

            p.push();
            p.translate(x, y);
            p.rotate(currentAngle + p.HALF_PI); // Rotate the text to align with the tangent of the circle
            p.text(char, 0, 0);
            p.pop();
            
            currentAngle += angleSpacing;
        }
    }
    p.draw = () => {
                // Draw the globe
                p.fill(255); // A blue color
                p.ellipse(p.width / 2, p.height / 2, globeRadius * 2);
                styleText();
                wrapTextOnGlobe(paragraph);
    }
}

window.addEventListener('load', () => {
    const elt = document.getElementById('p5-sketch4');
    new p5(sketch4, elt);
});
