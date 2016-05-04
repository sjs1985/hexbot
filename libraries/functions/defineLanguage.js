//This analyses the url and defines the language
function getLanguage(){
	switch(window.location.href.split("/")[2].split(".")[0]){
		case LANG_BR:
			return LANG_BR
		case LANG_EN:
			return LANG_EN
		default:
			return LANG_EN
	}
}
