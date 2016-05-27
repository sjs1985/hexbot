var foo = $jSpaghetti.module("webcrawler").sequence("browseWeb")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isIpInvalid", {"gotoif": ["*.$", "@ignoreIp"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@ignoreIp"]}, "getHostLabel", "registerNPCNamesList", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "isThereProgressBar", {"gotoif":["!*.$", "@tryToInvadeTarget"]}, {"wait":"_forPageToReload"}]},
	{"@accessKnownTarget": 			["signInTarget", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, "registerAccessible"]},
	{"@analyseTargetIps": 			["cancelLogProcesses", "isThereLogs", {"gotoif": ["!*.$","@getSoftwares"]}, "cleanMyIpClues", "getIpsFromLogs", "getBTCAccounts", "getShoppingLogs", "updateCrawlerLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@getSoftwares"]}, "isThereProgressBar", {"gotoif":["!*.$", "@analyseTargetIps"]}, {"wait": "_forPageToReload"}]},
	{"@getSoftwares": 				[{"gotoif":["!*.getSoftwareMode", "@cleanMyOwnLogs"]}, "goToTargetSoftwares", "getSoftwares", "updateCrawlerLogs"]},
	
	{"@uploadSoftware": 			[{"gotoif": ["!*.uploadMode", "@cleanMyOwnLogs"]}, "cancelLogProcesses", "runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"gotoif": ["!*.$", "@abortUpload"]}, "isThereProgressBar", {"gotoif":["!*.$", "@uploadSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyUploadClues": 		["goToTargetLogs", "registerUploaded", "isThereLogs", {"gotoif": ["!*.$", "@installSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, "isThereProgressBar", {"gotoif":["!*.$", "@cleanMyUploadClues"]}, {"wait": "_forPageToReload"}]},
	{"@installSoftware": 			["cancelLogProcesses", "installSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereProgressBar", {"gotoif":["!*.$", "@installSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyInstallingClues": 	["goToTargetLogs", "registerInstalled", "isThereLogs", {"gotoif": ["!*.$", "@hideSoftware"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, "isThereProgressBar", {"gotoif":["!*.$", "@cleanMyInstallingClues"]}, {"wait": "_forPageToReload"}]},
	{"@hideSoftware": 				["cancelLogProcesses", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereProgressBar", {"gotoif":["!*.$", "@hideSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyHiddingClues":  		["goToTargetLogs", "registerHidden", "isThereLogs", {"gotoif": ["!*.$", "@manageCounter"]}, "cleanMyIpClues", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@manageCounter"]}, "isThereProgressBar", {"gotoif":["!*.$", "@cleanMyHiddingClues"]}, {"wait": "_forPageToReload"}]},
	{"@manageCounter": 				["updateCrawlerLogs", "manageUploadCounter", {"gotoif": ["*.currentSoftware > 0", "@uploadSoftware"]}]},

	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 3) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cancelLogProcesses", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, "isThereProgressBar", {"gotoif":["!*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", "updateCrawlerLogs", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@ignoreIp": 					{"gotoif": ["true", "@goToNextTarget"]}},
	{"@abortUpload": 				["abortUpload", {"gotoif": ["true", "@manageCounter"]}]},
	{"@finishProcess": 				"_exit"}
]
