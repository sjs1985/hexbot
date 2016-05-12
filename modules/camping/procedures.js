var camping = $jSpaghetti.module("camping")
camping.config.debugMode = true

camping.procedure("startBankCamping", function(shared){
	shared.ip = controllers.bot.controlPanel.fieldsContent[FIELD_BANK_IP_TARGET]
	shared.myAccount = controllers.bot.controlPanel.fieldsContent[FIELD_MY_ACCOUNT]
	shared.accounts = []
	shared.myCluesFound = false
	shared.myIp = getMyIp(true)
	shared.listenForTransferActivities = true
	shared.listenForAccountAccessActivities = false
	shared.isLogged = false
})

camping.procedure("goToIp", function(shared){
	goToPage("/internet?ip=" + shared.ip)
})

camping.procedure("logout", function(shared){
	shared.isLogged = false
	goToPage("/internet?view=logout")
})

camping.procedure("logoutAccount", function(){
	goToPage("/internet?bAction=logout")
})

camping.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

camping.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

camping.procedure("signInTarget", function(shared){
	shared.isLogged = true
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

camping.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

camping.procedure("hackAccount", function(shared){
	goToPage("/internet?action=hack&acc=" + shared.accounts.shift())
})

camping.procedure("accessKnownAccount", function(shared){
	var labels = ["This bank account does not exists", "Invalid bank account", "Essa conta bancária não existe", "inválida"]
	var errorMessageContainer = getDOMElement("div", "class", "alert alert-error", 0)
	if (strposOfArray(errorMessageContainer.innerHTML, labels) == -1){
		getDOMElement("input", "name", "acc", 0).value = getDOMElement("div", "class", "alert alert-error", 0).innerHTML.match(/[0-9]+/)[0]
		getDOMElement("input", "name", "pass", 0).value = getDOMElement("strong", null, null, 1).childNodes[0].nodeValue //Fill the password field with the password on screen
		getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
	}
})

camping.procedure("accessUnknownAccount", function(shared){
	getDOMElement("input", "type", "submit", 1).click() //Click on the Login button
})

camping.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

camping.procedure("cleanMyIpClues", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var pattern = new RegExp("^.*" + shared.myIp + ".*$")
	var textFiltered = removeLinesFromText(textArea.value, pattern)
	if (textArea.value != textFiltered){
		shared.myCluesFound = true
		textArea.value = textFiltered
	} else {
		shared.myCluesFound = false
	}
})

camping.procedure("cleanTextAreaContent", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	textArea.value = ""
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})

camping.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
}) 

camping.procedure("extractDataFromLog", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var lines = textArea.value.split(/[\n\r]/)
	var outputLines = []
	var myIpPattern = new RegExp("^.*" + shared.myIp + ".*$")
	var myAccountPattern = new RegExp("^.* to #" + shared.myAccount + ".*$")
	for (var i = 0; i < lines.length; i++) {
		if ((shared.listenForTransferActivities) &&
			((/\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\] transferred \$[0-9]+ from #[0-9]+.*to #[0-9]+ at localhost/.test(lines[i]))) &&
			(!myIpPattern.test(lines[i])) && (!myAccountPattern.test(lines[i]))) {
			var result = lines[i].match(/#[0-9]+/g)
			shared.accounts.push(result[1].replace("#", ""))
		} else 
		if ((shared.listenForAccountAccessActivities) &&
			((/\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\] logged on account #[0-9]+/.test(lines[i]))) &&
			(!myIpPattern.test(lines[i])) && (!myAccountPattern.test(lines[i]))) {
			var result = lines[i].match(/#[0-9]+/g)
			shared.accounts.push(result[0].replace("#", ""))
		} else {
			outputLines.push(lines[i])
		}
	}
	console.log("Caught accounts:", shared.accounts)
	var accounts = shared.accounts
	shared.accounts = accounts.filter(function(value, pos) {
		return accounts.indexOf(value) == pos
	})
	textArea.value = outputLines.join("\n")
})

camping.procedure("goToTargetLogs", function(){
	goToPage("/internet?view=logs")
})

camping.procedure("transferMoneyToTarget", function(shared){
	getDOMElement("input", "name", "acc", 0).value = shared.myAccount //Fill the To field
	getDOMElement("input", "name", "ip", 1).value = shared.ip //Fill the Bank IP field
	getDOMElement("button", "class", "btn btn-success", 0).click() //Click on the Transfer Money button
})

