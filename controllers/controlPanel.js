views.appendControlPanel()

if (controllers.bot.controlPanel.isHidden){
	views.hideControlPanel()
} else {
	views.showControlPanel()
}

for(fieldId in controllers.bot.controlPanel.fieldsContent){
	document.getElementById(fieldId).value = controllers.bot.controlPanel.fieldsContent[fieldId]
}

var ipSearchResult = document.getElementById(FIELD_IP_SEARCH_RESULT)
var regexFilter = document.getElementById(REGEX_INPUT_DOM_ID)
if (ipSearchResult.value != ""){
	ipSearchResult.style.display = "block"
	regexFilter.style.display = "block"
} else {
	ipSearchResult.style.display = "none"
	regexFilter.style.display = "none"
}

controllers.functions.filterCrawlerOutput(regexFilter.value)
regexFilter.addEventListener("change", function(){
	controllers.functions.filterCrawlerOutput(regexFilter.value)
})

var fieldsContent = document.getElementsByClassName("fieldsContent")
for (var i = 0; i < fieldsContent.length; i++) {
	fieldsContent[i].addEventListener("change", function(){
		controllers.bot.controlPanel.fieldsContent[this.id] = this.value
		controllers.storage.set(controllers.bot)
	})
}

//Hide command panel if close button is pressed
document.getElementById(COMMAND_PANEL_CLOSE_BUTTON_DOM_ID).addEventListener("click", function(){
	controllers.functions.hidePanel()
})

