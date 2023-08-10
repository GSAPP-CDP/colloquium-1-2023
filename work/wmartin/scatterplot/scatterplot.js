// From https://observablehq.com/@d3/brushable-scatterplot
// Showing how to embed a D3.js visualization.

const drawScatterplot = async () => {
  const data = await d3.csv("scatterplot/cars-2.csv", r => {
    return {
      Acceleration: Number(r.Acceleration),
      Cylinders: Number(r.Cylinders),
      Displacement: Number(r.Displacement),
      Horsepower: Number(r.Horsepower),
      Miles_per_Gallon: Number(r.Miles_per_Gallon),
      Name: r.Name,
      Origin: r.Origin,
      Weight_in_lbs: Number(r.Weight_in_lbs),
      Year: r.Year
    }
  });

  // Specify the chart’s dimensions.
  const width = 928;
  const height = 600;
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Create the horizontal (x) scale, positioning N/A values on the left margin.
  const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Miles_per_Gallon"])]).nice()
      .range([marginLeft, width - marginRight])
      .unknown(marginLeft);

  // Create the vertical (y) scale, positioning N/A values on the bottom margin.
  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Horsepower"])]).nice()
      .range([height - marginBottom, marginTop])
      .unknown(height - marginBottom);

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .property("value", []);

  // Append the axes.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", -4)
          .attr("fill", "#000")
          .attr("font-weight", "bold")
          .attr("text-anchor", "end")
          .text("Miles per Gallon"));

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      .call(g => g.select(".tick:last-of-type text").clone()
          .attr("x", 4)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Horsepower"));

  // Append the dots.
  const dot = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${x(d["Miles_per_Gallon"])},${y(d["Horsepower"])})`)
      .attr("r", 3);

  // Create the brush behavior.
  svg.call(d3.brush().on("start brush end", ({selection}) => {
    let value = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      value = dot
        .style("stroke", "gray")
        .filter(d => x0 <= x(d["Miles_per_Gallon"]) && x(d["Miles_per_Gallon"]) < x1
                && y0 <= y(d["Horsepower"]) && y(d["Horsepower"]) < y1)
        .style("stroke", "steelblue")
        .data();
    } else {
      dot.style("stroke", "steelblue");
    }

    // Inform downstream cells that the selection has changed.
    svg.property("value", value).dispatch("input");
  }));

  const target = document.getElementById('scatterplot-example');
  target.appendChild(svg.node());
}

window.addEventListener('load', drawScatterplot);