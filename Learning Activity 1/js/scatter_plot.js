let margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

let svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let promises = [d3.csv("data/dfPovertyAdultLit.csv")];
let allData = [];

Promise.all(promises).then(function (data) {
  data.forEach(function (eachDataset) {
    eachDataset.forEach(function (d) {
      d["Poverty Rate (%)"] = +d["Poverty Rate (%)"];
      d["Year"] = new Date(d["Year"]);
      if (
        d.hasOwnProperty(
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        )
      ) {
        d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ] = +d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ];
      }
    });
  });

  allData = data;

  updateChart(allData);
});

function updateChart(someData) {
  let dataAdultLit = d3
    .nest()
    .key(function (d) {
      return d["Year"];
    })
    .entries(someData[0]);

  let filteredData = dataAdultLit[5]["values"];


  let x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
    )
    .style("text-anchor", "middle")
    .text("Adult Literacy");


  let y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));


  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", 0 - height / 2)
    .style("text-anchor", "middle")
    .text("Poverty Rate");

  
  let color = d3
    .scaleOrdinal()
    .domain([
      "Balochistan",
      "Federal Capital Territory",
      "Khyber Pakhtunkhwa",
      "Punjab",
      "Sindh",
    ])
    .range(["#440154ff", "#21908dff", "#fde725ff", "#129490", "#CE1483"]);


  let circles = svg.selectAll("circle").data(filteredData, function (d) {
    return d["District"];
  });


  circles
    .enter()
    .append("circle")
    .attr("fill", function (d) {
      return color(d["Province"]);
    })
    .attr("cy", function (d) {
      return y(d["Poverty Rate (%)"]);
    })
    .attr("cx", function (d) {
      return x(
        d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ]
      );
    })
    .attr("r", 5);
}