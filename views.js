var views = {
	appendControlPanel: function(){
		var divMain = document.createElement("div")
		divMain.id = COMMAND_PANEL_DOM_ID
		divMain.className = "modal hide in"
		divMain.tabindex = "0"
		divMain['aria-hidden'] = false
		divMain.style.display = "none"
		divMain.innerHTML =
			'<div class="widget-title">' +
			'<h5>Hacker Experience Bot</h5>' +
			'<span id="' + COMMAND_PANEL_CLOSE_BUTTON_DOM_ID + '" class="btn btn-danger hide1024" style="float: right">X</span>' +
			'<span id="' + INFO_ALERT + '" class="btn btn-warning hide1024" style="float: right">!</span>' +
			'</div>' +
			'<div class="modal-body">' +
			'<button id="' + PERFORM_CHECK_BALANCE_ID + '" class="btn btn-warning">Perform check account status missions</button> ' +
			'<button id="' + PERFORM_TRANSFER_MONEY_ID + '" class="btn btn-danger">Perform transfer money missions</button>'+
			'<label><input class="checkBoxes" type="checkbox" id=' + SET_MISSIONS_MONITOR + '><span data-toggle="tooltip" title="Use carefully. This MAY send GET requests every two seconds. Don\'t worry about \'X-Requested-With\' header: This header is not sent.">Notify about new missions</span></label>' +
			'<button id="' + SET_CLEAN_OWN_LOGS_DOM_ID + '" class="btn btn-success"> Clean your logs </button> ' +
			'<button id="' + SET_CLEAN_TARGET_LOGS_DOM_ID + '" class="btn btn-success" data-toggle="tooltip" title="Remove just your ip clues from the target"> Clean victim logs </button> ' +
			'<button id="' + SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID + '" class="btn btn-success"> Access and clean </button> ' +
			'<button id="' + SOLVE_RIDDLE_DOM_ID + '" class="btn btn-info"> Solve puzzles </button>'+
			'<label><input class="checkBoxes" type="checkbox" id=' + SET_LOGS_MONITOR + '><span data-toggle="tooltip" title="Use carefully. This sends GET requests every second. Don\'t worry about \'X-Requested-With\' header: This header is not sent.">Notify about invasions on my host</span></label>' +
			'<button id="' + PERFORM_BANK_CAMPING + '" class="btn btn-success"> Listen transfer bank logs on </button>' +
			'<input id="' + FIELD_BANK_IP_TARGET + '" class="controls fieldsContent" placeholder="{ip of bank}" type="text" style="vertical-align: top; margin-left: 10px; margin-right: 10px;"> and transfer to my account: <input id="' + FIELD_MY_ACCOUNT + '" class="controls fieldsContent" placeholder="{account of the same bank}" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px;"><br>' +
			'<button id="' + PERFORM_INSTALL_SOFTWARE + '" class="btn btn-success"> Upload, install and hide this</button>' +
			'<input id="' + FIELD_SOFTWARE_TO_INSTALL + '" class="controls fieldsContent" placeholder="{software name}, {version}" type="text" style="vertical-align: top; margin-left: 10px; margin-right: 10px;"> software on these <input id="' + FIELD_IPS_INSTALL_TARGETS + '" class="controls fieldsContent" placeholder="{ip}, {ip}, ..." type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px;"> IPs. Wait until <input id="' + SET_UPLOAD_TIME_LIMIT + '" class="controls fieldsContent" placeholder="seconds" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:10%">s<br>' +
			'<button id="' + SET_SEARCH_FOR_IPS + '" class="btn btn-success">Run webcrawler</button> starting by these<input id="' + FIELD_IPS_START_SEARCHING + '" class="controls fieldsContent" placeholder="{ip}, {ip}, ..." type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px;"> hosts' + 
			'<center><textarea id="' + FIELD_IP_SEARCH_RESULT + '" class="controls fieldsContent" style="width: 98%;"></textarea>' + 
			'<input id="' + REGEX_INPUT_DOM_ID + '" class="controls fieldsContent" type="text" style="width: 98%;" placeholder="Filter content using regex (e.g.  .*\\.crc.*  or  .*\\.vcol.*  or  .*something.*)"></center>' +
			'</div>' + 
			'<div class="modal-footer">' +
			'<b>version ' + VERSION_BOT + '</b> check for new releases on <a href="https://github.com/perfilrobo/hexbot">official repository</a>' +
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
	}

}