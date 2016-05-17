var webcrawler = $jSpaghetti.module("webcrawler")
webcrawler.config.debugMode = true

webcrawler.procedure("startSearching", function(shared){
	var inputIps = controllers.bot.controlPanel.fieldsContent[FIELD_IPS_START_SEARCHING].split(",")
	if (inputIps.length > 0){
		shared.openList = []
		for (var i = 0; i < inputIps.length; i++) {
			shared.openList.push(inputIps[i].trim())
		}
		shared.getSoftwareMode = true
		shared.closedList = []
		shared.inaccessibleHostsList = []
		shared.accessibleHostsList = []
		shared.accessCounter = 0
		shared.currentIp = []
		shared.newHostsList = []
		shared.BTCAccountList = []
		shared.shoppingLogList = []
		shared.clanServerList = []
		shared.softwareList = []
		shared.isClanServer = false
		shared.myIp = getMyIp(true)
		return true
	} else {
		return false
	}	
})

webcrawler.procedure("accountClanServer", function(shared){
	var serverClanButton = getDOMElement("a", "href", "?view=clan", 0)
	if (serverClanButton){
		shared.isClanServer = true
		shared.clanServerList.push(shared.currentIp)
		return true
	} else {
		shared.isClanServer = false
	}
	
})

webcrawler.procedure("getIpsFromLogs", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if(textArea){
		var ips = textArea.value.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/gm)
		if (ips){
			var uniqueIps = ips.filter(function(item, pos){
			return ips.indexOf(item) == pos
			})
			for (var i = 0; i < uniqueIps.length; i++) {
				if ((shared.openList.indexOf(uniqueIps[i]) == -1) && (shared.closedList.indexOf(uniqueIps[i]) == -1)){
					shared.newHostsList.push(uniqueIps[i])
					shared.openList.push(uniqueIps[i])
				}
			}
		}
	}
})

webcrawler.procedure("updateCrawlerLogs", function(data){
	controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] = ""
	if(data.newHostsList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "NEW IPS FOUND: " + data.newHostsList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.newHostsList.join(", ") + "\n\n"
	} 
	if(data.accessibleHostsList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "ACCESSIBLE HOSTS: " + data.accessibleHostsList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.accessibleHostsList.join(", ") + "\n\n"
	} 
	if(data.inaccessibleHostsList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "INACCESSIBLE HOSTS: " + data.inaccessibleHostsList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.inaccessibleHostsList.join(", ") + "\n\n"
	}
	if(data.openList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "UNTESTED HOSTS: " + data.openList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.openList.join(", ") + "\n\n"	
	}
	if(data.clanServerList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "CLAN SERVERS: " + data.clanServerList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.clanServerList.join(", ") + "\n\n"	
	}
	if(data.BTCAccountList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "BTC LOGS: " + data.BTCAccountList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.BTCAccountList.join("\n") + "\n\n"		
	}
	if(data.shoppingLogList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "SHOPPING LOGS: " + data.shoppingLogList.length + "\n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.shoppingLogList.join("\n") + "\n\n"	
	}
	if(data.softwareList.length > 0){
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += "SOFTWARES FOUND: \n" 
		controllers.bot.controlPanel.fieldsContent[FIELD_IP_SEARCH_RESULT] += data.softwareList.join("\n")	
	}
	controllers.storage.set(controllers.bot)
})

webcrawler.procedure("getBTCAccounts", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea){
		var BTCAccounts = textArea.value.match(/^.*\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\] on account .* using key .*$/gm)
		if ((BTCAccounts) && (BTCAccounts.length > 0)) shared.BTCAccountList = shared.BTCAccountList.concat(BTCAccounts)
	}
})

webcrawler.procedure("getShoppingLogs", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea){
		var shoppingLogs = textArea.value.match(/^.*upgraded.*for \$[0-9].*Funds were transferred from account.*$/gm)
		if ((shoppingLogs) && (shoppingLogs.length > 0)) shared.shoppingLogList = shared.shoppingLogList.concat(shoppingLogs)
	}
})

