var camping = $jSpaghetti.module("camping")
camping.config.debugMode = true

camping.procedure("startBankCamping", function(shared){
	shared.ip = controllers.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET]
	shared.myAccount = controllers.bot.controlPanel.fieldsContent[FIELD_MY_ACCOUNT]
	shared.accounts = []
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

camping.procedure("hackAccount", function(shared){
	goToPage("/internet?action=hack&acc=" + shared.accounts.shift())
})

camping.procedure("accessKnownAccount", function(shared){
	getDOMElement("input", "name", "acc", 0).value = getDOMElement("div", "class", "alert alert-error", 0).value.match(/[0-9]+/)[0]
	getDOMElement("input", "name", "pass", 0).value = getDOMElement("strong", null, null, 1).childNodes[0].nodeValue. //Fill the password field with the password on screen
	getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
})

camping.procedure("accessUnknownAccount", function(shared){
	getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
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

camping.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})

camping.procedure("extractTransferLogAccount", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var lines = textArea.value.split(/[\n\r]/)
	var outputLines = []
	var accounts = []
	var myIpPattern = new RegExp("^.*" + getMyIp(true) + ".*$")
	for (var i = 0; i < lines.length; i++) {
		if ((/\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\] transferred \$[0-9]+ from #[0-9]+.*to #[0-9]+ at localhost/.test(lines[i])) &&
			(!myIpPattern.test(lines[i]))) {
			var result = lines[i].match(/#[0-9]+/g)
			accounts.push(result[1].replace("#", ""))
		} else {
			outputLines.push(lines[i])
		}
	}
	shared.accounts = accounts.filter(function(value, pos) {
		return accounts.indexOf(value) == pos
	})
	textArea.value = outputLines.join("\n")
})

camping.procedure("goToTargetLogs", function(){
	goToPage("/internet?view=logs")
})

camping.procedure("showResult", function(shared){
	console.log(shared.accounts)
})