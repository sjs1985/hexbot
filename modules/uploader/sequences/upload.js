var foo = $jSpaghetti.module("uploader").sequence("upload")

foo.instructions = [
	{"@init": 						["goToSoftwarePage", "startUpload", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToTarget": 				["logout", {"gotoif": ["*.ips.length == 0", "@finishProcess"]}, "goToNextIp", "ipDoesNotExist", {"gotoif": ["*.$", "@goToTarget"]}, "isThereMessageError", {"gotoif": ["*.$", "@goToTarget"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, {"wait":"_forPageToReload"}]},
	{"@accessKnownTarget": 			["signInTarget", "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}]},
	{"@cleanMyAccessClues": 		["cleanMyIpClues", {"gotoif": ["!*.isThereLogsArea", "@uploadSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@uploadSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@uploadSoftware": 			["runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, "isWithinTimeLimit", {"gotoif": ["!*.$", "@abortUpload"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyUploadClues": 		["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["!*.isThereLogsArea", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@installSoftware": 			["goToTargetSoftwares", "installSoftware", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyInstallingClues": 	["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["!*.isThereLogsArea", "@hideSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@hideSoftware": 				["goToTargetSoftwares", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyHiddingClues":  		["goToTargetLogs", "cleanMyIpClues", {"gotoif": ["!*.isThereLogsArea", "@cleanMyOwnLogs"]}, "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 5) && (*.ips.length > 0))", "@goToTarget"]}, "goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", "@goToTarget"]}]},
	{"@abortUpload": 				["abortUpload", {"gotoif": ["true", "@goToTarget"]}]},
	{"@finishProcess": 				"_exit"}
]
