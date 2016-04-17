//Show request content
function showRequest(request) {
    var data = request;
    console.log("Request>>> ACTION:" +
        (data.act == defaultAct.getRequestData ? "getRequestData" : "setRequestData") +
        " STEPID: " + data.stepId +
        " URL: " + data.url +
        " IPS: " + data.ip[0] + " " + data.ip[1] +
        " ACCOUNTS: " + data.account[0] + " " + data.account[1] +
        " AMOUNT: " + data.amount);
};