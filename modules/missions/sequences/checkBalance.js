var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@askForPermission": 			"askPermissionToAbort"},
	{"@init": "startCheckBalance"},
	{"@tryToGetMission": 			["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": 		["goToAcceptMissionPage", "isThereMessageError", {"gotoif": ["*.$", "@init"]}, "clickOnAcceptMissionButton", {"wait": 2000}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": 		["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": 		["hackAccount", "isCrackerStrongEnough", {"gotoif":["!*.$", "@abortProcess"]}, "isThereMessageError", {"gotoif":["*.$", "@signInAccountAndGetBalance"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@signInAccountAndGetBalance": ["signInAccount", "getAccountBalance", "getOutFromAccount", "logout"]},
	{"@tryHostConnection": 			["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessTarget": 				"signInKnownTarget"},
	{"@cleanTargetLogs": 			["cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanOwnLogs": 				["logout", "goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@finishMission": 				["goToMissionsTab", "informBalance", {"wait": 3000}, "confirmMissionCompleteButton", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": 				[{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", "_exit"]},
	{"@abortMission": 				["goToMissionsTab", "clickOnAbortMissionButton", {"wait": 1500}, "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": 	["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]

