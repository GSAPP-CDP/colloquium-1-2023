const sketch = p => {
	// p is a P5.js instance.

	p.preload = () => {
		// Load any files or data here.
	}

	let newyork
	p.setup = () => {
		// p5-sketch2 is the id of the HTML tag intended to contain the sketch.
		const elt = document.getElementById('p5-sketch2');
		const width = elt.getBoundingClientRect().width;
		const height = elt.getBoundingClientRect().height;
		
		p.createCanvas(width, height);
		
		// City is defined in simplep5js/city.js.
		newyork = new City('New York', 40, 70);
	}
	
	p.draw = () => {
		p.background(p.color('yellow'));
		newyork.draw(p);
	}
}

window.addEventListener('load', () => {
	const elt = document.getElementById('p5-sketch2');
	new p5(sketch, elt);
})
