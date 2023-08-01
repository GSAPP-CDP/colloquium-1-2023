// REFERENCE: https://p5js.org/reference/#/p5/p5
// Draws a month of earthquake data as spikes around an invisible globe.

// Get the DOM element into which we'll put the P5.js sketch.
const elt = document.getElementById('p5-sketch1');

// Set any global parameters we need.
const radius = 150;


// Our data model for a single earthquake event.
class Quake {
    constructor (quakeRow, p) {
        // quakeRow is an instance from the loadTable call.
        this.longitude = quakeRow.getNum('Longitude');
        this.latitude = quakeRow.getNum('Latitude');
        this.magnitude = quakeRow.getNum('Magnitude');

        this.x1 = radius * p.cos(this.latitude) * p.cos(this.longitude);
        this.y1 = radius * p.cos(this.latitude) * p.sin(this.longitude);
        this.z1 = radius * p.sin(this.latitude);

        const r2 = radius + this.magnitude * 5;
        this.x2 = r2 * p.cos(this.latitude) * p.cos(this.longitude);
        this.y2 = r2 * p.cos(this.latitude) * p.sin(this.longitude);
        this.z2 = r2 * p.sin(this.latitude);
    }

    // Draw the quake. Since this is defined outside of the sketch1 global
    // method below, we have to pass in the p object to use the P5.js instance.
    draw (p) {
        p.line(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2);
    }
}


// This is the sketch. P5.js will pass in the P5 instance as the variable p,
// which we can use to call functions.
const sketch1 = p => {
    const quakes = []

    let quakesTable
    p.preload = () => {
        // Load the earthquake data.
        // Date,TimeUTC,Latitude,Longitude,Magnitude,Depth
        quakesTable = p.loadTable('earthquakes/earthquakes.csv', 'csv', 'header');
    }

    p.setup = () => {
        p.angleMode(p.DEGREES);

        const width = elt.getBoundingClientRect().width;
        const height = elt.getBoundingClientRect().height;
        p.createCanvas(width, height, p.WEBGL);

        // Create the camera.
        p.createEasyCam();
        // Disable the right-click context menu just for this DOM element.
        // It interferes with the default mouse events for the camera.
        elt.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        // Parse all the earthquake data!
        parseQuakes();
    }

    // Parse the earthquakes.csv file and make an array of Quake objects.
    function parseQuakes () {
        // Sample from the list of earthquakes for performance reasons.
        // It runs reasonably well in Chrome with a value of 2.
        // Change this to 1 to load all of the 7600-ish earthquakes.
        const skip = 2;

        for (let r = 0; r < quakesTable.getRowCount(); r+=skip) {
            try {
                const quakeRow = quakesTable.getRow(r);
                const q = new Quake(quakeRow, p);
                quakes.push(q);
            } catch (e) {
                // If the parsing fails, just skip that quake.
                // We'll deal with it later.
            }
        }

        console.log('Number of quakes loaded:', quakes.length);
    }

    p.draw = () => {
        p.background(p.color('black'));
        
        // Draw a sphere if desired. I think it looks cool without one.
        // p.stroke(p.color('gray'));
        // p.fill(p.color('darkgray'));
        // p.sphere(radius);
        
        p.stroke(p.color('red'));
        for (const quake of quakes) {
            quake.draw(p);
        }
    }
}

window.addEventListener('load', () => {
    new p5(sketch1, elt);
})

