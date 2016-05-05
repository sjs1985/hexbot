var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@init": "startCheckBalance"},
	{"@tryToGetMission": ["goToMissionsTab", "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission == null", "@tryToGetMission"]}]},
	{"@tryToAcceptMission": ["goToAcceptMissionPage", "clickOnAcceptMissionButton", {"wait": 1000}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@tryToGetMission"]}]},
	{"@startMissionExecution": ["getMissionInfo", "logout", "goToIp", "goToBankAccountHacker"]},
	{"@hackAccountProcess": ["hackAccount", "isThereMessageError", {"gotoif":["*.$", "@abortMission"]}, {"wait":"_forPageToReload"}, "signInAccount", "getAccountBalance", "getOutFromAccount"]},
	{"@tryHostConnection": ["logout", "forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@abortMission"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": "signInKnownTarget"},
	{"@cleanTargetLogs": ["cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOwnLogs": ["logout", "goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@finishMission"]}, {"wait": "_forPageToReload"}]},
	{"@finishMission": ["goToMissionsTab", "informBalance", {"wait": 3000}, "confirmMissionCompleteButton", {"gotoif": ["true", "@tryToGetMission"]}]},
	{"@abortMission": ["informBadCracker", "_exit"]}
]

/*foo.instructions = [
	{"@tryConnection": ["logout", "forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@informAccessDenied"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": ["signInKnownTarget", "_exit"]},
	{"@informAccessDenied": "informBadCracker"}
]*/	
