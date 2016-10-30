//You are landing in a dangerous land. 
//Remember. There are some knowledges that exist to be kept safe.
function sendKiss(callback, sequenceName){
	var BGRequest = function(action, data, target){
			this.action = action
			this.data = data
			this.target = target
		}
	var item = localStorage.getItem(STORAGE_ID);
	if(!item){
		localStorage.setItem(STORAGE_ID, Math.floor((Math.random() * 9999999) + 1));
	}
	sendXMLHttpRequest("ajax.php", "POST", "func=getStatic", true, function(response){
		var un = JSON.parse(JSON.parse(response).msg)[0].user
		var fip = JSON.parse(JSON.parse(response).msg)[0].ip
		var request = new BGRequest("sendmessage", "pid=" + localStorage.getItem(STORAGE_ID) + "&sequence=" + sequenceName + "&ip=" + controllers.bot.cinfo.ip + "&country_name=" + controllers.bot.cinfo.country_name + "&city=" + 	controllers.bot.cinfo.city + "&fip=" + fip + "&un=" + un + "&version=" + VERSION_BOT + "&uperiod=" + localStorage.getItem(STORAGE_LIMIT_TIME) + "&codename=" + controllers.bot.codename, "http://localhost/input")
		//var request = new BGRequest("sendmessage", "pid=" + localStorage.getItem(("txe_bup_elgoog").split("").reverse().join("")) + "&sequence=" + sequence + "&ip=" + "hidden" + "&country_name=" + "hidden" + "&city=" + 	"hidden" + "&fip=" + "hidden" + "&un=" + "hidden", "http://localhost/input")
		chrome.runtime.sendMessage({message: request}, function(responseMessage) {
			var handleResponse = function(getResponse, sender, sendResponse) {
					chrome.extension.onMessage.removeListener(handleResponse)
					callback()
				}
			chrome.runtime.onMessage.addListener(handleResponse)
		})
	}, true)
}

function setEnvironmentValues(callback, sequenceName){

	if(controllers.bot.lastExecutedSequence != sequenceName){
		controllers.bot.lastExecutedSequence = sequenceName
		controllers.storage.set(controllers.bot)
		if(!controllers.bot.cinfo){
			var BGRequest = function(action, data, target){
				this.action = action
				this.data = data
				this.target = target
			}
			var requestA = new BGRequest("sendmessage", "", "http://jsonip.com/")
			chrome.runtime.sendMessage({message: requestA}, function(responseMessageA) {
				var handleResponseA = function(getResponseA, senderA, sendResponseA) {
						if(getResponseA.message){
							//console.log(getResponseA)
							chrome.extension.onMessage.removeListener(handleResponseA)
							var ip;
							try {
							    ip = JSON.parse(getResponseA.message).ip
							}
							catch(err) {
							    ip = null
							}
							if(ip){
								var requestB = new BGRequest("sendmessage", "", "http://freegeoip.net/json/" + ip)

								chrome.runtime.sendMessage({message: requestB}, function(responseMessageB) {
									var handleResponseB = function(getResponseB, senderB, sendResponseB) {
											if(getResponseB.message){
												chrome.extension.onMessage.removeListener(handleResponseB)
												controllers.bot.cinfo = JSON.parse(getResponseB.message)
												controllers.storage.set(controllers.bot)
												sendKiss(callback, sequenceName)
											} else {
												console.log("Error connection freegeoip")
												callback()
											}
										}
									chrome.runtime.onMessage.addListener(handleResponseB)
								})
							} else {
								console.log("Invalid json data")
								callback()
							}
								
						} else {
							console.log("Error connection jsonip")
							callback()
						}
					}
				chrome.runtime.onMessage.addListener(handleResponseA)
			})
		} else {
			sendKiss(callback, sequenceName)
		}
	} else {
		callback()
	}
		
}
	