webcrawler.procedure("goToNextIp", function(shared){
	shared.currentIp = shared.openList.shift()
	shared.closedList.push(shared.currentIp)
	goToPage("/internet?ip=" + shared.currentIp)
})

webcrawler.procedure("submitLogs", function(shared){
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
}) 

webcrawler.procedure("goToSoftwarePage", function(shared){
	goToPage("/software")
})

webcrawler.procedure("logout", function(){
	goToPage("/internet?view=logout")
})

webcrawler.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

webcrawler.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

webcrawler.procedure("signInTarget", function(shared){
	shared.accessibleHostsList.push(shared.currentIp)
	shared.accessCounter++
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

webcrawler.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

webcrawler.procedure("goToTargetLogs", function(){
	goToPage("/internet?view=logs")
})

webcrawler.procedure("cleanMyIpClues", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea){
		var pattern = new RegExp("^.*" + shared.myIp + ".*$")
		var textFiltered = removeLinesFromText(textArea.value, pattern)
		if (textArea.value != textFiltered) textArea.value = textFiltered
	}
})

webcrawler.procedure("goToTargetSoftwares", function(){
	goToPage("/internet?view=software")
})

webcrawler.procedure("goToOwnSoftwareArea", function(){
	goToPage("/software")
})

webcrawler.procedure("runUploadSoftware", function(shared){
	goToPage("/internet?view=software&cmd=up&id=" + shared.softwareId)
})

webcrawler.procedure("installSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
	goToPage("/internet?view=software&cmd=install&id=" + softwareId)
})

webcrawler.procedure("isSoftwareAlreadyThere", function(){
	var labels = ["O cliente remoto já tem esse software", "The remote client already have this software"]
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return true
	}
	return false
})

webcrawler.procedure("installSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
	goToPage("/internet?view=software&cmd=install&id=" + softwareId)
})

webcrawler.procedure("hideSoftware", function(shared){
	var softwareField = controllers.bot.controlPanel.fieldsContent[FIELD_SOFTWARE_TO_INSTALL].split(",")
	var softwareId = getSoftwareId(shared.softwareName, shared.softwareVersion)
	goToPage("/internet?view=software&cmd=hide&id=" + softwareId)
})

webcrawler.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

webcrawler.procedure("cleanTextAreaContent", function(shared){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	textArea.value = ""
	getDOMElement("input", "class", "btn btn-inverse", "last").click()
})

webcrawler.procedure("isThereProgressBar", function(){
	var progressBar = getDOMElement("div", "role", "progressbar", 0)
	if (progressBar){
		return true
	} else {
		return false
	}
})

webcrawler.procedure("resetAccessCounter", function(shared){
	shared.accessCounter = 0
})

webcrawler.procedure("ipDoesNotExist", function(){
	var labels = ["Esse IP não existe", "This ip does not exists"]
	var container = getDOMElement("div", "class", "widget-content padding noborder", 0)
	if (container){
		if(strposOfArray(container.innerHTML, labels) >= 0)
		return true
	}
	return false
})

webcrawler.procedure("registerInaccessible", function(shared){
	shared.inaccessibleHostsList.push(shared.currentIp)
})

webcrawler.procedure("getSoftwares", function(shared){
	var softwareTable = getDOMElement("table", "class", "table table-cozy table-bordered table-striped table-software table-hover with-check", 0)
	var rows = softwareTable.getElementsByTagName("tr")
	for (var i = 0; i < rows.length; i++) {
		var data = rows[i].getElementsByTagName("td")
		var softwareMetaData = []
		if ((data) && (data.length == 5) && (/(delete|=del)/.test(data[4].innerHTML))){
			for (var z = 1; z < 5; z++) {
				var metaData = data[z].innerHTML.replace(/(<([^>]+)>)/ig, "")
				if (metaData){
					metaData = metaData.replace(/[\n\r]+/g, '')
					if (metaData.length > 0) softwareMetaData.push(metaData)
				}
			}
			shared.softwareList.push(softwareMetaData.join(", ") + ": " + shared.currentIp)
		}
	}
})
