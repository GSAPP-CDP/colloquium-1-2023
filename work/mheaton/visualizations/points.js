const mapWidth = 1280;
const mapHeight = 720;
const mapPadding = 5;

// Create the SVG container for the map
const svg = d3.select('#map-container')
  .append('svg')
  .attr('width', mapWidth)
  .attr('height', mapHeight);

// Load the US states GeoJSON data
d3.json('data/states_lakes_50m.json').then(function (states) {
  // Filter the states to include only the record for New York State
  const nyState = states.features.find(function (state) {
    return state.properties.name === 'New York';
  });

  // Create a GeoJSON object with only the geometry of New York State
  const nyGeoJSON = {
    type: 'FeatureCollection',
    features: [nyState],
  };

  // Create a path generator for the map projection centered on New York State
  const projection = d3.geoAlbers()
    .fitExtent([[mapPadding, mapPadding], [mapWidth - mapPadding, mapHeight - mapPadding]], nyGeoJSON);

  const path = d3.geoPath().projection(projection);

  // Draw the state boundary for New York
  svg.append('path')
    .datum(nyState)
    .attr('class', 'state')
    .attr('d', path);

  // Load the CSV data
  d3.csv('data/fcc_geog_lookupTable.csv').then(function (data) {
    // Convert the longitude and latitude values to numbers
    data.forEach(function (d) {
      d.centroid_lng = +d.centroid_lng;
      d.centroid_lat = +d.centroid_lat;
    });

    // Filter the CSV data to include only records with ", NY" in the "name" column
    const filteredData = data.filter(function (d) {
      return d.name.includes(', NY');
    });

    // Create Voronoi polygons based on the points using d3-delaunay
    const points = filteredData.map(d => projection([d.centroid_lng, d.centroid_lat]));
    const delaunay = d3.Delaunay.from(points);
    const voronoi = delaunay.voronoi([0, 0, mapWidth, mapHeight]);

    // Draw Voronoi polygons on the map
    svg.selectAll('.voronoi')
      .data(filteredData)
      .enter()
      .append('path')
      .attr('class', 'voronoi')
      .attr('d', (d, i) => voronoi.renderCell(i))
      .style('fill', 'none')
      .style('stroke', 'blue')
      .style('stroke-width', 1);

    // Draw points on the map based on the filtered data
    const batchPoints = svg.selectAll('.point')
    .data(filteredData)
    .enter()
    .append('circle')
    .filter(function (d) {
      const projected = projection([d.centroid_lng, d.centroid_lat]);
      return projected !== null;
    })
    .attr('class', 'point')
    .attr('cx', function (d) { return projection([d.centroid_lng, d.centroid_lat])[0]; })
    .attr('cy', function (d) { return projection([d.centroid_lng, d.centroid_lat])[1]; })
    .attr('r', 1)
    .style('fill', 'rgba(152, 251, 152, 0.865)')
    .style('visibility', 'hidden'); // Hide the points initially

  // Use requestAnimationFrame for smoother rendering
  function renderPoints() {
    batchPoints.style('visibility', 'visible');
  }
  requestAnimationFrame(renderPoints);

    });
});
