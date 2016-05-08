var camping = $jSpaghetti.module("camping")
camping.config.debugMode = true

camping.procedure("startBankCamping", function(shared){
	shared.ip = controllers.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET]
	shared.account = controllers.bot.controlPanel.fieldsContent[FIELD_MY_ACCOUNT]
})

camping.procedure("goToIp", function(shared){
	goToPage("/internet?ip=" + shared.ip)
})

camping.procedure("logout", function(){
	goToPage("/internet?view=logout")
})

camping.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

camping.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

camping.procedure("signInKnownTarget", function(){
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

camping.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

camping.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

camping.procedure("cleanMyIpClues", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		shared.isEmpty = false
		var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
		textArea.value = removeLinesFromText(textArea.value, pattern)
		getDOMElement("input", "class", "btn btn-inverse", "last").click()
	} else {
		shared.isEmpty = true
	}
})

camping.procedure("cleanTextAreaContent", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		shared.isEmpty = false
		textArea.value = ""
		getDOMElement("input", "class", "btn btn-inverse", "last").click()
	} else {
		shared.isEmpty = true
	}
})