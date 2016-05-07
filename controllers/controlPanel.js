views.appendControlPanel()

var controlPanelStateStorage = new Storage(COMMAND_PANEL_STORAGE_NAME) //It gets the data from storage
var storageContent = controlPanelStateStorage.get()
if(storageContent == null){
	storageContent = new ControlPanel(false)
	controlPanelStateStorage.set(storageContent)
	views.showControlPanel()
} else {
	if(storageContent.isHidden){
		views.hideControlPanel()
	} else {
		views.showControlPanel()
	}
}

controllers.controlPanel = {
	storage: controlPanelStateStorage,
	storageContent: storageContent
}

controllers.functions.hidePanel = function(){
	views.hideControlPanel()
	var content = controllers.controlPanel.storageContent
	content.isHidden = true
	controllers.controlPanel.storage.set(content)
}

controllers.functions.showPanel = function(){
	views.showControlPanel()
	var content = controllers.controlPanel.storageContent
	content.isHidden = false
	controllers.controlPanel.storage.set(content)
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
