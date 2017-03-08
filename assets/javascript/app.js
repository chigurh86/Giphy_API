var buttonArray = ["Nature", "Trees", "Bicycles", "Ocean", "Surfboards", "Animals", "Halloween", "College", "Movies", "Games"];






// *********************************************************************
// pulling from server

	function displayGiphy(){
		var gif = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
		var emptyDiv = $("<div>")

	    $.ajax({
	      url: queryURL,
	      method: "GET"
	    }).done(function(response) {
	    	var results = response.data;
	    	console.log(results);
	    	for (var i = 0; i < results.length; i++) {
	    		var gifDiv = $("<div class='item'>");
		    	var rating = results[i].rating;
		    	var stillImage = $("<img>");
		    	var state = $(this).attr("data-state");
		    	var p = $("<p>").text("Rating: "+ rating)
		    	stillImage.attr("src", results[i].images.fixed_height_still.url);
		    	gifDiv.append(stillImage)
		    	gifDiv.prepend(p) 
		    	$("#animalButtons").append(gifDiv)
            	$("#animalButtons").on("click", function(event) {
            		for (var i = 0; i < results.length; i++){
            		stillImage.attr("src", results[i].images.fixed_height.url);
			    	gifDiv.append(stillImage)
			    	gifDiv.prepend(p) 
			    	$("#animalButtons").append(gifDiv)
			    	}
      			});
	    	}
	    });
	};

	
// *********************************************************************
// loading buttons from array

function renderButtons(){

	$("#animalButtons").empty();
	for (var i = 0; i < buttonArray.length; i++){
		var a = $("<button>")
		a.addClass("gif");
		a.attr("data-name", buttonArray[i]);
		a.text(buttonArray[i]);
		$("#animalButtons").append(a);
	}

};
// *********************************************************************
// push buttons to array

	$("#add-gif").on("click",function(event) {
		event.preventDefault();
		var gif = $("#gif-input").val().trim();
		buttonArray.push(gif);
		renderButtons();
});

$(document).on("click", ".gif", displayGiphy);

renderButtons();