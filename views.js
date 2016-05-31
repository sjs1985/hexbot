var views = {
	appendControlPanel: function(){
		var divMain = document.createElement("div")
		divMain.id = COMMAND_PANEL_DOM_ID
		divMain.className = "modal hide in"
		divMain.tabindex = "0"
		divMain['aria-hidden'] = false
		divMain.style.display = "none"

		var bankInfo = getBankAccountsInfo()
		var selectIpList = '<select id="' + FIELD_BANK_IP_TARGET + '" class="controls fieldsContent">'
		for(ip in bankInfo){
			selectIpList += '<option value="' + ip + '">' + ip + '</option>'
		}
		selectIpList += '</select>'
		divMain.innerHTML =
			'<div class="widget-title">' +
				'<h5>Hacker Experience Bot</h5>' +
				'<span id="' + COMMAND_PANEL_CLOSE_BUTTON_DOM_ID + '" class="btn btn-danger hide1024" style="float: right">X</span>' +
				'<span id="' + INFO_ALERT + '" class="btn btn-warning hide1024" style="float: right">!</span>' +
				'<span id="' + CREDITS_INFO + '" class="btn btn-info hide1024" style="float: right">:)</span>' +
			'</div>' +
			'<div id="' + MAIN_SCREEN_DOM_ID + '" class="modal-body" style="max-height:405px">' +
				'<table class="table">' +
				'<tbody>' +
				'<tr class="warning"><td>' + 
				'<button id="' + PERFORM_CHECK_BALANCE_ID + '" class="btn btn-warning">Perform medium missions</button> ' +
				'<button id="' + PERFORM_TRANSFER_MONEY_ID + '" class="btn btn-danger">Perform hard missions</button>'+
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_MISSIONS_MONITOR + '><span>Notify about new missions</span></label>' +

				'<button id="' + PERFORM_BANK_CAMPING + '" class="btn btn-success">Intercept bank transactions on</button>' +
				selectIpList +

				//'<label><input type="checkbox"<span>Transfer the earned money to connected BTC wallet</span></label>' +
				'</td></tr>' +

				'<tr class="info"><td>' + 
				'<button id="' + SET_CLEAN_OWN_LOGS_DOM_ID + '" class="btn btn-success"> Clean your logs </button> ' +
				'<button id="' + SET_CLEAN_TARGET_LOGS_DOM_ID + '" class="btn btn-success" data-toggle="tooltip" title="Remove just your ip clues from the target"> Clean victim logs </button> ' +
				'<button id="' + SET_ACCESS_TARGET_CLEAN_LOGS_DOM_ID + '" class="btn btn-success"> Access and clean </button> ' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_LOGS_MONITOR + '><span>Notify about strange activity on my logs</span></label>' +
				'</td></tr>' +

				'<tr class="success"><td>' + 
				'<button id="' + SET_SEARCH_FOR_IPS + '" class="btn btn-success" data-toggle="tooltip" title="Browse the web and find information">Run webcrawler</button> starting by these<input id="' + FIELD_IPS_START_SEARCHING + '" class="controls fieldsContent" placeholder="Paste text containing ips" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width: 30%">hosts' + 
				'<label><input type="checkbox" class="checkBoxes" id="' + SET_IGNORE_LIST + '">Ignore these<input id="' + FIELD_HOSTS_TO_IGNORE + '" class="controls fieldsContent" placeholder="Paste text containing ips" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:30%">ips</label>' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_UPLOAD_MODE + '><span data-toggle="tooltip" title="Upload, install and hide">Upload these</span><input id="' + FIELD_SOFTWARES_TO_INSTALL + '" class="controls fieldsContent" placeholder="{name:version},..." type="text" style="vertical-align: top; margin-left: 10px; margin-right: 10px; width:25%"">softwares. Wait until<input id="' + SET_TIME_LIMIT + '" class="controls fieldsContent" placeholder="seconds" type="text" style="vertical-align: initial; margin-left: 10px; margin-right: 10px; width:10%"></label>' +
				'<label><input class="checkBoxes" type="checkbox" id=' + SET_SIGNATURE + '>Leave my signature <a href="http://www.symbols-n-emoticons.com/p/facebook-text-art-ascii.html" target="_blank"> (find other signature)</a><textarea id="' + FIELD_SIGNATURE + '" class="controls fieldsContent" style="width: 98%; resize: vertical;"></textarea></label>' +
				'<center><textarea id="' + FIELD_IP_SEARCH_RESULT + '" class="controls fieldsContent" style="width: 98%; resize: vertical;"></textarea>' + 
				'<input id="' + REGEX_INPUT_DOM_ID + '" class="controls fieldsContent" type="search" style="width: 98%;" placeholder="Filter content using regex (e.g.  .*\\.crc.*  or  .*\\.vcol.*  or  .*something.*)"></center>' +
				'</td></tr>' +
				'<tbody>' +
				'</table>' + 
			'</div>' + 
			'<div id="' + CREDITS_SCREEN_DOM_ID + '" class="modal-body">' +
				'<h1>Credits</h1>' +
				'<div style="font-size: 15px;">' +
				'<a href="https://github.com/cmathiswausau">cmathiswausau</a> - Domain repairs on manifest.json file<br />' +
				'<a href="https://github.com/dominicusdev">dominicusdev</a> - Massive code reorganization, bugs repairs<br />' +
				'<a href="https://github.com/gresendesa">gresendesa</a> - Core redesign, riddle solver, webcrawler and notifiers<br />' +
				'<a href="https://github.com/Klorker">Klorker</a> - Code revision, new visual features, essential cleaners<br />' +
				'<a href="https://github.com/perfilrobo">perfilrobo</a> - Missions performer, uploader and bank camping (First developer)<br />' +
				'<a href="https://github.com/Quartz101">Quartz101</a> - Performance revision<br /><br />' +
				'and dozens of people who contributed with suggestions and bug reports.' +
				'</div><br />' +
				'<button id="back-to-main" class="btn btn-success">Back</button>'+
			'</div>' + 
			'<div class="modal-footer">' +
				'<b>version ' + VERSION_BOT + '</b> check for new releases on <a href="https://github.com/perfilrobo/hexbot" target="_blank">official repository</a>' +
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