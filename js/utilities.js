// THIS WILL BE MOVED TO A UTILITIES FILE
var setStreamCount = function(data) {
  document.getElementById("streamCount").innerText = data._total;
}

var loadStreamsList = function(data) {
  // //We want to grab the 5 streams
  // for (var i = 0; i < 5; i++) {
  //   appendStreamData(data.streams[i]);
  // }
  data.streams.forEach(appendStreamData);
}

var appendStreamData = function(data) {
  var streamBlock = document.createElement("div");
  streamBlock.classList.add("streamBlocks");
  
  //Appending images will be treated a little differently
  var streamImage = document.createElement("img");
  streamImage.src = data.preview.medium;
  streamBlock.appendChild(streamImage);

  //Creating a span to append the data elements to
  var streamData = document.createElement("span");

  appendingHelper(streamData, "h1", data.channel.display_name);
  appendingHelper(streamData, "span", data.channel.game);
  appendingHelper(streamData, "span", " - " + data.viewers + " viewers");
  appendingHelper(streamData, "p", data.channel.status);

  streamBlock.appendChild(streamData);
  streamList.appendChild(streamBlock);

}

var appendingHelper = function(appendingElement, tagName, data) {
  var newElement = document.createElement(tagName);
  var tagData = document.createTextNode(data);
  newElement.appendChild(tagData);
  appendingElement.appendChild(newElement);
}

var clearStreams = function() {
  while (streamList.firstChild) {
      //The list is LIVE so it will re-index each call
      streamList.removeChild(streamList.firstChild);
  }
}

