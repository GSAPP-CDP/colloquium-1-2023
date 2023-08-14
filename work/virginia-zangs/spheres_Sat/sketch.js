
let satellites = [];
let displaySpheres = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stroke(255); // Set line color to white
  noFill(); // Disable fill color
  background(0); // Set background color to black

  // Create satellites
  for(let i = 0; i < 500; i++){
    let axis = createVector(random(-1, 1), random(-1, 1), random(-1, 1)).normalize();
    satellites[i] = new Satellite(150, 0.05, axis); // Set constant speed
  }
  let scaleFactor = 5;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
}

function draw() {
  background(0); // Ensure background remains black after each draw

  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Draw spheres if displaySpheres is true
  if(displaySpheres) {
    let total = 15; // Adjust this number for more or fewer lines
    let radiuses = [100, 70, 50]; // Array of sphere radii for layers

    // Draw spheres for each radius
    for(let r = 0; r < radiuses.length; r++){
      let radius = radiuses[r];

      // Latitude lines
      for(let i = 0; i < total; i++){
        let lat = map(i, 0, total, 0, PI);
        beginShape();
        for(let j = 0; j <= total; j++){
          let lon = map(j, 0, total, 0, TWO_PI);
          let x = radius * sin(lat) * cos(lon);
          let y = radius * sin(lat) * sin(lon);
          let z = radius * cos(lat);
          vertex(x, y, z);
        }
        endShape(CLOSE);
      }

      // Longitude lines
      for(let i = 0; i < total; i++){
        let lon = map(i, 0, total, 0, TWO_PI);
        beginShape();
        for(let j = 0; j <= total; j++){
          let lat = map(j, 0, total, 0, PI);
          let x = radius * sin(lat) * cos(lon);
          let y = radius * sin(lat) * sin(lon);
          let z = radius * cos(lat);
          vertex(x, y, z);
        }
        endShape();
      }
    }
  }

  // Update and display satellites
  for(let i = 0; i < satellites.length; i++){
    satellites[i].update();
    satellites[i].display();
  }
}  
  class Satellite {
    constructor(r, speed, axis){
      this.r = r;
      this.speed = speed;
      this.axis = axis;
      this.angle = random(TWO_PI);
    }
  
    update(){
      this.angle += this.speed;
    }
  
    display(){
      push();
      rotateX(this.axis.x * this.angle);
      rotateY(this.axis.y * this.angle);
      rotateZ(this.axis.z * this.angle);
      translate(this.r, 0, 0);
      stroke(255, 0, 0); // Color the satellites red
      sphere(0.5); // Adjust size of the satellites
      pop();
    }
  }
  
  function mousePressed() {
    displaySpheres = !displaySpheres; // Toggle displaySpheres on mouse click
    }
  
  // Your drawing code
