views.appendCommandPanel()

var commandPanelStateStorage = new Storage(COMMAND_PANEL_STORAGE_NAME) //It gets the data from storage
var storageContent = commandPanelStateStorage.get()
if(storageContent == null){
	storageContent = new CommandPanel(false)
	commandPanelStateStorage.set(storageContent)
	views.showCommandPanel()
} else {
	if(storageContent.isHidden){
		views.hideCommandPanel()
	} else {
		views.showCommandPanel()
	}
}

controllers.commandPanel = {
	storage: commandPanelStateStorage,
	storageContent: storageContent
}

controllers.functions.hidePanel = function(){
	views.hideCommandPanel()
	var content = controllers.commandPanel.storageContent
	content.isHidden = true
	controllers.commandPanel.storage.set(content)
}

controllers.functions.showPanel = function(){
	views.showCommandPanel()
	var content = controllers.commandPanel.storageContent
	content.isHidden = false
	controllers.commandPanel.storage.set(content)
}

controllers.functions.executeSequence = function(moduleName, sequenceName){
	controllers.functions.hidePanel()
	var newState = new State(moduleName, sequenceName)
	controllers.botState.storage.set(newState)
	var currentSequence = $jSpaghetti.module(moduleName).sequence(sequenceName)
	currentSequence.run()
}

controllers.functions.resetBotAndShowPanel = function (){
	if (controllers.botState.storageContent != null){
		var moduleName = controllers.botState.storageContent.moduleName
		var sequenceName = controllers.botState.storageContent.sequenceName
		$jSpaghetti.module(moduleName).sequence(sequenceName).reset()
		controllers.botState.storage.set(null)
	}
	controllers.functions.showPanel()
}

//Hide command panel
document.getElementById(COMMAND_PANEL_CLOSE_BUTTON_DOM_ID).addEventListener("click", function(){
	controllers.functions.hidePanel()
})
