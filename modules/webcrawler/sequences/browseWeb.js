var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isIpInvalid", {"gotoif": ["*.$", "@ignoreIp"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@ignoreIp"]}, "getHostLabel", "registerNPCNamesList", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@accessKnownTarget": 			["signInTarget", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "registerAccessible"]},
	{"@analyseTargetIps": 			["cancelLogProcesses", "isThereLogs", {"gotoif": ["!*.$","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@getSoftwares"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@getSoftwares": 				[{"gotoif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	
	{"@uploadSoftware": 			[{"gotoif": ["!*.uploadMode", "@cleanMyOwnLogs"]}, "cancelLogProcesses", "runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"gotoif": ["!*.$", "@abortUpload"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@cleanMyUploadClues": 		["goToTargetLogs", "registerUploaded", "isThereLogs", {"gotoif": ["!*.$", "@installSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@installSoftware": 			["cancelLogProcesses", "installSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@cleanMyInstallingClues": 	["goToTargetLogs", "registerInstalled", "isThereLogs", {"gotoif": ["!*.$", "@hideSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@hideSoftware": 				["cancelLogProcesses", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@cleanMyHiddingClues":  		["goToTargetLogs", "registerHidden", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "checkProgressBar", {"wait": "_forTheSignal"}]},
	{"@manageCounter": 				["updateCrawlerLogs", "manageUploadCounter", {"gotoif": ["*.currentSoftware > 0", "@uploadSoftware"]}]},

	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 3) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, "checkProgressBar", {"wait": "_forTheSignal"}, {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@ignoreIp": 					{"gotoif": ["true", "@goToNextTarget"]}},
	{"@abortUpload": 				["abortUpload", {"gotoif": ["true", "@manageCounter"]}]},
	{"@finishProcess": 				"_exit"}
]
