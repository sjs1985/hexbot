var uploader = $jSpaghetti.module("uploader")
uploader.config.debugMode = true

uploader.procedure("startUpload", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	shared.softwareId = getSoftwareId(softwareField[0].trim(), softwareField[1].trim())
	if(shared.softwareId == null){
		window.alert("Software not found :(")
		return false
	}
	shared.ips = []
	var ipsField = controllers.bot.controlPanel.fieldsContent[FIELD_IPS_INSTALL_TARGETS].split(",")
	console.log(ipsField)
	for (var i = 0; i < ipsField.length; i++) {
		if (ipsField[i].length > 0)
		shared.ips.push(ipsField[i].trim())
	}
	if(!shared.ips.length){
		window.alert("Inform a ip target")
		return false
	}
	shared.myIp = getMyIp(true)
	console.log(shared)
	return true
})

uploader.procedure("goToNextIp", function(shared){
	goToPage("/internet?ip=" + shared.ips.shift())
})

uploader.procedure("goToSoftwarePage", function(shared){
	goToPage("/software")
})

uploader.procedure("logout", function(){
	goToPage("/internet?view=logout")
})

uploader.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

uploader.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

uploader.procedure("signInTarget", function(){
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

uploader.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

uploader.procedure("goToTargetLogs", function(){
	goToPage("/internet?view=logs")
})

uploader.procedure("cleanMyIpClues", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	var pattern = new RegExp("^.*" + shared.myIp + ".*$")
	var textFiltered = removeLinesFromText(textArea.value, pattern)
	if (textArea.value != textFiltered) textArea.value = textFiltered
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})

uploader.procedure("goToTargetSoftwares", function(){
	goToPage("/internet?view=software")
})

uploader.procedure("goToOwnSoftwareArea", function(){
	goToPage("/software")
})

uploader.procedure("runUploadSoftware", function(shared){
	goToPage("/internet?view=software&cmd=up&id=" + shared.softwareId)
})

uploader.procedure("installSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(softwareField[0].trim(), softwareField[1].trim())
	goToPage("/internet?view=software&cmd=install&id=" + softwareId)
})

uploader.procedure("isSoftwareAlreadyThere", function(){
	var labels = ["O cliente remoto já tem esse software", "The remote client already have this software"]
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return true
	}
	return false
})

uploader.procedure("installSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(softwareField[0].trim(), softwareField[1].trim())
	goToPage("/internet?view=software&cmd=install&id=" + softwareId)
})

uploader.procedure("hideSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(softwareField[0].trim(), softwareField[1].trim())
	goToPage("/internet?view=software&cmd=hide&id=" + softwareId)
})

uploader.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

uploader.procedure("cleanTextAreaContent", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	textArea.value = ""
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})
