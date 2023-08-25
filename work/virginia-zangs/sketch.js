let img1, img2;

function setup() {
  createCanvas(400, 400);
  img1 = new ImageObject(100, 100, 'path_to_image1.jpg');
  img2 = new ImageObject(300, 300, 'path_to_image2.jpg');
}

function draw() {
  background(220);

  let force = img1.attract(img2);
  img2.applyForce(force);
  
  img1.update();
  img2.update();
  
  img1.display();
  img2.display();
}

class ImageObject {
  constructor(x, y, imagePath) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 1;
    this.image = loadImage(imagePath);
  }

  attract(target) {
    let force = p5.Vector.sub(this.position, target.position);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    force.normalize();
    let strength = (0.1 * this.mass * target.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    image(this.image, this.position.x, this.position.y);
  }
}
