$(document).ready(function(){

	var protagonist = undefined
	var antagonist = undefined

	var allCharacters = ["#character-1", "#character-2", "#character-3", "#character-4"]
	var allEnemies = ["#enemy-1", "#enemy-2", "#enemy-3", "#enemy-4"]

	var leia = {
		name: "Leia",
		health: 120,
		attack: 30,
		img: "assets/images/leia.jpg"
	}

	var octopusGuy = {
		name: "Octopus Guy",
		health: 100,
		attack: 20,
		img: "assets/images/octopusguy.jpg"
	}

	var darthVader = {
		name: "Darth Vader",
		health: 180,
		attack: 40,
		img: "assets/images/darthvader.jpg"
	}

	var chewbacca = {
		name: "Chewbacca",
		health: 150,
		attack: 35,
		img: "assets/images/chewbacca.jpg"
	}
	
	$("#leiasHealth").text(leia.health)
	$("#octopusGuysHealth").text(octopusGuy.health)
	$("#darthVadersHealth").text(darthVader.health)
	$("#chewbaccasHealth").text(chewbacca.health)

	$(".character").on("click", function(){
		$(this).css("border","2px solid green")
		protagonist = ("#"+ $(this).attr("id"))
		
		
		allCharacters.splice($.inArray(protagonist, allCharacters), 1);

		$("#enemy-1").append($(allCharacters[0]).html())
		$("#enemy-2").append($(allCharacters[1]).html())
		$("#enemy-3").append($(allCharacters[2]).html())

		$(allCharacters[0]).empty()
		$(allCharacters[1]).empty()
		$(allCharacters[2]).empty()
	});

	$(".enemy").on("click", function(){
		console.log(allEnemies)
		antagonist = ("#"+ $(this).attr("id"))
		allEnemies.splice($.inArray(antagonist, allEnemies), 1)
		console.log(allEnemies)

		$("#defender").append($(antagonist).html())
		$(antagonist).empty()

	});

})