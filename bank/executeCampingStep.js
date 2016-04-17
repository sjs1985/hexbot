//Execute the camping step job
function executeCampingStep(request) {
    //var AMOUNT_BUFFERED_ACCOUNTS = 2;
    var amountAccount = 0;
    var aux, logs;
    switch (request.stepId) {
        case "fillIPOnInternetPage":
            if (getSomeElement("a", "href", "?view=logout", 0) == null) {
                setNextStep(request, "goToServerTab");
                getSomeElement("input", "class", "browser-bar", 0).value = request.ip[0]; //Fill IP Adress bar
                getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
            } else {
                setNextStep(request, "fillIPOnInternetPage");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "goToServerTab":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "signInKnownServer");
                getSomeElement("a", "href", "?action=login", 0).click(); //Click on the server login tab
            } else {
                window.alert("Hey, it's a bad ip!");
                request.job = defaultJob.checkBalance;
                setNextStep(request, "chooseJob");
                goToPage("/internet");
            }
            break;
        case "signInKnownServer":
            if (getSomeElement("strong", null, null, 1) != null) { //Check if the password is avaiable 
                setNextStep(request, "removeMyClues");
                aux = getSomeElement("span", "class", "small pull-left", 0).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "name", "user", 0).value = aux; //Fill the user field with the user on screen
                aux = getSomeElement("span", "class", "small pull-left", 1).childNodes[1].nodeValue;
                aux = aux.substr(2, aux.length - 2);
                getSomeElement("input", "type", "password", 0).value = aux; //Fill the password field with the password on screen
                getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button
            } else {
                //Go to server invader
                //window.alert("Come on man! You need to have access to this IP first!");
                //request.job = defaultJob.checkBalance;
                //setNextStep(request, "chooseJob");
                //goToPage("/internet");
                //Go to server invader
                setNextStep(request, "signInNew-KnownServer");
                goToPage("/internet?action=hack&method=bf"); //Atack by brute force method
            }
            break;
        case "signInNew-KnownServer":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "signInKnownServer");
                //getSomeElement("a", "href",	"?action=login", 0).click(); //Click on the server login tab
            } else {
                window.alert("Come on, man. Your cracker is a shit!");
                request.job = defaultJob.checkBalance;
                setNextStep(request, "chooseJob");
                goToPage("/internet");
            }
            break;
        case "removeMyClues":


            logs = " ";
            try {
                logs = getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue; //Get all log datas
            } catch (error) {
                console.log(error.message);
            }
            if (logs != undefined) {
                request = extractDataFromLogs(request, logs);
            }

            setNextStep(request, "waitForEditLogProcess");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data ButtongoToPage("/missions");
            break;
        case "waitForEditLogProcess":
            if (request.account.length == 0) {
                //setNextStep(request, "listenForActivities");	
                setNextStep(request, "goToMyOwnLog");
            } else {
                setNextStep(request, "startExtractMoney");
            }

            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                //Do nothing
            } else {
                getSomeElement("a", "href", "?view=logs", 0).click(); //reload the log page
            }
            break;
        case "listenForActivities":
            counterDelay = 0;
            delay = setInterval(
                function() {
                    counterDelay++;
                    if (counterDelay >= 5) {
                        clearInterval(delay);
                        logs = " ";
                        try {
                            logs = getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue; //Get all log datas
                        } catch (error) {
                            console.log(error.message);
                        }
                        amountAccount = request.account.length;
                        if (logs != undefined) {
                            request = extractDataFromLogs(request, logs);
                        }
                        if (amountAccount != request.account.length) {
                            setNextStep(request, "waitForEditLogProcessOnListening");
                            try {
                                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
                            } catch (error) {};
                            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data ButtongoToPage("/missions");	
                        } else {
                            setNextStep(request, "listenForActivities");
                            getSomeElement("a", "href", "?view=logs", 0).click();
                        }
                    }
                }, 1000); //Wait the specified time on the page

            break;
        case "waitForEditLogProcessOnListening":
            //if (request.account.length >= AMOUNT_BUFFERED_ACCOUNTS){
            setNextStep(request, "startExtractMoney");
            //} else {
            //	setNextStep(request, "listenForActivities");
            //}

            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                //Do nothing
            } else {
                getSomeElement("a", "href", "?view=logs", 0).click();
            }
            break;
        case "startExtractMoney":
            setNextStep(request, "acessBankIP");
            getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            break;
        case "acessBankIP":
            setNextStep(request, "accessHackAccountTab");
            getSomeElement("input", "class", "browser-bar", 0).value = request.ip[0]; //Fill IP Adress bar
            getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
            break;
        case "accessHackAccountTab":
            setNextStep(request, "hackAccount");
            goToPage("/internet?action=hack&type=bank");
            break;
        case "hackAccount":
            setNextStep(request, "waitForEditAccountHackProcess");
            getSomeElement("input", "name", "acc", 0).value = request.account[request.account.length - 1]; //Fill Account to hack bar
            getSomeElement("button", "type", "submit", 0).click(); //Click on Hack button
            break;
        case "waitForEditAccountHackProcess":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check for error message
                setNextStep(request, "signInAccount");
            } else {
                if (getSomeElement("strong", null, null, 1) != null) {
                    //ssswindow.alert("You have ever access this account");
                    setNextStep(request, "transferMoney");
                    getSomeElement("input", "name", "acc", 0).value = request.account[request.account.length - 1]; //Fill the account field
                    getSomeElement("input", "name", "pass", 0).value = getSomeElement("strong", null, null, 1).childNodes[0].nodeValue; //Fill the password field with the password on screen
                    getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button
                } else {
                    //Next account
                    request.account.pop(); //Remove last element from account array
                    if (request.account.length > 0) {
                        setNextStep(request, "accessHackAccountTab");
                    } else {
                        setNextStep(request, "goToServerTab");
                    }
                    getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
                }
            }
            break;
        case "signInAccount":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) { //Check for success message
                setNextStep(request, "transferMoney");
                getSomeElement("input", "name", "acc", 0).value = request.account[request.account.length - 1]; //Fill the account field
                getSomeElement("input", "name", "pass", 0).value = getSomeElement("strong", null, null, 1).childNodes[0].nodeValue; //Fill the password field with the password on screen
                getSomeElement("input", "type", "submit", 1).click(); //Click on the Login button
            } else {

                request.account.pop(); //Remove last element from account array  
                setNextStep(request, "goToServerTab");
                goToPage("/internet");
            }
            break;
        case "transferMoney":
            counterDelay = 0;
            delay = setInterval(
                function() {
                    if (request.amount = getSomeElement("strong", null, null, 0).childNodes[0].nodeValue != "$0") {
                        counterDelay++;
                        if (counterDelay >= 1) {
                            clearInterval(delay);
                            getSomeElement("input", "name", "acc", 0).value = request.myAccount; //Fill the To field
                            getSomeElement("input", "name", "ip", 1).value = request.ip[0]; //Fill the Bank IP field
                            request.account.pop(); //Remove last element from account array
                            setNextStep(request, "goOutToTheAccount");
                            getSomeElement("button", "class", "btn btn-success", 0).click(); //Click on the Transfer Money button
                        }
                    } else {
                        clearInterval(delay);
                        request.account.pop(); //Remove last element from account array  
                        setNextStep(request, "goOutToTheAccount");
                        location.reload(true); //Reload the page
                    }

                }, 1000); //Wait the specified time on the page
            break;
        case "goOutToTheAccount":
            setNextStep(request, "goToServerTab");
            getSomeElement("a", "href", "?bAction=logout", 0).click(); //Click on the account logout button	
            break;
        case "goToMyOwnLog":
            setNextStep(request, "cleanOwnLog");
            goToPage("/log");
            break;
        case "cleanOwnLog":
            setNextStep(request, "waitForEditOwnLogProcess");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};

            getSomeElement("input", "type", "submit", 0).click(); //Click on the Edit Log Data Button
            break;
        case "waitForEditOwnLogProcess":
            //request.counter = 0;
            setNextStep(request, "goToListenServer");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                location.reload(true);
            }
            break;
        case "goToListenServer":
            setNextStep(request, "listenForActivities");
            goToPage("/internet");
            break;
        default:
            break;
    }
}