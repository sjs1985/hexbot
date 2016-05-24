//=========CONTENT SCRIPT============//

if(controllers.isRegularGamePage){
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
	//------------------------------------------------------------------------------------------//
	//----Put here the sequences that must be running every time-------------------------- -----//
	//------------------------------------------------------------------------------------------//
	var adRemover = $jSpaghetti.module("adRemover").sequence("removeAds")
	adRemover.reset()
	adRemover.events.addEventListener("reset", function(){
		adRemover.run()
	})
	if(controllers.bot.controlPanel.checkBoxes[SET_MISSIONS_MONITOR]){
		var missionMonitor = $jSpaghetti.module("monitor").sequence("checkMission")
		missionMonitor.run()
		missionMonitor.events.addEventListener("terminated", function(){
			missionMonitor.reset()
		})
	}
	if(controllers.bot.controlPanel.checkBoxes[SET_LOGS_MONITOR]){
		var logsMonitor = $jSpaghetti.module("monitor").sequence("checkMyOwnLogs")
		logsMonitor.run()
		logsMonitor.events.addEventListener("terminated", function(){
			logsMonitor.reset()
		})
	}
} else {
	console.log("HExBot: running nothing. This is not a regular game page")
}
