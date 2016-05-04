var foo = $jSpaghetti.module("missions").sequence("checkBalance")

foo.instructions = [
	{0: "startCheckBalance"}, //It executes a single procedure
	{1: ["goToMissionsTab", "getURLMission", {"wait": "_forTheSignal"}, {"gotoif":["*.urlMission != null", 2, 1]}]},
	{2: ["start1"]}
]
