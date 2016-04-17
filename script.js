//=========CONTENT SCRIPT============//

//It listens for messages comming from background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({ backMessage: "Ok. Request data received by content script" });
        handleRequest(request);
    }
);
delay = setInterval( //It waits for beginning of script comunication
    function() {
        counterDelay++;
        if (counterDelay >= 30 / DEFAULT_DELAY) {
            clearInterval(delay);
            counterDelay = 0;
            startScriptCommunication();
        }
    }, DEFAULT_DELAY);


//Puzzle handler controller
var puzzle_id = null;
puzzle_id = getPuzzleId();
if ((puzzle_id != null) && (!getNextPuzzleIP())){
    detectAndSetLang(); 
    var button_content = null;
    switch(environment_settings.detected_lang){
      case LANG_EN:
        button_content = "Solve riddle";
        break;
      case LANG_BR:
        button_content = "Resolver este enigma";
        break;
      default:
        button_content = "Solve riddle";
    }
    getSomeElement("div", "class", "widget-title", 1).innerHTML += '<button id="solvePuzzleButton" class="btn btn-danger mission-abort">' + button_content + '</button>';
    document.getElementById("solvePuzzleButton").addEventListener("click", function(){
        solvePuzzle(puzzle_id);
    });
}
//End puzzle handler controller

aux = document.createElement("li"); //Create a STOP BOT button
aux.className = "btn btn-danger mission-abort";
aux.innerHTML = '<a><span class="text" style="color: white;">BOT</span></a>';
document.getElementsByClassName("nav btn-group")[0].appendChild(aux);
aux.onclick = function() {
    requestData = resetRequestDada(requestData);
    requestData.job = defaultJob.checkBalance;
    setNextStep(requestData, "chooseJob");
    location.reload(true)
};