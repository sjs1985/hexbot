//=========CONTENT SCRIPT============//

if(controllers.isRegularGamePage){
	//------------------------------------------------------------------------------------------//
	//----Put here the sequences that must be running every time-------------------------- -----//
	//------------------------------------------------------------------------------------------//
	/* -- THIS IS AN UNSECURE SEQUENCE. THIS MAY MAKE THE BOT DETECTABLE. REMOVE THE COMMENTS IF YOU TRUST IN IT --
	var missionMonitor = $jSpaghetti.module("monitor").sequence("checkMission")
	missionMonitor.run()
	missionMonitor.events.addEventListener("terminated", function(){
		missionMonitor.reset()
	})
	*/
	var adRemover = $jSpaghetti.module("adRemover").sequence("removeAds")
	adRemover.reset()
	adRemover.events.addEventListener("reset", function(){
		adRemover.run()
	})

	if(controllers.bot.currentSequence != null){ //Executes the current sequence
		var moduleName = controllers.bot.currentSequence.moduleName
		var sequenceName = controllers.bot.currentSequence.sequenceName
		var currentSequence = $jSpaghetti.module(moduleName).sequence(sequenceName)
		currentSequence.run()
		currentSequence.events.addEventListener("terminated", function(){
			controllers.functions.resetBotAndShowPanel()
		})
	} else {
		//------------------------------------------------------------------------------------------//
		//----Put here the sequences that must be running while defined sequence is not running-----//
		//------------------------------------------------------------------------------------------//
		var puzzleSolver = $jSpaghetti.module("riddleSolver").sequence("solvePuzzle")
		puzzleSolver.run()
		puzzleSolver.events.addEventListener("terminated", function(){
			puzzleSolver.reset()
		})
	}
} else {
	console.log("HExBot: running nothing. This is not a regular game page")
}
