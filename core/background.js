var storage = []

//It sends messages to content script
function respond(request, tabId){
	chrome.tabs.sendMessage(tabId, {message: request}, function(response) {console.log(response.backMessage)})
}

//It process requests comming from content script
chrome.runtime.onMessage.addListener(
 	function(request, sender, sendResponse){
 		var request = request.message
		switch(request.action){
			case "get":
				sendResponse({backMessage: "GET request received by background script"})
				respond(storage[request.item], sender.tab.id)
				console.log("GET request processed. Data sent (\"" + request.item + "\")", storage[request.item])
				break	
			case "set":
				sendResponse({backMessage: "SET request received by background script"})
				storage[request.item] = request.data
				console.log("SET request processed. Data stored (\"" + request.item + "\")")
				break
			case "reset":
				sendResponse({backMessage: "RESET request received by background script"})
				storage[request.item] = null
				console.log("RESET request processed. Item removed (\"" + request.item + "\")")
				break
			default: break
		}
   	}
)