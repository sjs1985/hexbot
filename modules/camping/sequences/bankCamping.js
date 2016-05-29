var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{"@init": 						["startBankCamping", {"gotoif":["!*.$", "@finishProcess"]}, "logout"]},
	{"@goToAccountHackIfAvaiable": 	{"gotoif": ["*.accounts.length > 0", "@startAccountAtack"]}},
	{"@checkIpTarget": 				["goToIp", "isThereMessageError", {"gotoif":["*.$", "@finishProcess"]}]},
	{"@tryToInvadeTarget": 			[{"gotoif": ["*.isLogged", "@checkForCaughtAccounts"]}, "forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessKnownTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@finishProcess"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@accessKnownTarget": 			"signInTarget"},
	{"@cleanMyCluesAndAnalizeLogs": ["goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@checkForCaughtAccounts"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@checkForCaughtAccounts": 	{"gotoif": ["*.accounts.length > 0", "@startAccountAtack"]}},
	{"@listen": 					["goToTargetLogs", "cleanMyIpClues", "extractDataFromLog", {"gotoif":["((*.accounts.length > 0) || (*.myCluesFound))", "@submitLogChanges"]}, {"wait":3000}, {"gotoif":["true", "@listen"]}]},
	{"@submitLogChanges": 			["submitLogs", "isThereMessageError", {"gotoif":["*.$", "@checkForCaughtAccounts"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@startAccountAtack": 			[{"gotoif": ["*.accounts.length == 0", "@cleanMyOwnLogs"]}, "logout", "goToIp", "hackAccount", "isThereMessageError", {"gotoif":["*.$", "@accessKnownAccount"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, "accessUnknownAccount", {"gotoif": ["true", "@transferMoney"]}]},
	{"@accessKnownAccount": 		"accessKnownAccount"},
	{"@transferMoney": 				["isThereMessageError", {"gotoif":["*.$", "@startAccountAtack"]}, {"wait": 2000}, "transferMoneyToTarget"]},
	{"@cleanTransferLogs": 			["logoutAccount", "goToIp", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, "forceToAccessTarget", "signInTarget", "cleanMyIpClues", "extractDataFromLog", "submitLogs", "isThereMessageError", {"gotoif":["*.$", "@cleanMyOwnLogs"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}]},
	{"@cleanMyOwnLogs": 			[{"gotoif": ["*.accounts.length > 0", "@startAccountAtack"]}, "goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@tryToInvadeTarget"]}, {"wait": {"_forTheSignal": "checkProgressBar"}}, {"gotoif": ["true", "@tryToInvadeTarget"]}]},
	{"@finishProcess": 				"_exit"}
]
