function startScriptCommunication() { //Get data from background script
    requestData.act = defaultAct.getRequestData;
    sendRequest(requestData);
}