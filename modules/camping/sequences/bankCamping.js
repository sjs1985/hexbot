var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{"@init": "startBankCamping"},
	{"@startProcess": ["logout", "goToIp", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}]},
	{"@tryHostConnection": ["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": "signInKnownTarget"},
	{"@cleanMyClues": ["extractTransferLogAccount", "cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOwnLogs": ["goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@startListener"]}, {"wait": "_forPageToReload"}]},
	{"@startListener": ["goToTargetLogs", "extractTransferLogAccount", {"gotoif":["*.accounts.length > 0", "@submitChangedLogs"]}, {"wait":2000}, {"gotoif":[1, "@startListener"]}]},
	{"@submitChangedLogs": ["submitLogs", "isThereMessageError", {"gotoif":["*.$", "@startTransfer"]}, {"wait": "_forPageToReload"}]},
	{"@startTransfer": ["logout", "goToIp", "hackAccount", "isThereMessageError", {"gotoif":["*.$", "@accessKnownAccount"]}, {"wait": "_forPageToReload"}]},
	{"@accessUnknownAccount": ["accessUnknownAccount", {"gotoif": [1, "@trasferMoney"]}]},
	{"@accessKnownAccount": "accessKnownAccount"},
	{"@trasferMoney": ["isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogsAgain"]}, {"wait": 1000}, "transferMoneyToTarget"]},
	{"@cleanMyTransferLog": ["logout", "goToIp", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogsAgain"]}, "forceToAccessTarget", "signInKnownTarget", "cleanMyIpClues", "isThereMessageError", {"gotoif":["*.$", "@cleanOwnLogsAgain"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOwnLogsAgain": ["goToOwnLogTab", "cleanTextAreaContent", "isThereMessageError", {"gotoif":["*.$", "@init"]}, {"wait": "_forPageToReload"}, {"gotoif": [1, "@init"]}]},
	{"@abortProcess": "_exit"}
]
