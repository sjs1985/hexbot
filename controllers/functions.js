controllers.functions = {}

controllers.functions.hidePanel = function(){
	views.hideControlPanel()
	var content = controllers.bot.controlPanel
	content.isHidden = true
	controllers.storage.set(controllers.bot)
}

controllers.functions.showPanel = function(){
	views.showControlPanel()
	var content = controllers.bot.controlPanel
	content.isHidden = false
	controllers.storage.set(controllers.bot)
}

controllers.functions.executeSequence = function(moduleName, sequenceName){
	controllers.functions.hidePanel()
	var sequence = new Sequence(moduleName, sequenceName)
	controllers.bot.currentSequence = sequence
	controllers.storage.set(controllers.bot)
	var currentSequence = $jSpaghetti.module(moduleName).sequence(sequenceName)
	currentSequence.reset()
	currentSequence.events.addEventListener("reset", function(){
		currentSequence.run()
		currentSequence.events.addEventListener("terminated", function(){
			controllers.functions.resetBotAndShowPanel()
		})
	})
}

controllers.functions.resetBotAndShowPanel = function (){
	if (controllers.bot.currentSequence != null){
		var moduleName = controllers.bot.currentSequence.moduleName
		var sequenceName = controllers.bot.currentSequence.sequenceName
		$jSpaghetti.module(moduleName).sequence(sequenceName).reset()
	}
	controllers.bot.currentSequence = null
	controllers.bot.controlPanel.isHidden = false
	controllers.storage.set(controllers.bot)
	controllers.functions.showPanel()
}