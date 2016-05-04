//It try to get some mission, if is avaiable, and accept it
function getURLMission(missionType) {
	var labels = {
	    checkBalance: ["Verificar balanço bancário", "Check bank status"],
	    transferMoney: ["Transferir dinheiro", "Transfer money"],
	    stealSoftware: ["Roubar software", "Steal software"],
	    deleteSoftware: ["Deletar software", "Delete software"]
	}
	//Get the URL mission
	var element = document.getElementsByTagName("a")
	var urlMission = null
	var urlIsObtained = false
	for (count = 0; count <= element.length - 1; count++) {
		var aux = element[count]
		var url = aux.href
		aux = aux.childNodes[0]
		linkText = aux.nodeValue
		if (linkText != null) {
			if (missionType == CHECK_BALANCE) {
				if (strposOfArray(linkText, labels.checkBalance) >= 0){
					urlMission = url
					break
				}
			} else
			if (missionType == TRANSFER_MONEY) {
				if (strposOfArray(linkText, labels.transferMoney) >= 0){
					urlMission = url
					break
				}
			}

		}
	}
	return urlMission
}