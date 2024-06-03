var x1, x2,y1,y2, data1, data2, svg1,svg2
const plot_d3 = function(country_code = 'USA') {
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 100, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg1 = d3.select("#my_dataviz2")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.json("country-based/"+country_code+".json", function(data) {

    // sidebar
    document.getElementById('country-name').innerHTML = data.name
    document.getElementById('country-attack').innerHTML = data.number_of_attacks
    document.getElementById('country-fatalities').innerHTML = data.number_of_fatalities
    debugger;
    document.getElementById('most-attacks').innerHTML = data.most_attacks
    document.getElementById('perp1').innerHTML = data.top_perpetrators[0].x_axis
    document.getElementById('perp2').innerHTML = data.top_perpetrators[1].x_axis
    document.getElementById('perp3').innerHTML = data.top_perpetrators[2].x_axis


  data1 = data.attack_chart.slice(0, 10);
  // X axis
  x1 = d3.scaleBand()
    .range([ 0, width ])
    .domain(data1.map(function(d) {
       return d.x_axis; }))
    .padding(0.2);
  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x1))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  y1 = d3.scaleLinear()
    .domain([0, d3.max(data1, d => d.y_axis)])
    .range([ height, 0]);
  svg1.append("g")
    .call(d3.axisLeft(y1));

  // Bars
  svg1.selectAll("mybar")
    .data(data1)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x1(d.x_axis); })
      .attr("y", function(d) { return y1(d.y_axis); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height - y1(d.y_axis); })
      .attr("fill", "#e15759")

  })

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 100, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg2 = d3.select("#my_dataviz3")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.json("country-based/"+country_code+".json", function(data) {
  data2 = data.perpetrators_chart.slice(0, 10);
  // X axis
  x2 = d3.scaleBand()
    .range([ 0, width ])
    .domain(data2.map(function(d) {
       return d.x_axis; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  y2 = d3.scaleLinear()
    .domain([0, d3.max(data2, d => d.y_axis)])
    .range([ height, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y2));

  // Bars
  svg2.selectAll("mybar")
    .data(data2)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x2(d.x_axis); })
      .attr("y", function(d) { return y2(d.y_axis); })
      .attr("width", x2.bandwidth())
      .attr("height", function(d) { return height - y2(d.y_axis); })
      .attr("fill", "#e15759")

  })
}

update_chart = function(country_code='AFG'){
d3.select("#my_dataviz2").selectAll("*").remove();
d3.select("#my_dataviz3").selectAll("*").remove();
plot_d3(country_code)
}
