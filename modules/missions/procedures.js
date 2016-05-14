var foo = $jSpaghetti.module("missions")
foo.config.debugMode = true

foo.procedure("getURLMission", function(shared, internalFunctions){

	var labels = {
				checkBalance: ["Verificar balanço bancário", "Check bank status"],
				transferMoney: ["Transferir dinheiro", "Transfer money"],
				stealSoftware: ["Roubar software", "Steal software"],
				deleteSoftware: ["Deletar software", "Delete software"]
			 }

	function getURL(missionType) { //It returns a mission url by mission type
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

foo.procedure("informBalance", function(shared){
	getDOMElement("input", "id", "amount-input", 0).value = shared.balance //Fill the balance field with the balance value
	getDOMElement("span", "class", "btn btn-success mission-complete", 0).click() //Click on the Complete Mission Button
})

foo.procedure("confirmMissionCompleteButton", function(){
	getDOMElement("input", "id", "modal-submit", 0).click()
})

foo.procedure("goToAcceptMissionPage", function(shared){
	window.location.href = shared.urlMission
})

foo.procedure("goToNextIp", function(shared){
	goToPage("/internet?ip=" + shared.ips[shared.nextIp])
	shared.nextIp++
})

foo.procedure("goToBankAccountHacker", function(shared){
	goToPage("/internet?action=hack&type=bank")
})

foo.procedure("goToBankAccountHacker", function(shared){
	goToPage("/internet?action=hack&type=bank")
})

foo.procedure("hackAccount", function(shared){
	goToPage("/internet?action=hack&acc=" + shared.accounts[0])
})

foo.procedure("transferMoneyToTarget", function(shared){
	getDOMElement("input", "name", "acc", 0).value = shared.accounts[1]; //Fill the To field
	getDOMElement("input", "name", "ip", 1).value = shared.ips[1]; //Fill the Bank IP field
	getDOMElement("button", "class", "btn btn-success", 0).click(); //Click on the Transfer Money button
})

foo.procedure("signInAccount", function(shared){
	getDOMElement("input", "name", "acc", 0).value = shared.accounts[0]; //Fill the account field
	getDOMElement("input", "name", "pass", 0).value = getDOMElement("strong", null, null, 1).childNodes[0].nodeValue; //Fill the password field with the password on screen
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

foo.procedure("getAccountBalance", function(shared){
	shared.balance = getDOMElement("strong", null, null, 0).childNodes[0].nodeValue; //Get the account balance
})

foo.procedure("getOutFromAccount", function(shared){
	goToPage("/internet?bAction=logout")
})

foo.procedure("logout", function(){
	goToPage("/internet?view=logout")
})

//Click on the Accept mission button
foo.procedure("clickOnAcceptMissionButton", function(shared){
	getDOMElement("span", "class", "btn btn-success mission-accept", 0).click(); 
})

//Click on the Accept mission button
foo.procedure("clickOnAbortMissionButton", function(shared){
	getDOMElement("span", "class", "btn btn-danger mission-abort", 0).click()
})

//Click on the Accept mission button
foo.procedure("clickOnConfirmAbortMissionButton", function(shared){
	getDOMElement("input", "type", "submit", 0).click();
})

//Click on the div float Accept mission button
foo.procedure("clickOnConfirmAcceptMissionButton", function(shared){
	getDOMElement("input", "type", "submit", 0).click(); 
})

foo.procedure("isThereMessageError", function(){
	if (getDOMElement("div", "class", "alert alert-error", 0))
	return true
})

foo.procedure("isCrackerStrongEnough", function(){
	var errorContainer = getDOMElement("div", "class", "alert alert-error", 0)
	var labels = ["You do not have the needed software to perform this action", "Vocẽ não tem o software necessário para realizar essa ação", "your cracker is not good enough", "seu cracker não é bom o suficiente"]
	if (errorContainer){
		if(strposOfArray(errorContainer.innerHTML, labels) >= 0)
		return false
	}
	return true
})

foo.procedure("askPermissionToAbort", function(shared){
	shared.abortMissionAllowed = window.confirm("Allow bot to abort missions if necessary (Cancel to NO)?")
})

foo.procedure("startCheckBalance", function(shared){
	shared.missionType = CHECK_BALANCE
	shared.ips = []
	shared.accounts = []
	shared.nextIp = 0
})

foo.procedure("startTransferMoney", function(shared){
	shared.missionType = TRANSFER_MONEY
	shared.ips = []
	shared.accounts = []
	shared.cleanerCount = 0
	shared.nextIp = 0
})

foo.procedure("getMissionInfo", function(shared){
	//Get ips
	try{
		shared.ips.push(getDOMElement("a", "class", "small", 0).childNodes[0].nodeValue)
		shared.ips.push(getDOMElement("a", "class", "small", 1).childNodes[0].nodeValue)
	}catch(error){
		console.log(error.message)
	}
	//Get accounts
	element = document.getElementsByTagName("td");
	for(i = 0; i <= element.length - 1; i++){
		var aux = element[i]
		aux = aux.childNodes[0]
		aux = aux.nodeValue
		if (aux != null){
			if (aux.search("#") >= 0){
				shared.accounts.push(aux.substr(1, aux.length - 1))
			}   
		}
	}
})

foo.procedure("forceToAccessTarget", function(){
	goToPage("/internet?action=hack")
})

foo.procedure("signInKnownTarget", function(){
	getDOMElement("input", "type", "submit", 1).click(); //Click on the Login button
})

foo.procedure("hackTargetBruteForce", function(){
	goToPage("/internet?action=hack&method=bf")
})

foo.procedure("cleanMyIpClues", function(data){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		data.isEmpty = false
		var pattern = new RegExp("^.*" + getMyIp(true) + ".*$")
		textArea.value = removeLinesFromText(textArea.value, pattern)
		getDOMElement("input", "class", "btn btn-inverse", "last").click()
	} else {
		data.isEmpty = true
	}
	if(data.cleanerCount != undefined) data.cleanerCount++
})

foo.procedure("cleanTextAreaContent", function(data){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		data.isEmpty = false
		textArea.value = ""
		getDOMElement("input", "class", "btn btn-inverse", "last").click()
	} else {
		data.isEmpty = true
	}
	if(data.cleanerCount != undefined) data.cleanerCount++
})

foo.procedure("informBadCracker", function(){
	alert("Your cracker is not strong enough to continue")
})

foo.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

foo.procedure("checkSameTypeAcceptedMission", function(shared){
	var labels = {
			checkBalance: ["balance", "balanço"],
			transferMoney: ["transfer", "transferir"]
			//stealSoftware: ["Roubar software", "Steal software"],
			//deleteSoftware: ["Deletar software", "Delete software"]
		 }
	var missionDescription = getDOMElement("div", "class", "article-post", 0)
	if ((missionDescription) && (strposOfArray(missionDescription.innerHTML, labels[shared.missionType]) >= 0)){
		return true
	}
})

foo.procedure("isAvailableMissionsPage", function(){
	labels = ["Missões disponíveis", "Available missions"]
	var titleElement = getDOMElement("h5", null, null, 0)
	if (titleElement){
		if(strposOfArray(titleElement.childNodes[0].nodeValue, labels) >= 0){
			return true
		}
	}
})

foo.procedure("alertAnotherMissionKindAlreadyAccepted", function(){
	alert("It seems there is another mission of another type already accepted. Finish it or abort it before trying again.")
})

foo.procedure("clickOnTransferMoneyFinishButton", function(){
	 getDOMElement("span", "class", "btn btn-success mission-complete", 0).click();
})