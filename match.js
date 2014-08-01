$(document).ready(function(){

	var matchCounter = 0;
	var guessCounter = 0;
	var pokemon = {};

	function addPokeObject(name, id, spriteUrl){
		if (!(name in pokemon)){
			pokemon[name] = { id:id, spriteUrl: spriteUrl };
		}
	}

	var printTeam = function(number, section_id){
		$.ajax({
			url: "http://pokeapi.co/api/v1/sprite/" + number + "/",
			type: "GET",
			dataType: "jsonp",
			success: function(data) {
				name = data.name.split("_")[0];
				id = data.id - 1;
				var spriteUrl = 'http://pokeapi.co/' + data.image;

				$(section_id).append("<div class='myCard'><div class='inactive'></div></div>")
				$(".myCard:last > .inactive").append("<p class='myId'>#" + id + "</p>");
				$(".myCard:last > .inactive").append("<img class='myImg' src=" + spriteUrl + "/>");
				$(".myCard:last > .inactive").append("<div class='pokeName' >" + name + "</div>" );

				addPokeObject(name, id, spriteUrl);
			}
		});
	};

	function randomArray(){
		var arr=[];
		for (i = 0; i < 6; i++){
			arr[i] = Math.floor((Math.random() * 720) + 2);
		}
		return arr;
	}

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	function checkMove(){
		if ($(".active").length == 1) {
			$(this).children().slideDown();
		}
		else if ($(".active").length == 2 ) {
			var active1_id = $('.active').first().find(".myId").text();
			var active2_id = $('.active').last().find(".myId").text();
			guessCounter ++;

			if (active1_id == active2_id){
				$(".active").addClass("caught");
				$(".caught").parent().css("background-color", "silver");
				$(".active").removeClass("active");
				matchCounter ++;

				// If user wins:
				if (matchCounter == 6){
					$("#win-statement").text("You Won! You made a total of " + guessCounter + " guesses!");
				}
			return false;
			}
			var parents = $(".active").parent();
			$(".active").removeClass("active", 0, callback($(parents)));
		}
		else { console.log("something went wrong");	
		}
	}

	$(document).on("click", ".myCard", function() {
		$(this).css("background-image", "none");
		
		$(this).fadeOut('fast', function() {
			$(this).children().removeClass("inactive");
			$(this).fadeIn('fast', function() {
				$(this).children().addClass("active");
				checkMove();
			});
		});
	});
	
	function callback(node) {
		setTimeout(function() {
			$(node).children().addClass("inactive");
			$(node).removeAttr('style');
		}, 1000 );
	}

	$("#catchThemAll").click(function(){
		$("#team").hide();
		$("#field").show();
		$("#field").html("");
		var counter = 0;

		var array = randomArray();
		array = shuffleArray(array.concat(array));

		for (var i=0; i < array.length ; i++){
			printTeam(array[i], "#field");
		}
	});

	// $("#getMyTeam").click(function(){
	// 	$("#field").hide();
	// 	$("#team").show();
	// 	$("#team").html(""); // clears myTeam
	// 	var counter = 0;
	// 	var myTeam = [580, 197, 137, 654, 678, 148];

	// 	function pause(){
	// 		if (counter < 6){
	// 			printTeam(myTeam[counter], "#team");
	// 			counter ++;
	// 			setTimeout(pause, 500);
	// 		}
	// 	}
	// 	pause();

	// });


	// $("#getRandomTeam").click(function(){
	// 	$("#myTeam").html(""); // clears myTeam
	// 	var counter = 0;
	// 	function pause(){
	// 		if (counter < 6){
	// 			printTeam(Math.floor((Math.random() * 720) + 2));
	// 			counter ++;
	// 			setTimeout(pause, 500);
	// 		}
	// 	}
	// 	pause();

	// });

});


