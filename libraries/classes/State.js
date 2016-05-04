/*State class defines what sequence is being executed for the bot*/
function State(moduleName, sequenceName){
	this.commandPanel = new CommandPanel(false)
	this.moduleName = moduleName
	this.sequenceName = sequenceName
}