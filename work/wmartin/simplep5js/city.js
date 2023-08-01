class City {
	constructor (name, lon, lat) {
		this.name = name;
		this.lon = lon;
		this.lat = lat;
	}
	
	computePopulation () {
		const api = new PopulationApi(apiKey);
		api.get('pop-nyc');
		
	}
	
	draw (p) {
		p.circle(this.lon, this.lat, 20);
	}
}
