/*
  FIRST SKETCH
*/

const snowflakeSketch = ( p ) => {
    console.log(p)
    let snowflakes = []; // array to hold snowflake objects
    
    p.setup = () => {
      let canvasTwo = p.createCanvas(window.innerWidth/2, window.innerHeight/2);
      console.log(canvasTwo)
      canvasTwo.parent("two")
      p.fill(240);
      p.noStroke();
    }
  
   p.draw = () => {
    p.background('brown');
    let t = p.frameCount / 60; // update time
  
    // create a random number of snowflakes each frame
    for (let i = 0; i < p.random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }
  
    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }
  }
  
  // snowflake class
  function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = p.random(-50, 0);
    this.initialangle = p.random(0, 2 * p.PI);
    this.size = p.random(2, 5);
  
    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)));
  
    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = p.width / 2 + this.radius * p.sin(angle);
  
      // different size snowflakes fall at slightly different y speeds
      this.posY += p.pow(this.size, 0.5);
  
      // delete snowflake if past end of screen
      if (this.posY > p.height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };
  
    this.display = function() {
      p.ellipse(this.posX, this.posY, this.size);
    };
  }
  
  }
  const secondSketch = new p5(snowflakeSketch, 'two');
  
  
  
  const particleSketch = ( p ) => {
  
  // this class describes the properties of a single particle.
  class Particle {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = p.random(0,p.width);
        this.y = p.random(0,p.height);
        this.r = p.random(1,8);
        this.xSpeed = p.random(-2,2);
        this.ySpeed = p.random(-1,1.5);
      }
    
    // creation of a particle.
      createParticle() {
        p.noStroke();
        p.fill('rgba(200,169,169,0.5)');
        p.circle(this.x,this.y,this.r);
      }
    
    // setting the particle in motion.
      moveParticle() {
        if(this.x < 0 || this.x > p.width)
          this.xSpeed*=-1;
        if(this.y < 0 || this.y > p.height)
          this.ySpeed*=-1;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinParticles(particles) {
        particles.forEach(element =>{
          let dis = p.dist(this.x,this.y,element.x,element.y);
          if(dis<85) {
            p.stroke('rgba(255,255,255,0.04)');
            p.line(this.x,this.y,element.x,element.y);
          }
        });
      }
    }
    
    // an array to add multiple particles
    let particles = [];
    
    p.setup = () => {
  
      let canvasOne = p.createCanvas(window.innerWidth/2, window.innerHeight/2);
      console.log(canvasOne)
      canvasOne.parent("one")
      // createCanvas(720, 400);
      for(let i = 0;i < p.width/10;i++){
        particles.push(new Particle());
      }
    }
    
    p.draw = () => {
      p.background('#0f0f0f');
      for(let i = 0;i<particles.length;i++) {
        particles[i].createParticle();
        particles[i].moveParticle();
        particles[i].joinParticles(particles.slice(i));
      }
    }
  }
  const firstSketch = new p5(particleSketch, 'one');