const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv").then( 

function(data) {
  const sumstat = d3.group(data, d => d.year);

  const mygroups = ["Helen", "Amanda"] // list of group names
  const mygroup = [1,2] // list of group names
  const stackedData = d3.stack()
    .keys(mygroup)
    .value(function(d, key){
      return d[1][key].n
    })
    (sumstat)

  const x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width+30 ]);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(10));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.n; })*1.2])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  const color = d3.scaleOrdinal()
    .domain(mygroups)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  svg
    .selectAll("mylayers")
    .data(stackedData)
    .join("path")
      .style("fill", function(d) { name = mygroups[d.key-1] ;  return color(name); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data[0]); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )
}

)