/*
	@prototype: sendXMLHttpRequest(script_target, method, parameters, isAsynchronous, function_callback, sendXRequestedWithHeader)
	@definition: This function sends a AJAX request to the server
	@author: GRSa
	@parameters: 
		*script_target (String): The server-side script (e.g. "riddle.php")
		*method (String): GET or POST
		*parameters (String): The string containing the parameters message or something (e.g. "foo=bar&baz=qux")
		*isAsynchronous (boolean) True if request is asynchronous or false if request is synchronous
		*function_callback (Function) It is ignorable if the request is synchronous. The function that must be executed after server response. This callback function receives the server response. The response content can be accessed from arguments[0] variable inside the callback function.
		*sendXRequestedWithHeader (boolean) True if X-Requested-With header must be sent
	@return: It returns the response if request is synchronous. It returns void if the request asynchronous 
*/
function sendXMLHttpRequest(script_target, method, parameters, isAsynchronous, function_callback, sendXRequestedWithHeader){
	var xmlhttp = new XMLHttpRequest()
	var synchronousResponse = null
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var result = xmlhttp.responseText
			if (isAsynchronous){
				function_callback(result)
			} else {
				synchronousResponse = result
			}
		}
	}
	switch(method){
		case "POST":
			xmlhttp.open("POST", script_target, isAsynchronous)
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8")
			xmlhttp.setRequestHeader("Accept", "*/*")
			if (sendXRequestedWithHeader)
				xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			xmlhttp.send(parameters)
			break
		case "GET":
			xmlhttp.open("GET", script_target + "?" + parameters, isAsynchronous)
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8")
			xmlhttp.setRequestHeader("Accept", "*/*")
			if (sendXRequestedWithHeader)
				xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
			xmlhttp.send()
			break
		default: break	
	}
	if(!isAsynchronous){
		return synchronousResponse
	}
}


function getSoftwaresByPattern(pattern, page, parameters){
	var softwarePage = sendXMLHttpRequest(page, "GET", parameters, false)
	var softwareList = []
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(softwarePage, "text/html")
	var softwareTable = requestContentDOM.getElementsByClassName("table table-cozy table-bordered table-striped table-software table-hover with-check")[0]
	var rows = softwareTable.getElementsByTagName("tr")
	var pattern = new RegExp(pattern.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "gmi")
	for (var i = 0; i < rows.length; i++) {
		if (pattern.test(rows[i].innerHTML.split(/[\n\r]/).join(""))){
			var id = rows[i].id
			var name = rows[i].getElementsByTagName("TD")[1].innerHTML.replace(/(<([^>]+)>)|[\n\r]/gmi, "")
			var version = rows[i].getElementsByTagName("TD")[2].innerHTML.replace(/(<([^>]+)>|[\n\r])/gmi, "")
			softwareList.push({id: id, name: name, version: version})
		} else {
			console.log("NÃO FOI", rows[i].getElementsByTagName("TD")[1])
		}
	}
	return softwareList
}