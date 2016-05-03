//-----------------------------------//
//----SEQUENCE CALL------------------//
//-----------------------------------//

//It clean my own logs
document.getElementById(SET_CLEAN_OWN_LOGS_DOM_ID).addEventListener("click", function(){
	controllers.functions.executeSequence("cleaners", "cleanOwnLogs")
})

document.getElementById(SOLVE_RIDDLE_DOM_ID).onclick = function(){
    window.alert("Everything is ready to use.\nThere is a red button on every puzzle page. Just click on it. :)");
};

