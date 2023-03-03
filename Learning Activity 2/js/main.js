// What you have
var officers = [
	{ id: 20, name: 'Captain Piett' },
	{ id: 24, name: 'General Veers' },
	{ id: 56, name: 'Admiral Ozzel' },
	{ id: 88, name: 'Commander Jerjerrod' }
  ];


  // you just need the ids
// [20, 24, 56, 88]
// you could create an empty array
// use a forEach loop and push each id

// or you can use map
var officersIds = officers.map(function (officer) {
	return officer.id
  });

//or you can use fat arrow notation 
//const officersIds = officers.map(officer => officer.id);

console.log(officersIds)
//REDUCE
// Say you have this array of pilots
//and you want to know years of experience for all 

var pilots = [
	{
	  id: 10,
	  name: "Poe Dameron",
	  years: 14,
	},
	{
	  id: 2,
	  name: "Temmin 'Snap' Wexley",
	  years: 30,
	},
	{
	  id: 41,
	  name: "Tallissan Lintra",
	  years: 16,
	},
	{
	  id: 99,
	  name: "Ello Asty",
	  years: 22,
	}
  ];

  var totalYears = pilots.reduce(function (accumulator, pilot) {
	return accumulator + pilot.years;
  }, 0);

  console.log(totalYears)

  //say I want the most experienced one
  var mostExpPilot = pilots.reduce(function (oldest, pilot) {
	return (oldest.years || 0) > pilot.years ? oldest : pilot;
  }, {});

//   What if you have an array, but only want some of the elements in it? 
//   That’s where .filter() comes in!

var pilots = [
	{
	  id: 2,
	  name: "Wedge Antilles",
	  faction: "Rebels",
	},
	{
	  id: 8,
	  name: "Ciena Ree",
	  faction: "Empire",
	},
	{
	  id: 40,
	  name: "Iden Versio",
	  faction: "Empire",
	},
	{
	  id: 66,
	  name: "Thane Kyrell",
	  faction: "Rebels",
	}
  ];

  var rebels = pilots.filter(function (pilot) {
	return pilot.faction === "Rebels";
  });
  var empire = pilots.filter(function (pilot) {
	return pilot.faction === "Empire";
  });

  console.log(rebels);
  console.log(empire);


  //Chaining them
  var personnel = [
	{
	  id: 5,
	  name: "Luke Skywalker",
	  pilotingScore: 98,
	  shootingScore: 56,
	  isForceUser: true,
	},
	{
	  id: 82,
	  name: "Sabine Wren",
	  pilotingScore: 73,
	  shootingScore: 99,
	  isForceUser: false,
	},
	{
	  id: 22,
	  name: "Zeb Orellios",
	  pilotingScore: 20,
	  shootingScore: 59,
	  isForceUser: false,
	},
	{
	  id: 15,
	  name: "Ezra Bridger",
	  pilotingScore: 43,
	  shootingScore: 67,
	  isForceUser: true,
	},
	{
	  id: 11,
	  name: "Caleb Dume",
	  pilotingScore: 71,
	  shootingScore: 85,
	  isForceUser: true,
	},
  ];

  //get the total score of force users only
  var totalJediScore = personnel
  .filter(function (person) {
    return person.isForceUser;
  })
  .map(function (jedi) {
    return jedi.pilotingScore + jedi.shootingScore;
  })
  .reduce(function (acc, score) {
    return acc + score;
  }, 0);

  // very concise with fat arrow => :-) 
//   const totalJediScore = personnel
//   .filter(person => person.isForceUser)
//   .map(jedi => jedi.pilotingScore + jedi.shootingScore)
//   .reduce((acc, score) => acc + score, 0);

  console.log(totalJediScore)

  ///EVEN FANCIER just use reduce
  const totalJediScore2 = personnel.reduce((acc, person) => person.isForceUser ? acc + person.pilotingScore + person.shootingScore : acc, 0);
  console.log(totalJediScore2)
/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/


// Fundamentally, d3.nest is about taking a 
// flat data structure and turning it into a nested one.
//Let's say we have the following CSV file of "expenses":

// name,amount,date
// jim,34.0,11/12/2015
// carl,120.11,11/12/2015
// jim,45.0,12/01/2015
// stacy,12.00,01/04/2016
// stacy,34.10,01/04/2016
// stacy,44.80,01/05/2016

//read in as nice array 
var expenses = [{"name":"jim","amount":34,"date":"11/12/2015"},
  {"name":"carl","amount":120.11,"date":"11/12/2015"},
  {"name":"jim","amount":45,"date":"12/01/2015"},
  {"name":"stacy","amount":12.00,"date":"01/04/2016"},
  {"name":"stacy","amount":34.10,"date":"01/04/2016"},
  {"name":"stacy","amount":44.80,"date":"01/05/2016"}
];

