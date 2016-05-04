var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{"@init": "startCheckBalance"}, //It executes a single procedure
	{"@tryToGetMission": ["goToMissionsTab", "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission != null", "@goToMissionPage", "@tryToGetMission"]}]},
	{"@goToMissionPage": ["start1"]}
]
