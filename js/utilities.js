var setStreamCount = function(data) {
  document.getElementById("streamCount").innerText = data._total;
}

var loadStreamsList = function(data) {
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

var clearStreams = function(element) {
  while (streamList.lastChild) {
      streamList.removeChild(streamList.lastChild);
  }
}

var setPageLimit = function(data) {
  var pageLimit = document.getElementById("pageLimit").innerText = Math.ceil(data._total/10);
}

//Major refactors here too
var setPageNumber = function(direction) {
  var currentValue = document.getElementById("currentPage").innerText;
  if (direction === "next") { 
    document.getElementById("currentPage").innerHTML = JSON.parse(currentValue) + 1;
  }
  if (direction === "prev") {
    document.getElementById("currentPage").innerText = JSON.parse(currentValue) - 1;
  }
}




