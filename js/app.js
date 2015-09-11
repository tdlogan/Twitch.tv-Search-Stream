//Here is where the main app logic will rest. It will take the query data and manipulate for use on the DOM

var searchButton = document.getElementById("querySubmit");
searchButton.addEventListener("click", getTwitchData, false);