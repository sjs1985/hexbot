//It sends a message to the background script
function sendRequest(request) {
    chrome.runtime.sendMessage({ message: request }, function(response) { console.log(response.backMessage); });
};