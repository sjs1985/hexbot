var foo = $jSpaghetti.module("missions")
foo.config.debugMode = true

foo.procedure("getURLMission", function(shared, internalFunctions){
	function getURL(missionType) { //It returns a mission url by mission type
		var labels = {
				checkBalance: ["Verificar balanço bancário", "Check bank status"],
				transferMoney: ["Transferir dinheiro", "Transfer money"],
				stealSoftware: ["Roubar software", "Steal software"],
				deleteSoftware: ["Deletar software", "Delete software"]
		}
		//Get the URL mission
		var element = document.getElementsByTagName("a")
		var urlMission = null
		var urlIsObtained = false
		for (count = 0; count <= element.length - 1; count++) {
			var aux = element[count]
			var url = aux.href
			aux = aux.childNodes[0]
			linkText = aux.nodeValue
			if (linkText != null) {
				if (missionType == CHECK_BALANCE) {
					if (strposOfArray(linkText, labels.checkBalance) >= 0){
						urlMission = url
						break
					}
				} else
				if (missionType == TRANSFER_MONEY) {
					if (strposOfArray(linkText, labels.transferMoney) >= 0){
						urlMission = url
						break
					}
				}

			}
		}
		return urlMission
	}

	var urlMission = getURL(shared.missionType) //It catches the first available mission URL
	shared.urlMission = urlMission

	if (urlMission){
		internalFunctions.sendSignal("Ok. I got a mission.")
	} else {
		var timeToNextMissions = getDOMElement("b", null, null, 0).childNodes[0].nodeValue; //Get the time missing to next missions package
		if (timeToNextMissions > 0){
			baz = document.createElement("div");
			baz.id = "secondsCounterContainer";
			getDOMElement("div", "class", "widget-content padding", 0).appendChild(baz);

			var count = (timeToNextMissions * 60) - 50;
			var counterDelay = 0;
			var delay = setInterval(function(){
						getDOMElement("div", "id", "secondsCounterContainer", 0).innerHTML = "Updating list in " + (count - counterDelay) + " seconds";
						counterDelay++;
						if (counterDelay >= count) {
								clearInterval(delay);
								internalFunctions.sendSignal("Ok. Time is over.")
						}
					}, 1000); //Repeat the function every second

		} else {
			setTimeout(function(){
				internalFunctions.sendSignal("Ok. I got time 0.")
			}, 3000)
		} 
	}

})

foo.procedure("goToMissionsTab", function(){
	goToPage("/missions")
})

foo.procedure("goToAcceptMissionPage", function(shared){
	window.location.href = shared.urlMission
})

//Click on the Accept mission button
foo.procedure("clickOnAcceptMissionButton", function(shared){
	getDOMElement("span", "class", "btn btn-success mission-accept", 0).click(); 
})

//Click on the div float Accept mission button
foo.procedure("clickOnConfirmAcceptMissionButton", function(shared){
	getDOMElement("input", "type", "submit", 0).click(); 
})

foo.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

foo.procedure("startCheckBalance", function(shared){
	shared.missionType = CHECK_BALANCE
})

foo.procedure("startTransferMoney", function(shared){
	shared.missionType = TRANSFER_MONEY
})

foo.procedure("getMissionInfo", function(shared){
	
})

foo.procedure("start1", function(shared){
	window.alert("estouaki")
})