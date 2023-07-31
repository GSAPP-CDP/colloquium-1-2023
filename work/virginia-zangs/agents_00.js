// Declare global variables
let agents; // Array to store the agents
const agentsAmount = 200; // Number of agents in the simulation
const sensorOffset = 10; // Distance between agent and sensor
const turnAngle = 30; // Angle by which the agent turns

// Set up the canvas and initialize the agents
function setup() {
  createCanvas(720, 720); // Create a 720x720 pixel canvas
  agents = Array.from({ length: agentsAmount }, () => new Agent()); // Create an array of agents
}

// Main drawing function, called continuously in a loop
function draw() {
  background(255, 10); // Set the background color to slightly transparent white

  // Update and display each agent in the agents array
  for (let agent of agents) {
    agent.update(); // Update the agent's direction and position
    agent.display(); // Display the agent on the canvas
  }
}

// Agent class definition
class Agent {
  // Constructor function to initialize each agent
  constructor() {
    this.x = random(width); // Random initial x-coordinate
    this.y = random(height); // Random initial y-coordinate
    this.angle = random(360); // Random initial angle
    this.detectedPheromone = 0; // Initialize the detected pheromone level to 0
  }

  // Function to update the agent's direction and position
  update() {
    this.detectPheromone(); // Detect pheromone level at the agent's position
    this.turn(); // Adjust agent's direction based on pheromone readings
    this.move(); // Move the agent based on its current direction
  }

  // Function to detect pheromone level at the sensor's position
  detectPheromone() {
    const angleRad = radians(this.angle); // Convert angle to radians for trigonometric calculations
    const sensorX = this.x + sensorOffset * cos(angleRad); // Calculate x-coordinate of the sensor position
    const sensorY = this.y + sensorOffset * sin(angleRad); // Calculate y-coordinate of the sensor position

    // Get the blue color channel (index 2) from the pixel at the sensor position
    this.detectedPheromone = get(floor(sensorX), floor(sensorY))[2];
  }

  // Function to adjust the agent's direction based on sensor readings
  turn() {
    const leftSensor = this.detectPheromoneAtOffset(-45); // Detect pheromone at a left offset from the agent's direction
    const rightSensor = this.detectPheromoneAtOffset(45); // Detect pheromone at a right offset from the agent's direction

    // Compare the pheromone levels from left and right sensors to decide the turning direction
    if (leftSensor > rightSensor) {
      this.angle -= turnAngle; // Turn left
    } else if (rightSensor > leftSensor) {
      this.angle += turnAngle; // Turn right
    }
  }

  // Function to detect pheromone level at an offset from the sensor's position
  detectPheromoneAtOffset(offset) {
    const angleRad = radians(this.angle + offset); // Calculate the angle with the offset
    const sensorX = this.x + sensorOffset * cos(angleRad); // Calculate x-coordinate of the sensor position
    const sensorY = this.y + sensorOffset * sin(angleRad); // Calculate y-coordinate of the sensor position

    // Get the blue color channel (index 2) from the pixel at the sensor position
    return get(floor(sensorX), floor(sensorY))[2];
  }

  // Function to move the agent based on its current direction
  move() {
    this.x += cos(radians(this.angle)); // Move the agent in the x-direction based on its current direction
    this.y += sin(radians(this.angle)); // Move the agent in the y-direction based on its current direction

    // Constrain the agent's position to be within the canvas boundaries
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Function to display the agent on the canvas
  display() {
    stroke(0); // Set stroke color to black
    point(this.x, this.y); // Draw a point to represent the agent
    strokeWeight(0.1); // Set the stroke weight to 2 pixels
    // Draw a line from the agent's position to the sensor's position to represent the sensor direction
    line(this.x, this.y, this.x + sensorOffset * cos(radians(this.angle)), this.y + sensorOffset * sin(radians(this.angle)));
  }
}
