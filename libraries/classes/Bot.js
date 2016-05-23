function Bot(){
	this.currentSequence = null
	this.controlPanel = {
		isHidden: false,
		fieldsContent: {}
	}
	var fieldsContent = {}
	fieldsContent[FIELD_BANK_IP_TARGET] = ""
	fieldsContent[FIELD_MY_ACCOUNT] = ""
	fieldsContent[FIELD_SOFTWARE_TO_INSTALL] = ""
	fieldsContent[FIELD_IPS_INSTALL_TARGETS] = ""
	fieldsContent[SET_UPLOAD_TIME_LIMIT] = ""
	fieldsContent[FIELD_IPS_START_SEARCHING] = ""
	fieldsContent[FIELD_IP_SEARCH_RESULT] = ""
	fieldsContent[REGEX_INPUT_DOM_ID] = ""

	this.controlPanel.fieldsContent = fieldsContent
}