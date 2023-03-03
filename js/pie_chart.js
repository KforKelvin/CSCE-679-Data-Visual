const width = 450,
    height = 450,
    margin = 40;


const radius = Math.min(width, height) / 2 - margin

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create dummy data
const data = {a: 3, b: 3}

// set the color scale
const color = d3.scaleOrdinal()
  .range(d3.schemeSet2);

// Compute the position of each group on the pie:
const pie = d3.pie()
  .value(function(d) {return d[1]})
const data_ready = pie(Object.entries(data))



const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)


svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data[0])) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)


svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)