//Created my own simple element selector to prevent writing document.getElement... a lot
var $ = function(element) {
  if (element[0] === "#") { 
    return document.getElementById(element.slice(1));
  } else if (element[0] === ".") { 
    return document.getElementsByClassName(element.slice(1));
  }else { 
    return document.getElementByTagName(element);
  }
};

// Twitch Query Utility Functions //

var setStreamCount = function(data) {
  $("#streamCount").innerText = data._total;
};

var loadStreamsList = function(data) {
  data.streams.forEach(appendStreamData);
};

var appendStreamData = function(data) {
  var streamBlock = document.createElement("div");
  streamBlock.classList.add("streamBlocks");
  
  //Appending images will be treated a little differently since we need to set the src attribute
  var streamImage = document.createElement("img");
  streamImage.src = data.preview.medium;
  streamBlock.appendChild(streamImage);

  //Creating a span to append the data elements to
  var streamInfo = document.createElement("span");

  appendingHelper(streamInfo, "h1", data.channel.display_name);
  appendingHelper(streamInfo, "span", data.channel.game);
  appendingHelper(streamInfo, "span", " - " + data.viewers + " viewers");
  appendingHelper(streamInfo, "p", data.channel.status);

  streamBlock.appendChild(streamInfo);
  streamList.appendChild(streamBlock);

};

var appendingHelper = function(appendingElement, tagName, data) {
  var newElement = document.createElement(tagName);
  var tagData = document.createTextNode(data);
  newElement.appendChild(tagData);
  appendingElement.appendChild(newElement);
};

var clearStreamList = function() {
  while (streamList.lastChild) {
      streamList.removeChild(streamList.lastChild);
  }
};

var newStreamReset = function() {
  streamData = null;
  $("#currentPage").innerText = 1;
};

var setPageLimit = function(data) {
  $("#pageLimit").innerText = Math.ceil(data._total/10);
};

var tempNavDisable = function() {
  $("#forwardNav").disabled = true;
  $("#backwardNav").disabled = true;
};

var checkButtonAvailability = function() {
  if ($("#currentPage").innerText !== $("#pageLimit").innerText) {
    $("#forwardNav").disabled = false;
  } else {
    $("#forwardNav").disabled = true;
  }

  if ($("#currentPage").innerText === "1") {
    $("#backwardNav").disabled = true;
  } else {
    $("#backwardNav").disabled = false;
  }
};

var setPageNumber = function(direction) {
  var currentValue = $("#currentPage").innerText;
  if (direction === "next") { 
    $("#currentPage").innerText = JSON.parse(currentValue) + 1;
  }
  if (direction === "prev") {
    $("#currentPage").innerText = JSON.parse(currentValue) - 1;
  }
};
