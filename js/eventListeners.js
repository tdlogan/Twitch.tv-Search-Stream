//Here is where the main app logic will rest. It will take the query data and manipulate for use on the DOM

var searchButton = document.getElementById("querySubmit");
searchButton.addEventListener("click", newStreamReset, false);
searchButton.addEventListener("click", getTwitchData, false);

var forwardNav = document.getElementById("forwardNav");
forwardNav.addEventListener("click", function(){getTwitchData("next");}, false);
forwardNav.addEventListener("click", function(){setPageNumber("next");}, false);

var backwardNav = document.getElementById("backwardNav");
backwardNav.addEventListener("click", function(){getTwitchData("prev");}, false);
backwardNav.addEventListener("click", function(){setPageNumber("prev");}, false);

