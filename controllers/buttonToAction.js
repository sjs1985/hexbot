//-----------------------------------//
//----SEQUENCE CALL------------------//
//-----------------------------------//

//It clean my own logs
document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("click", function(){
	controllers.functions.executeSequence("cleaners", "cleanOwnLogs")
})

