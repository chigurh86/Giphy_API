

var buttonArray = ["Nature", "Trees", "Bicycles", "Ocean", "Surfboards", "Animals", "Halloween", "College", "Movies", "Games"];

// *********************************************************************
// pulling from server

	function displayGiphy(){
		var gif = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";
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
		    	var animatedImage = $("<img>");
		    	var p = $("<p>").text("Rating: "+ rating)
		    	stillImage.attr("src", results[i].images.fixed_height_still.url);
		    	stillImage.attr("data-animate", results[i].images.fixed_height.url);
		    	stillImage.attr("data-still", results[i].images.fixed_height_still.url);
		    	stillImage.attr("data-state", "still");
		    	gifDiv.append(stillImage);
		    	gifDiv.prepend(p);
		    	$("#animalButtons").append(gifDiv);
            	
	    	}
	    });

	    $(document).on("click", "img", function(event) {
	    	// get state from the data state attribute
	    	var state = $(this).attr("data-state");
		        if (state === "still") {
			        $(this).attr("src", $(this).attr("data-animate"));
			        $(this).attr("data-state", "animate");
		    	} 
		    	else {
			        $(this).attr("src", $(this).attr("data-still"));
			        $(this).attr("data-state", "still");
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
$(document).ready(function(){
	
$(document).on("click", ".gif", displayGiphy);

	$("#add-gif").on("click",function(event) {
		$(".item").empty();
		event.preventDefault();
		var gif = $("#gif-input").val().trim();
		buttonArray.push(gif);
		renderButtons();
});



renderButtons();
});