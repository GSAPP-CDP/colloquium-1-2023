let particles = [];

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(255);
  for (let particle of particles) {
    particle.update();
    particle.display();
    particle.displayTrace(); // Display the trace/orbit
  }
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
    this.size = random(3, 8);
    this.trace = []; // Array to store the previous positions
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
    this.wrapEdges(); // Wrap the particles around the canvas edges

    // Store the current position in the trace array
    this.trace.push(this.position.copy());

    // If the trace array becomes too long, remove the oldest positions
    if (this.trace.length > 50) {
      this.trace.shift();
    }
  }

  display() {
    fill(0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.size);
  }

  displayTrace() {
    noFill();
    stroke(0, 50); // Set the opacity of the trace
    beginShape();
    for (let pos of this.trace) {
      vertex(pos.x, pos.y);
    }
    endShape();
  }

  wrapEdges() {
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y > height) this.position.y = 0;
  }
}

function mousePressed() {
  // Add custom interactions when the mouse is pressed
  // For example, apply a force to particles when the mouse is clicked
  for (let particle of particles) {
    let force = p5.Vector.sub(createVector(mouseX, mouseY), particle.position);
    force.setMag(10); // Set the magnitude of the force
    particle.applyForce(force);
  }
}
