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
	puzzleSolver.run()
	puzzleSolver.events.addEventListener("terminated", function(){
		puzzleSolver.reset()
	})
}

var adRemover = $jSpaghetti.module("adRemover").sequence("removeAds")
adRemover.run()
adRemover.events.addEventListener("terminated", function(){
	adRemover.reset()
})

