var foo = $jSpaghetti.module("missions").sequence("transferMoney")

foo.instructions = [
	{"@init": "startTransferMoney"},
	{"@tryToGetMission": ["goToMissionsTab", "checkSameTypeAcceptedMission", {"gotoif":["*.$", "@startMissionExecution"]}, "isAvailableMissionsPage", {"gotoif":["!*.$", "@alertUnknownMissionKind"]}, "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission == null", "@init"]}]},
	{"@tryToAcceptMission": ["goToAcceptMissionPage", "clickOnAcceptMissionButton", {"wait": 2000}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@init"]}]},
	{"@startMissionExecution": ["getMissionInfo", "logout", "goToNextIp"]},
	{"@hackAccountProcess": ["hackAccount", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, {"wait":"_forPageToReload"}, "signInAccount", {"wait": 1000}, "transferMoneyToTarget", "getOutFromAccount", "logout"]},
	{"@tryHostConnection": ["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": "signInKnownTarget"},
	{"@cleanTargetLogs": ["cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOtherTargetLogs": [{"gotoif": ["((*.cleanerCount == 2) || (*.ips[0] == *.ips[1]))", "@cleanOwnLogs"]}, "logout", "goToNextIp", {"gotoif": ["true", "@tryHostConnection"]}]},
	{"@cleanOwnLogs": ["logout", "goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, {"wait": "_forPageToReload"}]},
	{"@finishMission": ["goToMissionsTab", "clickOnTransferMoneyFinishButton", {"wait": 3000}, "confirmMissionCompleteButton", {"gotoif": ["true", "@init"]}]},
	{"@abortProcess": [{"gotoif":["*.abortMissionAllowed", "@abortMission"]}, "informBadCracker", "_exit"]},
	{"@abortMission": ["goToMissionsTab", "clickOnAbortMissionButton", {"wait": 1500}, "clickOnConfirmAbortMissionButton", {"gotoif": ["true", "@init"]}]},
	{"@alertUnknownMissionKind": ["alertAnotherMissionKindAlreadyAccepted", "_exit"]}
]