views.showBotButton()

//Show command panel
document.getElementById(BOT_BUTTON_DOM_ID).addEventListener("click", function(){
	controllers.bot.controlPanel.isHidden = false
	controllers.storage.set(controllers.bot)
	controllers.functions.resetBotAndShowPanel()
})