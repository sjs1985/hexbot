var cleanersMod = $jSpaghetti.module("cleaners")
cleanersMod.config.debugMode = true

cleanersMod.procedure("goToOwnLogTab", function(){
	goToPage("/log")
})

cleanersMod.procedure("cleanTextAreaContent", function(data){
	var textArea = getDOMElement("textarea", "class", "logarea", 0)
	if (textArea.value.length > 0){
		data.isEmpty = false
		textArea.value = ""
		getDOMElement("input", "class", "btn btn-inverse", 0).click()
	} else {
		data.isEmpty = true
	}
})

cleanersMod.procedure("goToSoftwareTab", function(){
	goToPage("/software")
})
