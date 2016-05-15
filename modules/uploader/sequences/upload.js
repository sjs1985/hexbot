var foo = $jSpaghetti.module("uploader").sequence("upload")

foo.instructions = [
	{"@init": 						["goToSoftwarePage", "startUpload", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToTarget": 				["logout", {"gotoif": ["*.ips.length == 0", "@finishProcess"]}, "goToNextIp", "isThereMessageError", {"gotoif": ["*.$", "@goToTarget"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, {"wait":"_forPageToReload"}]},
	{"@accessKnownTarget": 			"signInTarget"},
	{"@cleanMyAccessClues": 		["cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@uploadSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@uploadSoftware": 			["goToOwnSoftwareArea", "runUploadSoftware", "isSoftwareAlreadyThere", {"gotoif":["*.$", "@installSoftware"]}, "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, "isThereMessageSuccess", {"gotoif": ["*.$", "@cleanMyUploadClues"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyUploadClues": 		["goToTargetLogs", "cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@installSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@installSoftware": 			["goToTargetSoftwares", "installSoftware", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyInstallingClues": 	["goToTargetLogs", "cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@hideSoftware"]}, {"wait": "_forPageToReload"}]},
	{"@hideSoftware": 				["goToTargetSoftwares", "hideSoftware", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyHiddingClues":  		["goToTargetLogs", "cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyOwnLogs": 			["goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToTarget"]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", "@goToTarget"]}]},
	{"@finishProcess": 				"_exit"}
]

