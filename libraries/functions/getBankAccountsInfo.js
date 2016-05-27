/*This function gets the accounts list vinculated to their respective ip*/
function getBankAccountsInfo(){
	var financesPage = sendXMLHttpRequest("/finances", "GET", "", false)
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(financesPage, "text/html")
	var accountWidgets = requestContentDOM.getElementsByClassName("widget-box collapsible")
	var infoList = {}
	if ((accountWidgets) && (accountWidgets.length > 1)){
		for (var i = 0; i < accountWidgets.length - 1; i++) {
			var bankip = accountWidgets[i].innerHTML.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/m)[0]
			var account = accountWidgets[i].innerHTML.match(/#[0-9]{5,}/m)[0]
			account = account.replace("#", "")
			infoList[bankip] = account
		}
	}
	return infoList
}
	