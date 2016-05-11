var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{1: ["startBankCamping", "logout"]},
	{2: {"gotoif": ["*.accounts.length > 0", 11]}},
	{3: ["goToIp", "isThereMessageError", {"gotoif":["*.$", 0]}]},
	{4: ["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", 5]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", 0]}, {"wait":"_forPageToReload"}]},	
	{5: "signInKnownTarget"},
	{6: ["goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"gotoif":["*.$", 8]}, {"wait": "_forPageToReload"}]},
	{8: [{"gotoif": ["*.accounts.length > 0", 11]}, "goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", {"gotoif":["((*.accounts.length > 0) || (*.myCluesFound))", 9]}, {"wait":3000}, {"gotoif":["true", 8]}]},
	{9: ["submitLogs", "isThereMessageError", {"gotoif":["*.$", 10]}, {"wait": "_forPageToReload"}]},
	{10: {"gotoif": ["*.accounts.length == 0", 8]}},
	{11: [{"gotoif": ["*.accounts.length == 0", 16]}, "logout", "goToIp", "hackAccount", "isThereMessageError", {"gotoif":["*.$", 13]}, {"wait": "_forPageToReload"}]},
	{12: ["accessUnknownAccount", {"gotoif": ["true", 14]}]},
	{13: "accessKnownAccount"},
	{14: ["isThereMessageError", {"gotoif":["*.$", 11]}, {"wait": 1000}, "transferMoneyToTarget"]},
	{15: ["logoutAccount", "goToIp", "isThereMessageError", {"gotoif":["*.$", 16]}, "forceToAccessTarget", "signInKnownTarget", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"gotoif":["*.$", 16]}, {"wait": "_forPageToReload"}]},
	{16: [{"gotoif": ["*.accounts.length > 0", 11]}, "goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", 6]}, {"wait": "_forPageToReload"}, {"gotoif": ["true", 6]}]},
	{0: "_exit"}
]
