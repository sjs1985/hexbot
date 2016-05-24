function Bot(){
	this.currentSequence = null
	this.showMissionAlert = false
	this.controlPanel = {
		isHidden: false,
		fieldsContent: {},
		lists: {},
		checkBoxes: {}
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

	var lists = {}
	lists[FIELD_SUSPECT_LOGS] = []

	var checkBoxes = {}
	checkBoxes[SET_MISSIONS_MONITOR] = false
	checkBoxes[SET_LOGS_MONITOR] = false

	this.controlPanel.fieldsContent = fieldsContent
	this.controlPanel.lists = lists
	this.controlPanel.checkBoxes = checkBoxes
}