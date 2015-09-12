// // Here is where all of the TWITCH API query logic will be
var streamCount = $("#streamCount");
var streamList = $("#listBody");
var streamData = null;

// Listen for Query Button Click event
var getTwitchData = function(page) {
  clearStreamList();

  var queryText = $("#queryInput").value;
  var queryPath = streamData ? streamData._links[page] : "https://api.twitch.tv/kraken/search/streams?q=" + queryText;

  var twitchQuery = new XMLHttpRequest();

  twitchQuery.open("GET", queryPath, true);
  
  twitchQuery.onload = function (e) {
    if (twitchQuery.readyState === 4 && twitchQuery.status === 200) {
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
