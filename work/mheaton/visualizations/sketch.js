let data; // Variable to store the loaded CSV data
const mapWidth = 800; // Adjust the width of the map canvas as per your preference
const mapHeight = 600; // Adjust the height of the map canvas as per your preference
const mapPadding = 20; // Padding around the map for better visualization

function preload() {
  // Load the CSV file with PapaParse
  data = loadTable('data/fcc_geog_lookupTable.csv', 'csv', 'header');
}

function setup() {
  createCanvas(mapWidth, mapHeight);
  background(255);
  drawMap();
}

function drawMap() {
  // Calculate the bounds of the data to set the mapping scale
  let lngMin = Infinity;
  let lngMax = -Infinity;
  let latMin = Infinity;
  let latMax = -Infinity;

  for (let i = 0; i < data.getRowCount(); i++) {
    let lng = parseFloat(data.getString(i, 'centroid_lng'));
    let lat = parseFloat(data.getString(i, 'centroid_lat'));

    if (lng < lngMin) lngMin = lng;
    if (lng > lngMax) lngMax = lng;
    if (lat < latMin) latMin = lat;
    if (lat > latMax) latMax = lat;
  }

  // Function to map longitude to canvas X coordinate
  function mapLngToX(lng) {
    return map(lng, lngMin, lngMax, mapPadding, width - mapPadding);
  }

  // Function to map latitude to canvas Y coordinate
  function mapLatToY(lat) {
    return map(lat, latMax, latMin, mapPadding, height - mapPadding);
  }

  // Draw points on the map based on the data
  for (let i = 0; i < data.getRowCount(); i++) {
    let lng = parseFloat(data.getString(i, 'centroid_lng'));
    let lat = parseFloat(data.getString(i, 'centroid_lat'));
    let x = mapLngToX(lng);
    let y = mapLatToY(lat);

    fill(0);
    ellipse(x, y, 5, 5);
  }
}
