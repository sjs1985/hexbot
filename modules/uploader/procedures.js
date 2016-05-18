var uploader = $jSpaghetti.module("uploader")
uploader.config.debugMode = true

uploader.procedure("startUpload", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	if (softwareField[0]){
		shared.softwareName = softwareField[0].trim()
	} else {
		shared.softwareName = ""
	}

	if (softwareField[1]){
		shared.softwareVersion = softwareField[1].trim()
	} else {
		shared.softwareVersion = ""
	}
	shared.softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
	if(shared.softwareId == null){
		window.alert("Software not found :(")
		return false
	}
	shared.ips = []
	var ipsField = controllers.bot.controlPanel.fieldsContent[FIELD_IPS_INSTALL_TARGETS].split(",")
	for (var i = 0; i < ipsField.length; i++) {
		if (ipsField[i].length > 0)
		shared.ips.push(ipsField[i].trim())
	}
	if(!shared.ips.length){
		window.alert("Inform a ip target")
		return false
	}
	shared.isThereLogsArea = false
	shared.myIp = getMyIp(true)
	shared.accessCounter = 0
	shared.isUploadAborted = false
	var timeLimit = controllers.bot.controlPanel.fieldsContent[SET_UPLOAD_TIME_LIMIT]
	if ((timeLimit.length > 0) && (Number(timeLimit) > 0)){
		shared.timeLimit = timeLimit
	} else {
		shared.timeLimit = 0
	}
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

uploader.procedure("signInTarget", function(shared){
	shared.accessCounter++
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
	if (textArea){
		shared.isThereLogsArea = true
		var pattern = new RegExp("^.*" + shared.myIp + ".*$")
		var textFiltered = removeLinesFromText(textArea.value, pattern)
		if (textArea.value != textFiltered) textArea.value = textFiltered
		getDOMElement("input", "class", "btn btn-inverse", "last").click()
	} else {
		shared.isThereLogsArea = false
	}
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
	var softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
	goToPage("/internet?view=software&cmd=install&id=" + softwareId)
})

uploader.procedure("hideSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
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

uploader.procedure("isThereProgressBar", function(){
	var progressBar = getDOMElement("div", "role", "progressbar", 0)
	if (progressBar){
		return true
	} else {
		return false
	}
})

uploader.procedure("isThereMessageSuccess", function(){
	var messageContainer = getDOMElement("div", "class", "alert alert-success", 0)
	var labels = ["Software successfully uploaded", "Upload do software realizado com sucesso"]
	if (messageContainer){
		if (strposOfArray(messageContainer.innerHTML, labels) >= 0) return true
	}
	return false
})

uploader.procedure("ipDoesNotExist", function(){
	var labels = ["Esse IP não existe", "This ip does not exists"]
	var container = getDOMElement("div", "class", "widget-content padding noborder", 0)
	if (container){
		if(strposOfArray(container.innerHTML, labels) >= 0)
		return true
	}
	return false
})

uploader.procedure("isWithinTimeLimit", function(shared){
	var timeContainer = getDOMElement("div", "class", "elapsed", 0)
	if (timeContainer){
		var time = timeContainer.innerHTML.match(/[0-9]+/g)
		if(time.length == 3){
			var leftTime = (Number(time[0])*Math.pow(60, 2)) + (Number(time[1])*60) + (Number(time[2]))
			if ((shared.timeLimit == 0) || (leftTime <= shared.timeLimit)){
				return true
			} else {	
				return false
			}
		} else {
			return true
		}
	} else {
		return true
	}
})

uploader.procedure("abortUpload", function(shared){
	pidContainer = document.getElementsByClassName("span4")[0]
	if (pidContainer){
		var pid = pidContainer.className.match(/[0-9]+/g)[1]
		if (pid){
			shared.isUploadAborted = true
			goToPage("/processes?pid=" + pid + "&del=1")
		} else {
			shared.isUploadAborted = false
		}
	} else {
		shared.isUploadAborted = false
	}
})

