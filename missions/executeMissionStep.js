//mail-unread label label-important
//<span class="mail-unread label label-important">1</span>
//Execute the steps
function executeMissionStep(request) {
    var aux, count, aux2;
    switch (request.stepId) {
        case "chooseJob": //It shows the first choice panel
            aux = document.createElement("div");
            aux.id = "gen-modal";
            aux.className = "modal hide in";
            aux.tabindex = "0";
            aux['aria-hidden'] = false;
            aux.style.display = "block";
            aux.innerHTML =
                '<div class="widget-title">' +
                '<h5>Hacker Experience Bot</h5>' +
                '<span id="set-hide-menu" class="btn btn-danger hide1024" style="float: right">X</span>' +
                '</div>' +
                '<div class="modal-body">' +
                '<button id="set-check-account-status-job" class="btn btn-success">Perform check account status missions</button> ' +
                '<button id="set-transfer-money-job" class="btn btn-success">Perform transfer money missions</button><br><br>' +
                '<button id="set-cleaner" class="btn btn-success"> Clean your logs </button> ' +
                '<button id="set-victim-cleaner" class="btn btn-success"> Clean victim logs </button> ' +
                '<button id="set-cleanlogin" class="btn btn-success"> Clean login/hack </button> ' +
                '<button id="set-infosolveriddles" class="btn btn-success"> Solve puzzles </button><br><br><br>'+
                '<button id="set-camping-bank-logs" class="btn btn-success"> Listen transfer bank logs on </button>' +
                '<input id="target-bank-ip" class="controls" type="text" value="{IP OF BANK}" style="vertical-align: top; margin-left: 10px; margin-right: 10px;"> and transfer to my account: <input id="set-my-account" class="controls" type="text" value="{BANKING ID}" style="vertical-align: initial; margin-left: 10px; margin-right: 10px;"><br><br>' +
                '<button id="set-install-software" class="btn btn-success"> Upload, install and hide this</button>' +
                '<input id="installSoftware" class="controls" type="text" value="{MALWARE NAME}, {VERSION}" style="vertical-align: top; margin-left: 10px; margin-right: 10px;"> software on these <input id="ip-install-targets" class="controls" type="text" value="{IP OF VICTIM}, {IP OF VICTIM}" style="vertical-align: initial; margin-left: 10px; margin-right: 10px;"> IPs.<br>'; +
            '</div>'
            document.getElementsByTagName("BODY")[0].appendChild(aux);
            document.getElementById("set-infosolveriddles").onclick = function(){
                window.alert("Everything is ready to use.\nThere is a red button on every puzzle page. Just click on it. :)");
            };
            document.getElementById("set-check-account-status-job").onclick = function() {
                request.job = defaultJob.checkBalance;
                setNextStep(request, "tryToGetSomeMission");
                goToPage("/missions");
            };
            document.getElementById("set-transfer-money-job").onclick = function() {
                request.job = defaultJob.transferMoney;
                setNextStep(request, "tryToGetSomeMission");
                goToPage("/missions");
            };
            document.getElementById("set-camping-bank-logs").onclick = function() {
                request = resetRequestDada(request);
                request.job = defaultJob.campingBankLogs;
                request.ip[0] = getSomeElement("input", "id", "target-bank-ip", 0).value;
                request.myAccount = getSomeElement("input", "id", "set-my-account", 0).value;
                setNextStep(request, "fillIPOnInternetPage");
                goToPage("/internet");
            };
            document.getElementById("set-cleaner").onclick = function() { //MY CLASS
                setNextStep(request, "cleanOwnLogSingle");
                goToPage("/log");
            };
            document.getElementById("set-cleanlogin").onclick = function() { //MY CLASS
                setNextStep(request, "goToServerTab2");
                goToPage("/internet");
            };
            document.getElementById("set-victim-cleaner").onclick = function() { //MY CLASS
                setNextStep(request, "removeLogsFromTarget3");
                goToPage("/internet?view=logs");
            };
            document.getElementById("set-install-software").onclick = function() {
                request = resetRequestDada(request);
                request.job = defaultJob.installSoftware;
                request.software = document.getElementById("installSoftware").value;
                aux2 = document.getElementById("ip-install-targets").value;
                if (aux2.search(",") >= 0) {
                    aux2 = aux2.split(",");
                    for (aux = 0; aux <= aux2.length - 1; aux++) {
                        request.ip[aux] = aux2[aux].trim();
                    }
                } else {
                    request.ip[0] = aux2.trim();
                }
                setNextStep(request, "checkSoftware");
                goToPage("/software");
            };
            document.getElementById("set-hide-menu").onclick = function() {
                request = resetRequestDada(request);
                request.job = defaultJob.wait;
                setNextStep(request, "");
                location.reload(true);
            };
            break;
        case "accessMissionPage":
            setNextStep(request, "tryToGetSomeMission");
            goToPage("/missions");
            break;
        case "tryToGetSomeMission":
            request = resetRequestDada(request);
            defineLanguage(request);
            request = getSomeMission(request);
            if (request.url != null) {
                setNextStep(request, "acceptMission");
                window.location.href = request.url;
            } else {
                setNextStep(request, "tryToGetSomeMission");
                count = getSomeElement("b", null, null, 0).childNodes[0].nodeValue; //Get the time missing to next missions package
                if (request.counter > 0) { //Check of own log needs to be clean
                    setNextStep(request, "cleanOwnLog");
                    goToPage("/log");
                } else
                if (count > 0) {

                    aux = document.createElement("div");
                    aux.id = "secondsCounterContainer";
                    getSomeElement("div", "class", "widget-content padding", 0).appendChild(aux);

                    count = (count * 60) - 50;
                    console.log("Wait " + count + " seconds");
                    counterDelay = 0;
                    delay = setInterval(
                        function() {


                            try {
                                getSomeElement("div", "id", "secondsCounterContainer", 0).childNodes[0].nodeValue = "Updating list in " + (count - counterDelay) + " seconds";
                            } catch (error) {
                                console.log(error.message);
                                aux = document.createTextNode("Updating list in " + (count - counterDelay) + " seconds");
                                getSomeElement("div", "id", "secondsCounterContainer", 0).appendChild(aux);
                            }


                            counterDelay++;
                            if (counterDelay >= count) {
                                clearInterval(delay);
                                goToPage("/missions");
                            }
                        }, 1000); //Wait the specified time on the page
                } else {
                    goToPage("/missions");
                    //window.close();
                }
            }
            break;
        case "acceptMission":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check is some error has happened 
                setNextStep(request, "getMissionInformationAndGoToInternetPage");
                getSomeElement("span", "class", "btn btn-success mission-accept", 0).click(); //Click on the Accept mission button
                counterDelay = 0;
                delay = setInterval(
                    function() {
                        counterDelay++;
                        if (counterDelay >= 1000 / DEFAULT_DELAY) {
                            clearInterval(delay);
                            counterDelay = 0;
                            getSomeElement("input", "type", "submit", 0).click(); //Click on the div float Accept mission button
                        }
                    }, DEFAULT_DELAY);
            } else {
                setNextStep(request, "tryToGetSomeMission");
                goToPage("/missions");
            }
            break;
        case "getMissionInformationAndGoToInternetPage":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check is some error has happened 
                request = getMissionInformation(request);
                request.counter++;
                setNextStep(request, "fillIPOnInternetPage");
                goToPage("/internet");
            } else {
                setNextStep(request, "tryToGetSomeMission");
                goToPage("/missions");
            }
            break;
        case "fillIPOnInternetPage":
            if (getSomeElement("a", "href", "?view=logout", 0) == null) {
                switch (request.job) {
                    case defaultJob.stealBitcoinData:
                        setNextStep(request, "goToServerTab");
                        break;
                    default:
                        setNextStep(request, "accessHackAccountTab");
                        break;
                }
                getSomeElement("input", "class", "browser-bar", 0).value = request.ip[0]; //Fill IP Adress bar
                getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
            } else {
                setNextStep(request, "fillIPOnInternetPage");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "accessHackAccountTab":
            setNextStep(request, "hackAccount");
            goToPage("/internet?action=hack&type=bank");
            break;
        case "hackAccount":
            setNextStep(request, "waitForEditAccountHackProcess");
            getSomeElement("input", "name", "acc", 0).value = request.account[0]; //Fill Account to hack bar
            getSomeElement("button", "type", "submit", 0).click(); //Click on Hack button
            break;
        case "waitForEditAccountHackProcess":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check for error message
                setNextStep(request, "signInAccount");
            } else {
                setNextStep(request, "abortMission");
                goToPage("/missions");
            }
            break;
        case "signInAccount":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check for success message
                switch (request.job) {
                    case defaultJob.checkBalance:
                        setNextStep(request, "getTheAccountBalance");
                        break;
                    case defaultJob.transferMoney:
                        setNextStep(request, "transferMoney");
                        break;
                    default:
                        break;
                }

                getSomeElement("input", "name", "acc", 0).value = request.account[0]; //Fill the account field
                getSomeElement("input", "name", "pass", 0).value = getSomeElement("strong", null, null, 1).childNodes[0].nodeValue; //Fill the password field with the password on screen
                getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button
            } else {
                setNextStep(request, "abortMission");
                goToPage("/missions");
            }
            break;
        case "getTheAccountBalance":
            request.amount = getSomeElement("strong", null, null, 0).childNodes[0].nodeValue; //Get the account balance
            setNextStep(request, "goToServerTab");
            getSomeElement("a", "href", "?bAction=logout", 0).click(); //Click on the account logout button
            break;
        case "transferMoney":
            counterDelay = 0;
            delay = setInterval(
                function() {
                    counterDelay++;
                    if (counterDelay >= 1) {
                        clearInterval(delay);
                        setNextStep(request, "goOutToTheAccount");
                        getSomeElement("input", "name", "acc", 0).value = request.account[1]; //Fill the To field
                        getSomeElement("input", "name", "ip", 1).value = request.ip[1]; //Fill the Bank IP field
                        getSomeElement("button", "class", "btn btn-success", 0).click(); //Click on the Transfer Money button
                    }

                }, 1000); //Wait the specified time on the page
            break;
        case "goOutToTheAccount":
            setNextStep(request, "goToServerTab");
            getSomeElement("a", "href", "?bAction=logout", 0).click(); //Click on the account logout button	
            break;
        case "goToServerTab":
            setNextStep(request, "signInKnownServer");
            getSomeElement("a", "href", "?action=login", 0).click(); //Click on the server login tab
            break;
        case "goToServerTab2":
            setNextStep(request, "signInKnownServer2");
            getSomeElement("a", "href", "?action=login", 0).click(); //Click on the server login tab
            break;
        case "signInKnownServer":
            if (getSomeElement("strong", null, null, 1) != null) { //Check if the password is avaiable 
                setNextStep(request, "removeLogsFromTarget");
                aux = getSomeElement("span", "class", "small pull-left", 0).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "name", "user", 0).value = aux; //Fill the user field with the user on screen
                aux = getSomeElement("span", "class", "small pull-left", 1).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "type", "password", 0).value = aux; //Fill the password field with the password on screen
                getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button

            } else {
                //Go to server invader
                setNextStep(request, "signInNew-KnownServer");
                goToPage("/internet?action=hack&method=bf"); //Atack by brute force method
            }
            break;
        case "signInKnownServer2":
            if (getSomeElement("strong", null, null, 1) != null) { //Check if the password is avaiable 
                setNextStep(request, "removeLogsFromTarget2");
                aux = getSomeElement("span", "class", "small pull-left", 0).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "name", "user", 0).value = aux; //Fill the user field with the user on screen
                aux = getSomeElement("span", "class", "small pull-left", 1).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "type", "password", 0).value = aux; //Fill the password field with the password on screen
                getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button

            } else {
                //Go to server invader
                setNextStep(request, "signInNew-KnownServer2");
                goToPage("/internet?action=hack&method=bf"); //Atack by brute force method
            }
            break;
        case "signInNew-KnownServer":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "signInKnownServer");
                //getSomeElement("a", "href",	"?action=login", 0).click(); //Click on the server login tab
            } else {
                if (request.ip[0] == request.ip[1]) {
                    setNextStep(request, "goToFeedbackMissionPage");
                } else {
                    setNextStep(request, "fillIPOnInternetPage-SecondServer");
                };
                location.reload(true); //Reload the page
            }
            break;
        case "signInNew-KnownServer2":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "signInKnownServer2");
                //getSomeElement("a", "href",	"?action=login", 0).click(); //Click on the server login tab
            } else {
                setNextStep(request, "chooseJob")
                location.reload(true); //Reload the page
            }
            break;
        case "removeLogsFromTarget":
            setNextStep(request, "waitForEditLogProcess");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            break;
        case "removeLogsFromTarget2":
            setNextStep(request, "waitForEditLogProcess2");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            break;
        case "removeLogsFromTarget3":
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            setNextStep(request, "waitForEditLogProcess3");
            break;
        case "waitForEditLogProcess":
            setNextStep(request, "goOutFromBankServer");
            break;
        case "waitForEditLogProcess2":
            resetRequestDada(request);
            setNextStep(request, "chooseJob");
            break;
        case "waitForEditLogProcess3":
            resetRequestDada(request);
            setNextStep(request, "chooseJob")
            break;
        case "goOutFromBankServer":
            switch (request.job) {
                case defaultJob.checkBalance:
                    setNextStep(request, "goToFeedbackMissionPage");
                    break;
                case defaultJob.transferMoney:
                    if (request.ip[0] == request.ip[1]) {
                        setNextStep(request, "goToFeedbackMissionPage");
                    } else {
                        setNextStep(request, "fillIPOnInternetPage-SecondServer");
                    };
                    break;

                default:
                    break;
            }
            getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout button	

            break;
        case "fillIPOnInternetPage-SecondServer":
            request.ip[0] = request.ip[1];
            setNextStep(request, "goToServerTab");
            getSomeElement("input", "class", "browser-bar", 0).value = request.ip[1]; //Fill IP Adress bar
            getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
            break;
        case "goToFeedbackMissionPage":
            switch (request.job) {
                case defaultJob.checkBalance:
                    setNextStep(request, "informBalance");
                    break;
                case defaultJob.transferMoney:
                    setNextStep(request, "confirmFinishMission");
                    break;
                default:
                    break;
            }
            goToPage("/missions");
            break;
        case "informBalance":
            getSomeElement("input", "id", "amount-input", 0).value = request.amount; //Fill the balance field with the balance value
            setNextStep(request, "accessMissionPage");
            getSomeElement("span", "class", "btn btn-success mission-complete", 0).click(); //Click on the Complete Mission Button
            counterDelay = 0;
            delay = setInterval(
                function() {
                    counterDelay++;
                    if (counterDelay >= 2000 / DEFAULT_DELAY) {
                        clearInterval(delay);
                        counterDelay = 0;
                        getSomeElement("input", "id", "modal-submit", 0).click(); //Click on the float div Complete Mission button
                    }
                }, DEFAULT_DELAY);
            break;
        case "confirmFinishMission":
            setNextStep(request, "accessMissionPage");
            getSomeElement("span", "class", "btn btn-success mission-complete", 0).click();
            counterDelay = 0;
            delay = setInterval(
                function() {
                    counterDelay++;
                    if (counterDelay >= 2000 / DEFAULT_DELAY) {
                        clearInterval(delay);
                        counterDelay = 0;
                        getSomeElement("input", "id", "modal-submit", 0).click(); //Click on the float div Complete Mission button
                    }
                }, DEFAULT_DELAY);
            break;
        case "abortMission":
            setNextStep(request, "accessMissionPage");
            getSomeElement("span", "class", "btn btn-danger mission-abort", 0).click(); //Click on the Abort button
            counterDelay = 0;
            delay = setInterval(
                function() {
                    counterDelay++;
                    if (counterDelay >= 1000 / DEFAULT_DELAY) {
                        clearInterval(delay);
                        counterDelay = 0;
                        getSomeElement("input", "type", "submit", 0).click(); //Click on the float div Abort button
                    }
                }, DEFAULT_DELAY);
            break;
        case "cleanOwnLog":
            setNextStep(request, "waitForEditOwnLogProcess");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};

            getSomeElement("input", "type", "submit", 0).click(); //Click on the Edit Log Data Button
            break;
        case "cleanOwnLogSingle":
            setNextStep(request, "waitForEditOwnLogProcessSingle");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};

            getSomeElement("input", "type", "submit", 0).click(); //Click on the Edit Log Data Button
            break;
        case "waitForEditOwnLogProcessSingle":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "openLogTabAfterCleaning");
            } else {
                resetRequestDada(request);
                setNextStep(request, "chooseJob");
                goToPage("/log");
            }
            break;
        case "openLogTabAfterCleaning":
            request.counter = 0;
            resetRequestDada(request);
            goToPage("/log")
            setNextStep(request, "chooseJob");
            break;
        case "waitForEditOwnLogProcess":
            request.counter = 0;
            setNextStep(request, "tryToGetSomeMission");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                goToPage("/missions");
            }
            break;

        default:
            break;
    }
}