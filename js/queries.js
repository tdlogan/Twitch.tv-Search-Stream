// // Here is where all of the TWITCH API query logic will be
var streamCount = document.getElementById("streamCount");
var streamList = document.getElementById("listBody");

//Listen for Query Button Click event
var getTwitchData = function() {
  var queryText = document.getElementById("queryInput").value;
  var twitchQuery = new XMLHttpRequest();

  twitchQuery.open("GET", "https://api.twitch.tv/kraken/search/streams?q=" + queryText, true);
  
  twitchQuery.onload = function (e) {
    //When readyState === 4, we know that the request has finished and the response is ready
    if (twitchQuery.readyState === 4 && twitchQuery.status === 200) {
      console.log(JSON.parse(twitchQuery.responseText));
      setStreamCount(JSON.parse(twitchQuery.responseText));
      loadStreamsList(JSON.parse(twitchQuery.responseText));
    } else {
      console.error(twitchQuery.statusText);
    }
  };
  
  twitchQuery.send();
}


// THIS WILL BE MOVED TO A UTILITIES FILE
var setStreamCount = function(data) {
  document.getElementById("streamCount").innerText = data._total;
}

var loadStreamsList = function(data) {
  //We want to grab the 5 streams
  for (var i = 0; i < 5; i++) {
    appendStreamData(data.streams[i]);
  }
}

var appendStreamData = function(data) {
  var streamBlock = document.createElement("div");
  streamBlock.classList.add("streamBlocks");
  
  //Appending images will be treated a little differently
  var streamImage = document.createElement("img");
  streamImage.src = data.preview.medium;
  streamBlock.appendChild(streamImage);

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

