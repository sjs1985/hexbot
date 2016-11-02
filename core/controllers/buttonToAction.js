function buttonToAction(){
	document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanOwnLogs")
	})

	document.getElementById(SET_CLEAN_TARGET_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanTargetLogs")
	})

	document.getElementById(SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "accessTargetAndCleanLogs")
	})

	document.getElementById(PERFORM_CHECK_BALANCE_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("missions", "checkBalance")
	})

	document.getElementById(PERFORM_TRANSFER_MONEY_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("missions", "transferMoney")
	})

	document.getElementById(PERFORM_BANK_CAMPING).addEventListener("click", function(){
		controllers.functions.executeSequence("camping", "bankCamping")
	})

	document.getElementById(SET_SEARCH_FOR_IPS).addEventListener("click", function(){
		controllers.functions.executeSequence("webcrawler", "browseWeb")
	})

	document.getElementById(INFO_ALERT).addEventListener("click", function(){
		window.alert(LANG.WARNING_BUTTON)
	})

	document.getElementById(CREDITS_INFO).addEventListener("click", function(){
		views.switchToMainScreenToCreditsScreen()
	})

	document.getElementById(SET_CHAT_PANEL).addEventListener("click", function(){
		views.switchToChatPanel()
		controllers.functions.chat(views.drawChat)	
	})

	document.getElementById(CHAT_SEND_BUTTON).addEventListener("click", function(){
		controllers.functions.chat(views.drawChat, {message: document.getElementById(CHAT_MESSAGE).value, nickname: document.getElementById(CHAT_NICK_NAME).value})	
	})

	document.getElementById(CHAT_REFRESH_BUTTON).addEventListener("click", function(){
		controllers.functions.chat(views.drawChat)	
	})

	document.getElementById(PERFORM_UPDATE_CRACKER).addEventListener("click", function(){
		controllers.functions.executeSequence("riddleSolver", "completePath")
	})
}

	



