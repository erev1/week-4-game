$(document).ready(function(){


	var protagonist = undefined
	var antagonist = undefined
	var protagonistName = undefined
	var enemy1Name = undefined
	var enemy2Name = undefined
	var enemy3Name = undefined
	var currentEnemy = undefined
	var win = false 



	var allCharacterDivs = ["#character-1", "#character-2", "#character-3", "#character-4"]
	var allEnemyDivs = ["#enemy-1", "#enemy-2", "#enemy-3"]

	var characterRepo = {
		leia: {name: "Leia", health: 25, startHealth: 25, attack: 3, counterAttack: 3, img: "assets/images/leia.jpg", html: '<div id="leia" class="text-center"><p>Health: <span id="leiasHealth"></span><p><img class="img-responsive center-block" id="leiaImg" width="100px"></div>'},
		octopusGuy: {name: "Octopus Guy", health: 28, startHealth: 28, attack: 4, counterAttack: 4, img: "assets/images/octopusguy.jpg", html: '<div id="octopusGuy" class="text-center"><p>Health: <span id="octopusGuysHealth"></span><p><img class="img-responsive center-block" id="octopusGuyImg" width="100px"></div>'},
		darthVader: {name: "Darth Vader", health: 40, startHealth: 40, attack: 7, counterAttack: 7, img: "assets/images/darthvader.jpg", html: '<div id="darthVader" class="text-center"><p>Health: <span id="darthVadersHealth"></span><p><img class="img-responsive center-block" id="darthVaderImg" width="100px"></div>'},
		chewbacca: {name: "Chew Bacca", health: 30, startHealth: 30, attack: 5, counterAttack: 5, img: "assets/images/chewbacca.jpg", html:'<div id="chewbacca" class="text-center"><p>Health: <span id="chewbaccasHealth"></span><p><img class="img-responsive center-block" id="chewbaccaImg" width="100px"></div>'}
	}


	function resetHealth (){
		characterRepo.leia.health = characterRepo.leia.startHealth
		characterRepo.octopusGuy.health = characterRepo.octopusGuy.startHealth
		characterRepo.darthVader.health = characterRepo.darthVader.startHealth
		characterRepo.chewbacca.health = characterRepo.chewbacca.startHealth
	}

	resetHealth()

	$("#character-1").html(characterRepo.leia.html)
	$("#character-2").html(characterRepo.octopusGuy.html)
	$("#character-3").html(characterRepo.darthVader.html)
	$("#character-4").html(characterRepo.chewbacca.html)



	$("#leiasHealth").text(characterRepo.leia.health)
	$("#octopusGuysHealth").text(characterRepo.octopusGuy.health)
	$("#darthVadersHealth").text(characterRepo.darthVader.health)
	$("#chewbaccasHealth").text(characterRepo.chewbacca.health)
	$("#leiaImg").attr("src", characterRepo.leia.img)
	$("#octopusGuyImg").attr("src", characterRepo.octopusGuy.img)
	$("#darthVaderImg").attr("src", characterRepo.darthVader.img)
	$("#chewbaccaImg").attr("src", characterRepo.chewbacca.img)


	var characterMap = {
		"#character-1": "leia",
		"#character-2": "octopusGuy",
		"#character-3": "darthVader",
		"#character-4": "chewbacca"
	}

	var secondCharacterMap = {
		"#enemy-1": enemy1Name,
		"#enemy-2": enemy2Name,
		"#enemy-3": enemy3Name,
	}
	
	function restart() {
		$("#first-line-game-status").empty()
		$("#second-line-game-status").empty()
		$("#restart").empty()
		$("#defender").empty()
		$("#enemy-1").empty()
		$("#enemy-2").empty()
		$("#enemy-3").empty()
		$("#character-1").css("border","none")
		$("#character-2").css("border","none")
		$("#character-3").css("border","none")
		$("#character-4").css("border","none")
		$("#enemy-1").css("background-color", "transparent")
		$("#enemy-2").css("background-color", "transparent")
		$("#enemy-3").css("background-color", "transparent")

		$("#character-1").html(characterRepo.leia.html)
		$("#character-2").html(characterRepo.octopusGuy.html)
		$("#character-3").html(characterRepo.darthVader.html)
		$("#character-4").html(characterRepo.chewbacca.html)

		allCharacterDivs = ["#character-1", "#character-2", "#character-3", "#character-4"]
		allEnemyDivs = ["#enemy-1", "#enemy-2", "#enemy-3"]
		antagonist = undefined
		protagonist = undefined
		win = false

		resetHealth()

		$("#leiasHealth").text(characterRepo.leia.health)
		$("#octopusGuysHealth").text(characterRepo.octopusGuy.health)
		$("#darthVadersHealth").text(characterRepo.darthVader.health)
		$("#chewbaccasHealth").text(characterRepo.chewbacca.health)


		$("#leiaImg").attr("src", characterRepo.leia.img)
		$("#octopusGuyImg").attr("src", characterRepo.octopusGuy.img)
		$("#darthVaderImg").attr("src", characterRepo.darthVader.img)
		$("#chewbaccaImg").attr("src", characterRepo.chewbacca.img)
	}


	$(".character").on("click", function(){
		if (protagonist != undefined) {
			return
		}
		$(this).css("border","2px solid green")
		protagonist = ("#"+ $(this).attr("id"))
		// console.log("protagonist: " + protagonist)
		protagonistName = characterMap[protagonist]
		// console.log("protagonist name " + protagonistName)
		
		allCharacterDivs.splice($.inArray(protagonist, allCharacterDivs), 1);

		// console.log(allCharacterDivs)

		var enemy1 = ("#" + $(allCharacterDivs[0]).attr("id"))
		var enemy2 = ("#" + $(allCharacterDivs[1]).attr("id"))
		var enemy3 = ("#" + $(allCharacterDivs[2]).attr("id"))

		// console.log(enemy1)

		enemy1Name = characterMap[enemy1]
		enemy2Name = characterMap[enemy2]
		enemy3Name = characterMap[enemy3]

		// console.log("enemy 1 name:" + enemy1Name)
		// console.log("enemy 2 name:" + enemy2Name)
		// console.log("enemy 3 name:" + enemy3Name)

		secondCharacterMap["#enemy-1"] = enemy1Name
		secondCharacterMap["#enemy-2"] = enemy2Name
		secondCharacterMap["#enemy-3"] = enemy3Name

		$("#enemy-1").append($(allCharacterDivs[0]).html())
		$("#enemy-2").append($(allCharacterDivs[1]).html())
		$("#enemy-3").append($(allCharacterDivs[2]).html())


		$("#enemy-1").css("background-color", "red")
		$("#enemy-2").css("background-color", "red")
		$("#enemy-3").css("background-color", "red")

		$(allCharacterDivs[0]).empty()
		$(allCharacterDivs[1]).empty()
		$(allCharacterDivs[2]).empty()

		// console.log("2nd character map enemy 1:" + (secondCharacterMap["#enemy-1"]))
	});

	$(".enemy").on("click", function(){
		if (antagonist != undefined) {
			return
		}
		
		
		antagonist = ("#"+ $(this).attr("id"))


		currentEnemy = secondCharacterMap[antagonist]
		// console.log("current Enemy " + currentEnemy)
		allEnemyDivs.splice($.inArray(antagonist, allEnemyDivs), 1)


		$("#defender").append($(antagonist).html())
		$(this).empty()
		$(this).css("background-color", "transparent")



	});

	$(".attack").on("click", function(){
		if (win){
			return
		}

		if (characterRepo[protagonistName].health <= 0 ){
			
			$("#first-line-game-status").text("You're done!")
			$("#second-line-game-status").empty()
			return 
		}

		characterRepo[currentEnemy].health -= characterRepo[protagonistName].counterAttack
		characterRepo[protagonistName].health -= characterRepo[currentEnemy].attack

		if (characterRepo[protagonistName].health <= 0) {
			
			$("#first-line-game-status").text("You've been defeated.")
			$("#second-line-game-status").text("Game Over!!!!!")

			$("#restart").html('<button class="btn btn-default" aria-hidden="true">restart!</button>')
			$("#restart").on("click", function(){ 
				restart()
			})
		} else if (characterRepo[currentEnemy].health <= 0) {
			$("#defender").empty()
			$("#first-line-game-status").text("You defeated " + characterRepo[currentEnemy].name +"!!" )
			$("#second-line-game-status").text("You can click on another enemy to play against.")
			antagonist = undefined


		} else {
			$("#first-line-game-status").text("You attacked " + characterRepo[currentEnemy].name + " for " + characterRepo[protagonistName].counterAttack + " damage.")
			$("#second-line-game-status").text(characterRepo[currentEnemy].name + " attacked you back for " + characterRepo[currentEnemy].attack + " damage.")
		
		}


		characterRepo[protagonistName].counterAttack += characterRepo[protagonistName].attack

		if (allEnemyDivs.length === 0){
			$("#first-line-game-status").text("Congrats!")
			$("#second-line-game-status").text("You won! Click restart to play again.")
			$("#defender").empty()
			win = true
			$("#restart").html('<button class="btn btn-default" aria-hidden="true">restart!</button>')
			$("#restart").on("click", function(){ 
				restart()
			})
		}

		$("#leiasHealth").text(characterRepo.leia.health)
		$("#octopusGuysHealth").text(characterRepo.octopusGuy.health)
		$("#darthVadersHealth").text(characterRepo.darthVader.health)
		$("#chewbaccasHealth").text(characterRepo.chewbacca.health)
		console.log(allEnemyDivs)

	})



})