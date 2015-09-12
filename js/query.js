var streamCount = $("#streamCount");
var streamList = $("#listBody");
var streamData = null;

var getTwitchData = function(page) {
  clearStreamList();
  tempNavDisable();

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
      checkButtonAvailability();
    } else {
      console.error(twitchQuery.statusText);
    }
  };
  
  twitchQuery.send();
}
