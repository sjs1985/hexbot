//=========CONTENT SCRIPT============//

//Labels of game
var labels = {
    checkBalance: ["Verificar balanço bancário", "Check bank status"],
    transferMoney: ["Transferir dinheiro", "Transfer money"]
}

//This structure stores the data for transmission
var requestData = {
    act: null,
    stepId: null,
    url: null,
    ip: [],
    account: [],
    amount: null,
    language: null,
    job: null,
    counter: null,
    myAccount: null,
    software: null
}

//This estructure stores the default actions
var defaultAct = {
    getRequestData: 1,
    setRequestData: 2
}

//This stores the delay count
var counterDelay = 0;
var delay;
var DEFAULT_DELAY = 10;
var panel, globalAux;

//This stores the default job
var defaultJob = {
    checkBalance: 1,
    transferMoney: 2,
    installSoftware: 3,
    wait: 4
}

//It listens for messages comming from background script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse({ backMessage: "Ok. Request data received by content script" });
        handleRequest(request);
    }
);

//This analyses the url and defines the language
function defineLanguage(request) {
	//Should make it redirect to the desired language? idek
	//This semi fix works around it though.
    request.language = 1;
    request.act = defaultAct.setRequestData;
    sendRequest(request);
}

//This function goes to the page especified by path
function goToPage(path) {
    var currentUrl = window.location.href;
    newUrl = currentUrl.split("/");
    newUrl = newUrl[0] + "//" + newUrl[2] + path;
    window.location.href = newUrl;
}

function startScriptComunnication() { //Get data from background script
    requestData.act = defaultAct.getRequestData;
    sendRequest(requestData);
}

delay = setInterval( //It waits for beginning of script comunication
    function() {
        counterDelay++;
        if (counterDelay >= 30 / DEFAULT_DELAY) {
            clearInterval(delay);
            counterDelay = 0;
            startScriptComunnication();
        }
    }, DEFAULT_DELAY);

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
