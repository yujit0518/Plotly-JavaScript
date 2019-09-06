function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json('/metadata/<sample>').then(function(data) {
    console.log(data);

  // Use d3 to select the panel with id of `#sample-metadata`
    var metadata = d3.select('#sample-metadata')
  })
      // Use `.html("") to clear any existing metadata
    metadata.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    object.entries(metadata).forEach(function([key,value]){
      var row = metadata.append("div");
      row.text(`${key}:${value}`)
    }

    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  d3.json('/samples/<sample>').then(function(data) {
    console.log(data);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

    var sample_values = data.sample_values.slice(0,10);
    var otu_ids = data.otu_ids.slice(0,10);
    var labels = data.labels.slice(0,10);

  // @TODO: Build a Pie Chart
var trace1 = [{
  values: sample_values,
  labels: labels,
  type: "pie",
}];

var layout = {
  height: 600,
  width: 1000,
  showlegend: true,
};
// plot the pie chart
Plotly.newPlot("pie", data, layout);

// @TODO: Build a Bubble Chart using the sample data

var trace2 = [{
  x: otu_ids,
  y: sample_values,
  marker: {
    size: sample_values
  }
}]

var layout = {
  title: "Bubble Plot",
  height: 1000,
  width: 600,
  showlegend: true,
}

// plot the bubble chart
Plotly.newPlot("bubble", data, layout);

})
}




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
