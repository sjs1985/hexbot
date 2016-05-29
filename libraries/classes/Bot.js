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
	fieldsContent[FIELD_IPS_START_SEARCHING] = ""
	fieldsContent[FIELD_IP_SEARCH_RESULT] = ""
	fieldsContent[REGEX_INPUT_DOM_ID] = ""
	fieldsContent[FIELD_SOFTWARES_TO_INSTALL] = ""
	fieldsContent[SET_TIME_LIMIT] = ""
	fieldsContent[FIELD_SIGNATURE] = ""

	var lists = {}
	lists[FIELD_SUSPECT_LOGS] = []

	var checkBoxes = {}
	checkBoxes[SET_MISSIONS_MONITOR] = false
	checkBoxes[SET_LOGS_MONITOR] = false
	checkBoxes[SET_UPLOAD_MODE] = false
	checkBoxes[SET_SIGNATURE] = false

	this.controlPanel.fieldsContent = fieldsContent
	this.controlPanel.lists = lists
	this.controlPanel.checkBoxes = checkBoxes
}