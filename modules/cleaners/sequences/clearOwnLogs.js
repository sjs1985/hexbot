var cleanOwnLogs = $jSpaghetti.module("cleaners").sequence("cleanOwnLogs")

cleanOwnLogs.instructions = [
	{0: ["goToOwnLogTab", "cleanTextAreaContent", {"gotoif": ["*.isEmpty == true", 1]},{"wait": "_forPageToReload"}]},
	{1: "goToSoftwareTab"}
]