//we want to slice it in different ways

// 1 by name
var expensesByName = d3.nest()
  .key(function(d) { return d.name; })
  .entries(expenses);

console.log(expensesByName)
// expensesByName is an array of objects. 
// Each object has a key property - which is what we used 
// as the grouping value using the key function.
// Here, we used the values associated with the name property as the key.

//ROLLUP With rollup, you provide a function that takes the array of values 
//for each group and it produces a value based on that array
var expensesCount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return v.length; })
  .entries(expenses);
console.log(JSON.stringify(expensesCount));


var expensesAvgAmount = d3.nest()
  .key(function(d) { return d.name; })
  .rollup(function(v) { return d3.mean(v, function(d) { return d.amount; }); })
  .entries(expenses);
console.log(JSON.stringify(expensesAvgAmount));

/*
*    Gapminder  
*/

//set the width and height

var svgHeight = 700;
var svgWidth  = 900;

//create an object called chartMargin with a value of 30 for top, right, bottom, left
//note it is convention to do this clockwise
//top is done for you
var chartMargin = {
    top: 30,
	right: 60, 
    bottom: 60, 
	left:100
};


//set the chart width by subtracting the right and left values of chartMargin from svgWidth
var chartWidth  = svgWidth - chartMargin.right - chartMargin.left;

//set the chart width by subtracting the top and bottom values of chartMargin from svgHeight
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


//create and append a new svg  - set width and height attributes to svgWidth and svgHeight
var svg = d3.select("body")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width" , svgWidth);

//append a group to the SVG space and translate it to the right 
//and down


//create a chartGroup and nudge it to the top left
var chartGroup = svg.append("g")
                    .attr("transform", `translate (${chartMargin.left}, ${chartMargin.top})`)


let time = 0

// Scales
const x = d3.scaleLog()
	.base(10)
	.domain([142, 150000])
	.range([0, chartWidth])
	
const y = d3.scaleLinear()
	.domain([0, 90])
	.range([chartHeight, 0])

const area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([2000, 1400000000])

const continentColor = d3.scaleOrdinal(d3.schemeDark2)

// Labels
const xLabel = chartGroup.append("text")
	.attr("y", chartHeight + 50)
	.attr("x", chartWidth / 2)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("GDP Per Capita ($)")

const yLabel = chartGroup.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", -40)
	.attr("x", -170)
	.attr("font-size", "20px")
	.attr("text-anchor", "middle")
	.text("Life Expectancy (Years)")

const timeLabel = chartGroup.append("text")
	.attr("y", chartHeight - 10)
	.attr("x", chartWidth - 40)
	.attr("font-size", "40px")
	.attr("opacity", "0.4")
	.attr("text-anchor", "middle")
	.text("1800")

// X Axis
const xAxisCall = d3.axisBottom(x)
	.tickValues([400, 4000, 40000])
	.tickFormat(d3.format("$"));

chartGroup.append("g")
	.attr("class", "x axis")
	.attr("transform", `translate(0, ${chartHeight})`)
	.call(xAxisCall)

// Y Axis
const yAxisCall = d3.axisLeft(y)

chartGroup.append("g")
	.attr("class", "y axis")
	.call(yAxisCall)

d3.json("data/data.json").then(function(data){
	// clean data

	// Use a chained map function to extract the data points we need
	// AND make sure they are a number using the unary operator +
    // 1 goes here 
	const formattedData = data.map(year=>{
		return year["countries"].filter(country => {
			const dataExisits = (country.income && country.life_exp)
			return dataExisits
		}).map(country =>{
			country.income = +(country.income)
			country.life_exp = +(country.life_exp)
			return country
		})
	})
    // 2 goes here 
	d3.interval(function(){
		time = (time < data.length)? time + 1:0
		update(formattedData[time])
	},100)

	// first run of the visualization
	update(formattedData[0])
})

function update(data) {
	//3 
	
		const t = d3.transition()
			.duration(100)
		const circles = chartGroup.selectAll("circle")
			.data(data, d=>d.country)
		
		circles.exit().remove()
		circles.enter().append("circle")
			.attr("fill", d=>continentColor(d.continent))
			.merge(circles)
			.transition(t)
				.attr("cy", d => y(d.life_exp))
				.attr("cx", d=>x(d.income))
				.attr("r",d=>Math.sqrt(area(d.population/Math.PI))) 
		timeLabel.text(String(time + 1800))
	
}