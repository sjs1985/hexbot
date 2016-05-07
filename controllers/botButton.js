views.showBotButton()

//Show command panel
document.getElementById(BOT_BUTTON_DOM_ID).addEventListener("click", function(){
	var content = controllers.controlPanel.storageContent
	content.isHidden = false
	controllers.controlPanel.storage.set(content)
	controllers.functions.resetBotAndShowPanel()
})