var views = {
	appendControlPanel: function(){
		var divMain = document.createElement("div")
		divMain.id = COMMAND_PANEL_DOM_ID
		divMain.className = "modal hide in"
		divMain.tabindex = "0"
		divMain['aria-hidden'] = false
		divMain.style.display = "none"

		var bankInfo = getBankAccountAddr()
		var selectIpList = '<select id="' + FIELD_BANK_IP_TARGET + '" class="controls fieldsContent">'
		for(ip in bankInfo){
			selectIpList += '<option value="' + ip + '">' + ip + '</option>'
		}
		selectIpList += '</select>'
		divMain.innerHTML =
			'<div class="widget-title">' +
				'<h5>' + LANG.CONTROL_PANEL_TITLE + '</h5>' +
				'<span id="' + COMMAND_PANEL_CLOSE_BUTTON_DOM_ID + '" class="btn btn-danger hide1024" style="float: right">X</span>' +
				'<span id="' + INFO_ALERT + '" class="btn btn-warning hide1024" style="float: right">!</span>' +
				'<span id="' + CREDITS_INFO + '" class="btn btn-info hide1024" style="float: right">:)</span>' +
			'</div>' +
			'<div id="' + MAIN_SCREEN_DOM_ID + '" class="modal-body" style="max-height:405px">' +
				'<table class="table">' +
				'<tbody>' +
				'<tr class="warning"><td>' + 
				'<button id="' + PERFORM_CHECK_BALANCE_ID + '" class="btn btn-warning">' + LANG.PERFORM_MEDIUM_MISSIONS + '</button> ' +
				'<button id="' + PERFORM_TRANSFER_MONEY_ID + '" class="btn btn-danger">' + LANG.PERFORM_HARD_MISSIONS + '</button>'+
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_MISSIONS_MONITOR + '><span>' + LANG.NOTIFY_MISSIONS + '</span></label>' +

				'<button id="' + PERFORM_BANK_CAMPING + '" class="btn btn-success">' + LANG.INTERCEPT_TRANSACTIONS + '</button>' +
				selectIpList +

				'<label><input class="checkBoxes" id="' + SET_TRANSFER_TO_BTC + '"type="checkbox"><span>' + LANG.TRANSFER_TO_BTC + '</span></label>' +
				'</td></tr>' +

				'<tr class="info"><td>' + 
				'<button id="' + SET_CLEAN_OWN_LOGS_DOM_ID + '" class="btn btn-success">' + LANG.CLEAN_OWN_LOGS + '</button> ' +
				'<button id="' + SET_CLEAN_TARGET_LOGS_DOM_ID + '" class="btn btn-success">' + LANG.CLEAN_VICTIM_LOGS + '</button> ' +
				'<button id="' + SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID + '" class="btn btn-success">' + LANG.ACCESS_CLEAR + '</button> ' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_LOGS_MONITOR + '><span>' + LANG.NOTIFY_LOGS + '</span></label>' +
				'</td></tr>' +

				'<tr class="success"><td>' + 
				'<button id="' + SET_SEARCH_FOR_IPS + '" class="btn btn-success">' + LANG.RUN_WEBCRAWLER + '</button> ' + LANG.WEBCRAWLER_INITIAL_HOSTS + '<input id="' + FIELD_IPS_START_SEARCHING + '" class="controls fieldsContent" placeholder="' + LANG.PASTE_IPS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width: 25%">' + 
				'<label><input type="checkbox" class="checkBoxes" id="' + SET_IGNORE_LIST + '">' + LANG.WEBCRAWLER_IGNORE_HOSTS + '<input id="' + FIELD_HOSTS_TO_IGNORE + '" class="controls fieldsContent" placeholder="' + LANG.PASTE_IPS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:25%"></label>' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_UPLOAD_MODE + '><span>' + LANG.WEBCRAWLER_UPLOAD_SOFTWARES + '</span><input id="' + FIELD_SOFTWARES_TO_INSTALL + '" class="controls fieldsContent" placeholder="' + LANG.WEBCRAWLER_UPLOAD_SOFTWARE_MODEL + '" type="text" style="vertical-align: top; margin-left: 10px; margin-right: 10px; width:25%"">' + LANG.WEBCRAWLER_UPLOAD_WAIT + '<input id="' + SET_TIME_LIMIT + '" class="controls fieldsContent" placeholder="' + LANG.SECONDS + '" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:12%"></label>' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_SIGNATURE + '>' + LANG.WEBCRAWLER_LEAVE_SIGNATURE + '<a href="http://www.symbols-n-emoticons.com/p/facebook-text-art-ascii.html" target="_blank"> ' + LANG.WEBCRAWLER_FIND_SIGNATURE + '</a><textarea id="' + FIELD_SIGNATURE + '" class="controls fieldsContent" style="width: 95%; resize: vertical;"></textarea></label>' +
				'<center><textarea id="' + FIELD_IP_SEARCH_RESULT + '" class="controls fieldsContent" style="width: 95%; resize: vertical;"></textarea>' + 
				'<input id="' + REGEX_INPUT_DOM_ID + '" class="controls fieldsContent" type="search" style="width: 95%;" placeholder="' + LANG.WEBCRAWLER_FILTER_WITH + '"></center>' +
				'</td></tr>' +
				
				/*'<tr class="danger"><td>' + 
				'<button id="' + PERFORM_UPDATE_CRACKER + '" class="btn btn-warning">' + LANG.UPDATE_CRACKER + '</button> ' +
				'</td></tr>' +*/

				'</tbody>' +
				'</table>' + 
			'</div>' + 
			'<div id="' + CREDITS_SCREEN_DOM_ID + '" class="modal-body">' +
				'<h1>' + LANG.CREDITS_TITLE + '</h1>' +
				'<div style="font-size: 15px;">' +
				'<a href="https://github.com/cmathiswausau">cmathiswausau</a> - ' + LANG.CREDITS_cmathiswausau + '<br />' +
				'<a href="https://github.com/dominicusdev">dominicusdev</a> - ' + LANG.CREDITS_dominicusdev + '<br />' +
				'<a href="https://github.com/gresendesa">gresendesa</a> - ' + LANG.CREDITS_gresendesa + '<br />' +
				'<a href="https://github.com/Klorker">Klorker</a> - ' + LANG.CREDITS_Klorker + '<br />' +
				'<a href="https://github.com/perfilrobo">perfilrobo</a> - ' + LANG.CREDITS_perfilrobo + '<br />' +
				'<a href="https://github.com/Quartz101">Quartz101</a> - ' + LANG.CREDITS_Quartz101 + '<br /><br />' +
				LANG.CREDITS_OTHERS +
				'</div><br />' +
				'<button id="back-to-main" class="btn btn-success">' + LANG.CREDITS_BACK_BUTTON + '</button>'+
			'</div>' + 
			'<div class="modal-footer">' +
				LANG.REPOSITORY_LINK +
			'</div>';
		document.getElementsByTagName("BODY")[0].appendChild(divMain);
	},

	showControlPanel: function(){
		var element = document.getElementById(COMMAND_PANEL_DOM_ID)
		if(element){
			element.style.display = "block"
		}
	},

	hideControlPanel: function(){
		var element = document.getElementById(COMMAND_PANEL_DOM_ID)
		if(element){
			element.style.display = "none"
		}
	},

	showBotButton: function(){
		aux = document.createElement("li"); //Create a STOP BOT button
		aux.id = BOT_BUTTON_DOM_ID
		aux.className = "btn btn-danger mission-abort";
		aux.innerHTML = '<a><span id="botButtonContent" class="text" style="color: white;">BOT</span></a>';
		var containerElement = document.getElementsByClassName("nav btn-group")[0]
		containerElement.insertBefore(aux, containerElement.firstChild)
		containerElement.insertBefore(document.createElement("li"), containerElement.firstChild) //Just bypassing a bug
	},

	colorSideBarMenu: function(menu){
		getDOMElement("a", "href", menu, 0, true).style.backgroundColor = "rgb(125, 52, 52)"
	},

	discolorSideBarMenu: function(menu){
		getDOMElement("a", "href", menu, 0, false).style.backgroundColor = null
		getDOMElement("a", "href", menu, 0, true).style.color = "#aaa"
	},

	appendAndShowSuspectAccesses: function(logs){
		var newTextArea = document.createElement("textarea")
		newTextArea.disabled = true
		newTextArea.value = logs
		var container = getDOMElement("form", "action", "logEdit", 0, false)
		container.appendChild(document.createElement("BR"))
		container.appendChild(document.createElement("BR"))
		container.appendChild(newTextArea)
	},

	switchToMainScreen: function(){
		document.getElementById(CREDITS_SCREEN_DOM_ID).style.display = "none"
		document.getElementById(MAIN_SCREEN_DOM_ID).style.display = "block"
	},

	switchToMainScreenToCreditsScreen: function(){
		document.getElementById(CREDITS_SCREEN_DOM_ID).style.display = "block"
		document.getElementById(MAIN_SCREEN_DOM_ID).style.display = "none"
		document.getElementById("back-to-main").addEventListener("click", views.switchToMainScreen)
	}
}