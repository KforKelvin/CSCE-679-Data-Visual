d3.select("body").append("p").text("Hello World!");


const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const p = d3.select('body').selectAll('p')
	.data(provinces)
	.enter()
	.append('p')
	.text((d, index) => {
        console.log(index); // Debug variable
        return `element: ${d} at position: ${index}`;
    });