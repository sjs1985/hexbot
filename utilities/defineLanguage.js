
//This analyses the url and defines the language
function defineLanguage(request){
	switch(window.location.href.split("/")[2].split(".")[0]){
		case "br":
			request.language = 0;
			break;
		case "en":
			request.language = 1;
			break;
		default:
			request.language = 1;
			break;
	}
	request.act = defaultAct.setRequestData;
	sendRequest(request);
}
