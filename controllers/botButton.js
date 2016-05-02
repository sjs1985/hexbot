views.showBotButton()

//Show command panel
document.getElementById(BOT_BUTTON_DOM_ID).addEventListener("click", function(){
	views.showCommandPanel()
	var content = controllers.commandPanel.storageContent
	content.isHidden = false
	controllers.commandPanel.storage.set(content)
	controllers.functions.resetBotAndShowPanel()
})