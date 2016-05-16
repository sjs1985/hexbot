var foo = $jSpaghetti.module("webcrawler").sequence("ipseacher")

foo.instructions = [
	{"@init": 						["startSearching", {"gotoif":["!*.$", "@finishProcess"]}]},
	{"@goToNextTarget": 			["logout", {"gotoif": ["*.openList.length == 0", "@finishProcess"]}, "goToNextIp", "isThereMessageError", {"gotoif": ["*.$", "@accountInaccessibleHost"]}, "ipDoesNotExist", {"gotoif": ["*.$", "@accountInaccessibleHost"]}]},
	{"@tryToInvadeTarget": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@accountInaccessibleHost"]}, {"wait":"_forPageToReload"}]},
	{"@accessKnownTarget": 			"signInTarget"},
	{"@analyseTargetIps": 			["cleanMyIpClues", "getIpsFromLogs", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanMyOwnLogs": 			[{"gotoif": ["((*.accessCounter < 5) && (*.openList.length > 0))", "@goToNextTarget"]}, "resetAccessCounter", "goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@goToNextTarget"]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@accountInaccessibleHost": 	["registerInaccessible", {"gotoif": ["true", "@goToNextTarget"]}]},
	{"@finishProcess": 				"_exit"},
]
