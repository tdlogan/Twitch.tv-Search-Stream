// GLOBALS //
var streamCount = $("#streamCount");
var streamList = $("#listBody");
var streamData = null;

// API QUERY //
var getTwitchData = function(page) {
  var queryText = $("#queryInput").value;
  var queryPath = streamData ? streamData._links[page] : "https://api.twitch.tv/kraken/search/streams?q=" + queryText;
  
  clearStreamList();
  tempNavDisable();
  clearSearchBar();

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
};

// EVENT LISTENERS //
var searchButton = $("#querySubmit");
searchButton.addEventListener("click", newStreamReset, false);
searchButton.addEventListener("click", getTwitchData, false);

var forwardNav = $("#forwardNav");
forwardNav.addEventListener("click", function(){getTwitchData("next");}, false);
forwardNav.addEventListener("click", function(){setPageNumber("next");}, false);

var backwardNav = $("#backwardNav");
backwardNav.addEventListener("click", function(){getTwitchData("prev");}, false);
backwardNav.addEventListener("click", function(){setPageNumber("prev");}, false);

var forwardNav = $("#mobileForwardNav");
forwardNav.addEventListener("click", function(){getTwitchData("next");}, false);
forwardNav.addEventListener("click", function(){setPageNumber("next");}, false);

var backwardNav = $("#mobileBackwardNav");
backwardNav.addEventListener("click", function(){getTwitchData("prev");}, false);
backwardNav.addEventListener("click", function(){setPageNumber("prev");}, false);

