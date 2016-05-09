var foo = $jSpaghetti.module("camping").sequence("bankCamping")

foo.instructions = [
	{"@init": "startBankCamping"},
	{"@startProcess": ["logout", "goToIp", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}]},
	{"@tryHostConnection": ["forceToAccessTarget", "isThereMessageError", {"gotoif":["*.$", "@accessTarget"]}, "hackTargetBruteForce", "isThereMessageError", {"gotoif":["*.$", "@abortProcess"]}, {"wait":"_forPageToReload"}]},
	{"@accessTarget": "signInKnownTarget"},
	{"@cleanMyClues": ["extractTransferLogAccount", "cleanMyIpClues", {"gotoif": ["*.isEmpty == true", "@cleanOwnLogs"]}, {"wait": "_forPageToReload"}]},
	{"@cleanOwnLogs": ["goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", "@abortProcess"]}, {"wait": "_forPageToReload"}]},
	{"@startListener": ["goToTargetLogs", "extractTransferLogAccount", {"gotoif":["*.accounts.length > 0", "@startTransfer"]}, {"wait":2000}, {"gotoif":["true", "@startListener"]}]},
	{"@startTransfer": ["submitLogs", {"wait": "_forPageToReload"}, "logout", "goToIp", "hackAccount", "isThereMessageError", {"gotoif":["*.$", "@accessKnownAccount"]}, {"wait": "_forPageToReload"}]},
	{"@accessUnknownAccount": ["accessUnknownAccount", {"gotoif": ["true", "@abortProcess"]}]},
	{"@accessKnownAccount": "accessKnownAccount"},
	{"@abortProcess": "_exit"}
]

/*foo.instructions = [
	{0: ["startBankCamping", "extractTransferLogAccount", "showResult"]}
]*/