
const margin = {top: 10, right: 30, bottom: 30, left: 50},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;


const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);


d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",


  d => {
    return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value }
  }).then(

  function(data) {


    data = data.filter((d,i) => i<200)

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0,  ${height+5})`)
      .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));


    const y = d3.scaleLinear()
      .domain( d3.extent(data, d => +d.value))
      .range([ height, 0 ]);
    svg.append("g")
      .attr("transform", "translate(-5,0)")
      .call(d3.axisLeft(y).tickSizeOuter(0));


    svg.append("path")
      .datum(data)
      .attr("fill", "#69b3a2")
      .attr("fill-opacity", .3)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(d => x(d.date))
        .y0( height )
        .y1(d => y(d.value))
        )


    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 4)
      .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        )


    svg.selectAll("myCircles")
      .data(data)
      .join("circle")
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 3)

})