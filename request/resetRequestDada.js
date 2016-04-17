//It resets the requestData structure
function resetRequestDada(request) {
    request.act = null;
    request.stepId = null;
    request.url = null;
    request.ip = [];
    request.account = [];
    request.amount = null;
    //request.language = null;
    //request.job = null;
    return request;
};