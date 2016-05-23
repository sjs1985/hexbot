var monitor = $jSpaghetti.module("monitor")
monitor.config.debugMode = true

monitor.procedure("queryMissionPage", function(shared){
	shared.isMissionPageGot = false
	var requestContent = sendXMLHttpRequest("/missions", "GET", "", false)
	var parser = new DOMParser()
	var requestContentDOM = parser.parseFromString(requestContent, "text/html")
	var container = requestContentDOM.getElementsByClassName("span3")
	if ((container) && (container.length > 0)) {
		var secondsWidget = container[0].getElementsByClassName("widget-content padding")[0]
		if (secondsWidget){
			var secondsToNextMissions = secondsWidget.innerHTML.match(/[0-9]+/gm)
			if ((secondsToNextMissions) && (secondsToNextMissions.length > 0)){
				shared.secondsToNextMissions = secondsToNextMissions[0]
				shared.timeTarget = (Date.now() / 1000 + shared.secondsToNextMissions * 60) - 50
				shared.alertNewMissions = false
				shared.isMissionPageGot = true
			} else {
				shared.secondsToNextMissions = null
			}
		} else {
			shared.secondsToNextMissions = null
		}
	} else {
		shared.secondsToNextMissions = null
	}
})

monitor.procedure("checkTime", function(shared, func){
	function showAlert(){
		if (!shared.stopShowAlert){
			getDOMElement("a", "href", "missions", 0).style.backgroundColor = "rgb(125, 52, 52)"
			getDOMElement("a", "href", "missions", 0).style.color = "#aaa"
			shared.isUserAlerted = true
		}
	}
	function hideAlert(){
		if(shared.isUserAlerted){
			getDOMElement("a", "href", "missions", 0).style.backgroundColor = null
			getDOMElement("a", "href", "missions", 0).style.color = "#aaa"
			shared.isUserAlerted = false
		}
	}
	//Stop showing alert if user access the mission page
	if (window.location.pathname.indexOf("missions") >= 0){
		shared.stopShowAlert = true
	}

	if((shared.secondsToNextMissions > 1) && (!shared.isUserAlerted)){
		var now = Date.now() / 1000
		hideAlert()
		shared.stopShowAlert = false
		if(now >= shared.timeTarget){
			showAlert()
			func.sendSignal("ok, user is alerted")
		} else {
			var leftTime = shared.timeTarget - now
			var loop = setInterval(function(){
				leftTime--
				if(leftTime <= 0){
					clearInterval(loop)
					showAlert()
					func.sendSignal("ok, user is alerted")
				}
			}, 1000)
		}
	} else {
		if (shared.secondsToNextMissions <= 1){
			showAlert()
		} else {
			hideAlert()
		}	
		setTimeout(function(){
			func.sendSignal("try to get the left seconds again")
		}, 2000)
	}
})

