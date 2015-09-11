// // Here is where all of the TWITCH API query logic will be
var streamCount = document.getElementById("streamCount");
var streamList = document.getElementById("listBody");

//Listen for Query Button Click event
var getTwitchData = function() {

  var queryText = document.getElementById("queryInput").value;
  var twitchQuery = new XMLHttpRequest();

  twitchQuery.open("GET", "https://api.twitch.tv/kraken/search/streams?q=" + queryText, true);
  
  twitchQuery.onload = function (e) {
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








