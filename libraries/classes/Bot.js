function Bot(){
	this.currentSequence = null
	this.controlPanel = {
		isHidden: false,
		fieldsContent: {}
	}
	var fieldsContent = {}
	fieldsContent[FIELD_BANK_IP_TARGET] = "{IP OF BANK}"
	fieldsContent[FIELD_MY_ACCOUNT] = "{BANK ACCOUNT ID}"
	fieldsContent[FIELD_SOFTWARE_TO_INSTALL] = "{MALWARE NAME}, {VERSION}"
	fieldsContent[FIELD_IPS_INSTALL_TARGETS] = "{IP}, {IP}"
	fieldsContent[SET_UPLOAD_TIME_LIMIT] = ""
	fieldsContent[FIELD_IPS_START_SEARCHING] = "{IP}, {IP}"
	fieldsContent[FIELD_IP_SEARCH_RESULT] = ""
	fieldsContent[REGEX_INPUT_DOM_ID] = ""

	this.controlPanel.fieldsContent = fieldsContent
}