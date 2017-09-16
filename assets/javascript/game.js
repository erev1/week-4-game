// Nice job putting everything insude the document ready block 👌
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

	restart()
	// All of this logic was being duplicated in your restart function, so in an effort to DRY
	// things up a bit you can simply call restart!

	function restart() {
		allCharacterDivs = ["#character-1", "#character-2", "#character-3", "#character-4"]
		allEnemyDivs = ["#enemy-1", "#enemy-2", "#enemy-3"]

		$("#first-line-game-status").empty()
		$("#second-line-game-status").empty()
		$("#restart").empty()
		$("#defender").empty()

		// this code is somewhat repetitive, so I'd suggest looping over your div arrays
		// and putting the logic inside the loop. That way you only need to write it once.

		allEnemyDivs.forEach(function(divId) {
			$(divId).empty()
			$(divId).css("background-color", "transparent")
		})

		resetHealth()

		allCharacterDivs.forEach(function(divId) {
			var charName = characterMap[ divId ]
			$(divId).css("border","none")
			$(divId).html(characterRepo[ charName ].html)
			$("#" + charName + "sHealth").text(characterRepo[ charName ].health)
			$("#" + charName + "Img").attr("src", characterRepo[ charName ].img)
		})

		antagonist = undefined
		protagonist = undefined
		win = false

	}


	$(".character").on("click", function(){
		// You'll want to get in the habit of using triple equals instead of double.
		// For checking inequality triple equals is the !== and double equals is !=.
		// This is because double equals does type coercion before checking values, you can
		// sometime have the check return true when you wouldn't expect it to
		// and that can cause some really confusing bugs 🐛

		if (protagonist !== undefined) {
			return
		}
		$(this).css("border","2px solid green")
		protagonist = ("#"+ $(this).attr("id"))
		// console.log("protagonist: " + protagonist)
		protagonistName = characterMap[protagonist]
		// console.log("protagonist name " + protagonistName)
		
		allCharacterDivs.splice($.inArray(protagonist, allCharacterDivs), 1);

		// console.log(allCharacterDivs)

		allCharacterDivs.forEach(function(divId, index) {
			var enemyId = "#enemy-" + (index + 1)
			secondCharacterMap[ enemyId ] = characterMap[ divId ]
			$(enemyId).append( $(divId).html() )
			$(enemyId).css("background-color", "red")
			$(divId).empty()
		})

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