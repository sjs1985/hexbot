var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@init": "startCheckBalance"}, //It executes a single procedure
	{"@tryToGetMission": ["goToMissionsTab", "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission != null", "@tryToAcceptMission"]}]},
	{"@tryToAcceptMission": ["goToAcceptMissionPage", "clickOnAcceptMissionButton", {"wait": 1000}, "clickOnConfirmAcceptMissionButton", "isThereMessageError", {"gotoif":["*.$", "@tryToGetMission"]}]},
	{"@startMissionExecution": "getMissionInfo"}
]
