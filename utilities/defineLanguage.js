//This analyses the url and defines the language
function defineLanguage(request) {
    //Should make it redirect to the desired language? idek
    //This semi fix works around it though.
    request.language = 1;
    request.act = defaultAct.setRequestData;
    sendRequest(request);
}