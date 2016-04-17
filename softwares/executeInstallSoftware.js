//This function implements the install software algorithm 
function executeInstallSoftware(request) {
    var softwareId;
    switch (request.stepId) {
        case "checkSoftware":
            if (getSoftwareId(request.software.split(",")[0], request.software.split(",")[1]) != null) {
                setNextStep(request, "fillIPOnInternetPage");
                goToPage("/internet");
            } else {
                window.alert("There is no any software like the specified :( >" + request.software.split(",")[0] + "::" + request.software.split(",")[1] + "<");
                setNextStep(request, "finishAll");
                location.reload(true)
            }
            break;
        case "fillIPOnInternetPage":
            if (request.ip.length > 0) {

                if (getSomeElement("a", "href", "?view=logout", 0) == null) {
                    getSomeElement("input", "class", "browser-bar", 0).value = request.ip.pop(); //Fill IP Adress bar
                    setNextStep(request, "goToServerTab");
                    getSomeElement("input", "type", "submit", 0).click(); //Click on Go button
                } else {
                    setNextStep(request, "fillIPOnInternetPage");
                    getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
                }
            } else {
                window.alert("There is no a ip avaiable");
            }
            break;
        case "goToServerTab":
            if ((getSomeElement("div", "class", "alert alert-error", 0) == null) &&
                (getSomeElement("a", "href", "?action=login", 0) != null)) {
                setNextStep(request, "signInKnownServer");
                getSomeElement("a", "href", "?action=login", 0).click(); //Click on the server login tab
            } else {
                if (request.ip.length >= 1) {
                    if (request.ip.length == 0) {
                        setNextStep(request, "finishSoftwareInstall");
                    } else {
                        setNextStep(request, "fillIPOnInternetPage");
                        goToPage("/internet");
                    }
                } else {
                    //abort
                }
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
                setNextStep(request, "signInNew-KnownServer");
                goToPage("/internet?action=hack&method=bf"); //Atack by brute force method
            }
            break;
        case "signInNew-KnownServer":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "signInKnownServer");
                //getSomeElement("a", "href", "?action=login", 0).click(); //Click on the server login tab
            } else {
                setNextStep(request, "finishCycle");
                location.reload(true);
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
            setNextStep(request, "goToMySoftwarePanel");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                //Do nothing
            } else {
                getSomeElement("a", "href", "?view=logs", 0).click(); //reload the log page
            }
            break;
        case "goToMySoftwarePanel":
            setNextStep(request, "uploadSoftware");
            goToPage("/software");

            break;
        case "uploadSoftware":
            setNextStep(request, "waitForInstallSoftwareProcess");
            softwareId = getSoftwareId(request.software.split(",")[0], request.software.split(",")[1]);
            if (softwareId != null) {
                goToPage("/internet?view=software&cmd=up&id=" + softwareId);
            } else {
                window.alert("Hey, it seems you don't have that software anymore :(");
                setNextStep(request, "finishAll");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button

            }
            break;
        case "waitForInstallSoftwareProcess":
            if (getSomeElement("div", "class", "alert alert-success", 0) == null) {
                if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                    setNextStep(request, "goToLog-1");
                } else {
                    //request.ip.pop();
                    setNextStep(request, "finishCycle");
                    getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
                }
            } else {
                setNextStep(request, "goToLog-1");
                location.reload(true);
            }
            break;
        case "goToLog-1":
            setNextStep(request, "clearLog-1");
            getSomeElement("a", "href", "?view=logs", 0).click(); //Go to logs
            break;
        case "clearLog-1":
            setNextStep(request, "waitForEditLogProcess-1");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            break;
        case "waitForEditLogProcess-1":
            setNextStep(request, "goToSoftwareTab");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                getSomeElement("a", "href", "?view=logs", 0).click(); //Reload Page
            }
            break;
        case "goToSoftwareTab":
            setNextStep(request, "installSoftware");
            goToPage("/internet?view=software");
            break;
        case "installSoftware":
            softwareId = getSoftwareId(request.software.split(",")[0], request.software.split(",")[1]);
            if (softwareId != null) {
                setNextStep(request, "waitForInstallSoftware");
                goToPage("/internet?view=software&cmd=install&id=" + softwareId);
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "waitForInstallSoftware":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "goToLog-3");
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "goToLog-3":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "clearLog-3");
                getSomeElement("a", "href", "?view=logs", 0).click(); //Go to logs
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "clearLog-3":
            setNextStep(request, "waitForEditLogProcess-3");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            break;
        case "waitForEditLogProcess-3":
            setNextStep(request, "goToSoftwareTab2");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                getSomeElement("a", "href", "?view=logs", 0).click(); //Reload Page
            }
            break;
        case "goToSoftwareTab2":
            setNextStep(request, "hideSoftware");
            goToPage("/internet?view=software");
            break;
        case "hideSoftware":
            softwareId = getSoftwareId(request.software.split(",")[0], request.software.split(",")[1]);
            if (softwareId != null) {
                setNextStep(request, "waitForHideProcess");
                //window.alert("/internet?view=software&cmd=hide&id=" + softwareId);
                goToPage("/internet?view=software&cmd=hide&id=" + softwareId);
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "waitForHideProcess":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "goToLog-2");
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "goToLog-2":
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {
                setNextStep(request, "clearLog-2");
                getSomeElement("a", "href", "?view=logs", 0).click(); //Go to logs
            } else {
                setNextStep(request, "finishCycle");
                getSomeElement("a", "href", "?view=logout", 0).click(); //Click on the Logout Button
            }
            break;
        case "clearLog-2":
            setNextStep(request, "waitForEditLogProcess-2");
            try {
                getSomeElement("textarea", "class", "logarea", 0).childNodes[0].nodeValue = " "; //Clean the logs
            } catch (error) {};
            getSomeElement("input", "type", "submit", 1).click(); //Click on the Edit Log Data Button
            break;
        case "waitForEditLogProcess-2":
            setNextStep(request, "logOutServer");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                location.reload(true);
            }
            break;
        case "logOutServer":
            setNextStep(request, "finishCycle");
            getSomeElement("a", "href", "?view=logout", 0).click();
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
            setNextStep(request, "finishAll");
            if (getSomeElement("div", "class", "alert alert-error", 0) == null) {

            } else {
                location.reload(true);
            }
            break;
        case "finishCycle":
            if (request.ip.length > 0) {
                setNextStep(request, "fillIPOnInternetPage");
                goToPage("/internet");
            } else {

                setNextStep(request, "goToMyOwnLog");
                location.reload(true);

            }
            break;
        case "finishAll":
            request = resetRequestDada(request);
            request.job = defaultJob.checkBalance;
            setNextStep(request, "chooseJob");
            goToPage("/software");
            break;

        default:
            break;
    }
}