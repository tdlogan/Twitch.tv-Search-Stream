// // Here is where all of the TWITCH API query logic will be

//Listen for Query Button Click event
var getTwitchData = function() {
  var queryText = document.getElementById("queryInput").value;
  var twitchQuery = new XMLHttpRequest();

  twitchQuery.open("GET", "https://api.twitch.tv/kraken/search/streams?q=" + queryText, true);
  
  twitchQuery.onload = function (e) {
    //When readyState === 4, we know that the request has finished and the response is ready
    if (twitchQuery.readyState === 4 && twitchQuery.status === 200) {
      //We know we have a good request so we will parse the data
      console.log(twitchQuery.status);
      console.log(JSON.parse(twitchQuery.responseText));
    } else {
      //Otherwise we will log the error
      console.error(twitchQuery.statusText);
    }
  };
  
  twitchQuery.send();
}


