function Bot(){
	this.currentSequence = null
	this.controlPanel = {
		isHidden: false,
		fieldsContent: {}
	}
	var fieldsContent = {}
	fieldsContent[FIELD_BANK_IP_TARGET] = "{IP OF BANK}"
	fieldsContent[FIELD_MY_ACCOUNT] = "{BANKING ID}"
	fieldsContent[FIELD_SOFTWARE_TO_INSTALL] = "{MALWARE NAME}, {VERSION}"
	fieldsContent[FIELD_IPS_INSTALL_TARGETS] = "{IP OF VICTIM}, {IP OF VICTIM}"
	this.controlPanel.fieldsContent = fieldsContent
}