const sketch = p => {
    let horizontalSpacing = 40; 
    let verticalSpacing = 40;   
    let paragraph = "Exploratory visualization resonates with my practice, and the goal of developing alternatives to location intelligence platforms and systems. To me, this means not attempting to explain or predict using these data, but to question the underlying defaults of the data themselves, and explore towards alternatives. It means first learning about how the data are made, their limitations, and then developing arguments with them, against them, around them. Questioning the default settings with which these datasets are often visualized should also be a goal of my practice, and that’s where pushing the limits of the tools and methods used will be helpful, breaking down the rigidity of their particular data models to reveal something else. This process deploys exploration as a form of analysis — something more inductive.";
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
        const elt = document.getElementById('p5-sketch3');
        const width = elt.getBoundingClientRect().width;
        const height = elt.getBoundingClientRect().height;

        p.createCanvas(width, height);

        p.background(255);

        p.noLoop();

        styleText();  // Apply the text styling
    }

    function drawArcedLine(x1, y1, x2, y2) {
        p.beginShape();
        p.curveVertex(x1 - 10, y1);
        p.curveVertex(x1, y1);
        p.curveVertex(x2, y2);
        p.curveVertex(x2 + 10, y2);
        p.endShape();
    }

    p.draw = () => {
        p.background(255);

        let y = horizontalSpacing;

        // Place words along arced horizontal lines
        while (y < p.height && currentWordIndex < words.length) {
            let x = 0;

            // Draw arced horizontal line
            //p.stroke(255);
            //drawArcedLine(0, y, p.width, y);
           // p.noStroke();

            while (x < p.width && currentWordIndex < words.length) {
                let word = words[currentWordIndex];
                let wordWidth = p.textWidth(word);

                if (x + wordWidth < p.width) {
                    p.text(word, x, y);
                    x += wordWidth + 5;
                    currentWordIndex++;
                } else {
                    break;
                }
            }

            y += horizontalSpacing;
        }

        // Reset word index for vertical lines
        currentWordIndex = 0;

        // Place words along arced vertical lines
        for (let x = verticalSpacing; x < p.width; x += verticalSpacing) {
            y = 0;

            // Draw arced vertical line
            //p.stroke(255);
            //drawArcedLine(x, 0, x, p.height);
            //p.noStroke();

            while (y < p.height && currentWordIndex < words.length) {
                let word = words[currentWordIndex];
                let wordHeight = 10;

                if (y + wordHeight < p.height) {
                    p.push();
                    p.translate(x, y);
                    p.rotate(p.HALF_PI);
                    p.text(word, 0, 0);
                    p.pop();

                    y += wordHeight + 5;
                    currentWordIndex++;
                } else {
                    break;
                }
            }
        }
    }
}

window.addEventListener('load', () => {
    const elt = document.getElementById('p5-sketch3');
    new p5(sketch, elt);
});
