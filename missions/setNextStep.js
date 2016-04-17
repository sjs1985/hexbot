//It sends the next step description to the background script
function setNextStep(request, stepId) {
    request.act = defaultAct.setRequestData;
    request.stepId = stepId;
    sendRequest(request);
};