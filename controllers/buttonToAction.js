//-----------------------------------//
//----SEQUENCE CALL------------------//
//-----------------------------------//

if (controllers.isRegularGamePage){
	document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanOwnLogs")
	})

	document.getElementById(SET_CLEAN_TARGET_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "cleanTargetLogs")
	})

	document.getElementById(SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID).addEventListener("click", function(){
		controllers.functions.executeSequence("cleaners", "accessTargetAndCleanLogs")
	})

	document.getElementById(SOLVE_RIDDLE_DOM_ID).addEventListener("click", function(){
	    window.alert("There is a red button on every puzzle page. Just click on it. :)");
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

	document.getElementById(PERFORM_INSTALL_SOFTWARE).addEventListener("click", function(){
		controllers.functions.executeSequence("uploader", "upload")
	})

	document.getElementById(SET_SEARCH_FOR_IPS).addEventListener("click", function(){
		controllers.functions.executeSequence("webcrawler", "browseWeb")
	})

	document.getElementById(INFO_ALERT).addEventListener("click", function(){
		window.alert("IMPORTANT!\n\n *Avoid to run the bot into an inactive tab. There are some timing event limitations when tab is inactive in most browsers. So, the bot may break inadvertently.\n\n* Use the notifiers carefully. The logs notifier sends a GET request every second uninterruptedly. The missions notifier sends a GET request every two seconds just when seconds to next missions are <= 1. Otherwise, it just waits. Big amounts of requests MAY be noticed by the game server. \'X-Requested-With\' header is not sent. :)\n\n* Abort the bot anytime. Just click over BOT button. \n\n* If bot suddendly stops, just try to reload the page. If it doesn't work, abort the bot. If you know how to access browser console, copy the error and/or jSpaghetti debug logs and report the problem on official repository.")
	})
}



