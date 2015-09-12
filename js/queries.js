// // Here is where all of the TWITCH API query logic will be
var streamCount = document.getElementById("streamCount");
var streamList = document.getElementById("listBody");
var streamData;

//Listen for Query Button Click event
var getTwitchData = function(changePage) {
  clearStreams();

  //SIGNIFICANT REFACTORS SHOULD HAPPEN HERE//
  var queryText = document.getElementById("queryInput").value;
  if (streamData && changePage === "next") {
    var queryPath = streamData._links.next; 
  } else if (streamData && changePage === "previous") {
    var queryPath = streamData._links.prev;
  } else {
    var queryPath = "https://api.twitch.tv/kraken/search/streams?q=" + queryText;
  }
  //SIGNIFICANT REFACTORS SHOULD HAPPEN HERE//

  var twitchQuery = new XMLHttpRequest();

  twitchQuery.open("GET", queryPath, true);
  
  twitchQuery.onload = function (e) {
    if (twitchQuery.readyState === 4 && twitchQuery.status === 200) {
      console.log(JSON.parse(twitchQuery.responseText));
      streamData = JSON.parse(twitchQuery.responseText);
      setStreamCount(streamData);
      setPageLimit(streamData);
      loadStreamsList(streamData);
    } else {
      console.error(twitchQuery.statusText);
    }
  };
  
  twitchQuery.send();
}
