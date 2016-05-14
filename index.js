//=========CONTENT SCRIPT============//

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
	//----Put here the sequences that must be running while other sequences is not running -----//
	//------------------------------------------------------------------------------------------//
	var puzzleSolver = $jSpaghetti.module("riddleSolver").sequence("solvePuzzle")
	puzzleSolver.reset()
	puzzleSolver.events.addEventListener("reset", function(){
		puzzleSolver.run()
	})
}

var adRemover = $jSpaghetti.module("adRemover").sequence("removeAds")
adRemover.reset()
adRemover.events.addEventListener("reset", function(){
	adRemover.run()
})


