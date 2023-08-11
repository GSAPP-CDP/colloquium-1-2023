let movingPoints = [];
let staticPoints = [];
const gridSize = 75;
const numRows = 10;
const numCols = 16;
const pointVisibility = 0.6; // Percentage of points to show
const connectionRange = 50; // Range for connections

function setup() {
  createCanvas(1150, 800);
  
  // Generate static points in a grid
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (random(1) < pointVisibility) {
        let x = j * gridSize + gridSize / 2;
        let y = i * gridSize + gridSize / 2;
        staticPoints.push(createVector(x, y));
      }
    }
  }
  
  // Generate moving points
  for (let i = 0; i < 15; i++) {
    let x = random(width);
    let y = random(height);
    let velocity = p5.Vector.random2D().mult(2); // Initial random direction
    movingPoints.push({ pos: createVector(x, y), vel: velocity, connections: 0 });
  }
}

function draw() {
  background(0);
  
  // Draw static points
  fill(175,0,175);
  for (let staticPoint of staticPoints) {
    ellipse(staticPoint.x, staticPoint.y, 10);
  }
  
  // Check proximity and draw lines
  stroke(255, 255, 255);
  for (let movingPointObj of movingPoints) {
    let movingPoint = movingPointObj.pos;
    let velocity = movingPointObj.vel;
    let connections = 0;
    
    // Move the point
    movingPoint.add(velocity);
    
    // Change direction at borders
    if (movingPoint.x < 0 || movingPoint.x > width || movingPoint.y < 0 || movingPoint.y > height) {
      velocity = p5.Vector.random2D().mult(2);
      movingPointObj.vel = velocity;
    }
    
    // Draw lines to nearby static points
    for (let staticPoint of staticPoints) {
      let d = dist(movingPoint.x, movingPoint.y, staticPoint.x, staticPoint.y);
      if (d < connectionRange) {
        line(movingPoint.x, movingPoint.y, staticPoint.x, staticPoint.y);
        connections++;
      }
    }
    
    // Draw moving points
    fill(255, 0, 255);
    ellipse(movingPoint.x, movingPoint.y, 8);
    
    // Draw connections count and label
    textSize(12);
    fill(0, 255, 255);
    stroke("none");
    text(`Connections: ${connections}`, movingPoint.x + 10, movingPoint.y + 5);
    if (connections > 0) {
      fill(255, 0, 0);
      stroke("none");
      text("Close proximity to restaurants!", movingPoint.x, movingPoint.y - 15);
    }
    
    movingPointObj.connections = connections;
  }
}