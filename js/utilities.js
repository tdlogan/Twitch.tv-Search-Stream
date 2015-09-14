var $ = function(element) {
  return document.getElementById(element.slice(1));
}
// Twitch Query Utility Functions //
var clearStreamList = function() {
  while (streamList.lastChild) {
      streamList.removeChild(streamList.lastChild);
  }
};

var clearSearchBar = function() {
  $("#queryInput").value = "";
}

var newStreamReset = function() {
  streamData = null;
  $("#currentPage").innerText = 1;
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

  if ($("#currentPage").innerText == 1) {
    $("#backwardNav").disabled = true;
  } else {
    $("#backwardNav").disabled = false;
  }
};

var setPageLimit = function(data) {
  $("#pageLimit").innerText = Math.ceil(data._total/10);
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

var setStreamCount = function(data) {
  $("#streamCount").innerText = data._total;
};

var loadStreamsList = function(data) {
  data.streams.forEach(appendStreamData);
};

// Appending data helpers //

var appendStreamData = function(data) {
  var streamBlock = createElement("tr", "streamBlocks");
  var tableImage = createElement("td", "tableImage");

  var imgAnchor = createElement("a");
  imgAnchor.href = data.channel.url;
  imgAnchor.target = "_blank";

  var streamImage = createElement("img");
  streamImage.href = data.channel.url;
  streamImage.src = data.preview.large;

  var streamInfo = createElement("td", "streamInfo");

  createStreamElements(streamInfo, "h2", "streamName", data.channel.display_name);
  createStreamElements(streamInfo, "span", "gameName", data.channel.game);
  createStreamElements(streamInfo, "span", "numberViewers", " - " + data.viewers + " viewers");
  createStreamElements(streamInfo, "p", "description", data.channel.status);

  //Append all created elements to the DOM
  appendChildren([imgAnchor, streamImage], [tableImage, imgAnchor], [streamBlock, tableImage], [streamBlock, streamInfo], [streamList, streamBlock]);
};

var createElement = function(tag, tagClass) {
  var element = document.createElement(tag);
  tagClass ? element.classList.add(tagClass) : element;
  return element;
}

var appendChildren = function() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i][0].appendChild(arguments[i][1]);
  }
}

var createStreamElements = function(appendingElement, tagName, tagClass, data) {
  var newElement = createElement(tagName);
  var tagData = document.createTextNode(data);
  newElement.classList.add(tagClass);
  appendChildren([newElement, tagData], [appendingElement, newElement]);
};

